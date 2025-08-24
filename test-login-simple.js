const axios = require('axios');

async function testLogin() {
    try {
        console.log('Testing GraphQL login...');
        
        const loginMutation = {
            query: `
                mutation Login($input: LoginInputType) {
                    login(input: $input) {
                        id
                        username
                        email
                        fullname
                    }
                }
            `,
            variables: {
                input: {
                    username: '21521300@gm.uit.edu.vn',
                    password: 'cp31012003'
                }
            }
        };
        
        const response = await axios.post('http://localhost:3000/api', loginMutation, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        
        console.log('Login Response Status:', response.status);
        console.log('Login Response Data:', JSON.stringify(response.data, null, 2));
        
        if (response.data.data && response.data.data.login) {
            console.log('✅ Login successful!');
            
            // Extract cookies
            const cookies = response.headers['set-cookie'];
            console.log('Cookies:', cookies);
            
            // Test session with Me query
            console.log('\nTesting session with Me query...');
            const meQuery = {
                query: `
                    query Me {
                        me {
                            id
                            username
                            email
                            fullname
                        }
                    }
                `
            };
            
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (cookies) {
                headers['Cookie'] = cookies.join('; ');
            }
            
            const meResponse = await axios.post('http://localhost:3000/api', meQuery, {
                headers
            });
            
            console.log('Me Query Response:', JSON.stringify(meResponse.data, null, 2));
            
        } else {
            console.log('❌ Login failed');
            if (response.data.errors) {
                console.log('Errors:', response.data.errors);
            }
        }
        
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
}

testLogin();