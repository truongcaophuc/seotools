const axios = require('axios');

async function testGraphQLLogin() {
    try {
        console.log('Testing GraphQL login mutation...');
        
        const query = `
            mutation Login($input: LoginInputType!) {
                login(input: $input) {
                    id
                    username
                    email
                    fullname
                }
            }
        `;
        
        const variables = {
            input: {
                username: 'phuctruong.310103@gmail.com',
                password: '123456789'
            }
        };
        
        const response = await axios.post('http://localhost:3001/api', {
            query,
            variables
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('GraphQL Response Status:', response.status);
        console.log('GraphQL Response Data:', JSON.stringify(response.data, null, 2));
        
        if (response.data.errors) {
            console.log('GraphQL Errors:', response.data.errors);
        }
        
        if (response.data.data && response.data.data.login) {
            console.log('Login successful via GraphQL!');
            console.log('User data:', response.data.data.login);
        } else {
            console.log('Login failed via GraphQL');
        }
        
    } catch (error) {
        console.error('Error testing GraphQL login:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

testGraphQLLogin();