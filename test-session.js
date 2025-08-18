const axios = require('axios');

async function testSessionManagement() {
    try {
        console.log('Testing session management...');
        
        // First, login via GraphQL to create session
        const loginQuery = `
            mutation Login($input: LoginInputType!) {
                login(input: $input) {
                    id
                    username
                    email
                    fullname
                }
            }
        `;
        
        const loginVariables = {
            input: {
                username: 'phuctruong.310103@gmail.com',
                password: '123456789'
            }
        };
        
        console.log('Step 1: Logging in via GraphQL...');
        const loginResponse = await axios.post('http://localhost:3001/api', {
            query: loginQuery,
            variables: loginVariables
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Login Response Status:', loginResponse.status);
        
        // Extract cookies from login response
        const cookies = loginResponse.headers['set-cookie'];
        console.log('Cookies from login:', cookies);
        
        if (!cookies) {
            console.log('No cookies received from login!');
            return;
        }
        
        // Step 2: Test session with Me query
        console.log('\nStep 2: Testing session with Me query...');
        const meQuery = `
            query Me {
                me {
                    id
                    username
                    email
                    fullname
                }
            }
        `;
        
        const meResponse = await axios.post('http://localhost:3001/api', {
            query: meQuery
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies.join('; ')
            }
        });
        
        console.log('Me Query Response Status:', meResponse.status);
        console.log('Me Query Response Data:', JSON.stringify(meResponse.data, null, 2));
        
        // Step 3: Test session via test-auth endpoint
        console.log('\nStep 3: Testing session via test-auth endpoint...');
        const authResponse = await axios.get('http://localhost:3001/api/test-auth', {
            headers: {
                'Cookie': cookies.join('; ')
            }
        });
        
        console.log('Test-auth Response Status:', authResponse.status);
        console.log('Test-auth Response Data:', authResponse.data);
        
        if (authResponse.data.data.session.hasSession && authResponse.data.data.session.user) {
            console.log('\n✅ Session management working correctly!');
            console.log('Session user:', authResponse.data.data.session.user);
        } else {
            console.log('\n❌ Session not working properly');
        }
        
    } catch (error) {
        console.error('Error testing session management:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

testSessionManagement();