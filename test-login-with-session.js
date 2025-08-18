const axios = require('axios');
const { GraphQLClient } = require('graphql-request');

// Test login with proper session management
async function testLoginWithSession() {
    const baseURL = 'http://localhost:3000';
    const graphqlURL = 'http://localhost:3000/api';
    
    const testAccount = {
        username: '21521300@gm.uit.edu.vn',
        password: 'cp31012003'
    };
    
    console.log('=== LOGIN TEST WITH SESSION MANAGEMENT ===\n');
    
    // Create axios instance with cookie jar
    const axiosInstance = axios.create({
        baseURL,
        withCredentials: true,
        timeout: 10000
    });
    
    let sessionCookies = '';
    
    try {
        // Step 1: Test GraphQL endpoint availability
        console.log('1. Testing GraphQL endpoint availability...');
        
        const testQuery = {
            query: 'query { __typename }'
        };
        
        const testResponse = await axiosInstance.post('/api', testQuery, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ GraphQL endpoint is available');
        console.log(`   Status: ${testResponse.status}`);
        console.log(`   Response: ${JSON.stringify(testResponse.data)}`);
        
        // Extract cookies from response
        if (testResponse.headers['set-cookie']) {
            sessionCookies = testResponse.headers['set-cookie'].join('; ');
            console.log(`   Cookies received: ${sessionCookies}`);
        }
        
    } catch (error) {
        console.log('❌ GraphQL endpoint ERROR:', error.message);
        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
            console.log(`   Data: ${JSON.stringify(error.response.data)}`);
        }
        return;
    }
    
    console.log();
    
    try {
        // Step 2: Perform login
        console.log('2. Performing login...');
        
        const loginMutation = {
            query: `
                mutation Login($input: LoginInputType) {
                    login(input: $input) {
                        id
                        email
                        username
                        fullname
                        phoneNumber
                        role
                        workspace {
                            id
                            name
                            bucket
                            description
                        }
                    }
                }
            `,
            variables: {
                input: {
                    username: testAccount.username,
                    password: testAccount.password
                }
            }
        };
        
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (sessionCookies) {
            headers['Cookie'] = sessionCookies;
        }
        
        const loginResponse = await axiosInstance.post('/api', loginMutation, {
            headers
        });
        
        console.log(`   Status: ${loginResponse.status}`);
        
        if (loginResponse.data.data && loginResponse.data.data.login) {
            console.log('✅ Login SUCCESSFUL');
            console.log('   User data:', JSON.stringify(loginResponse.data.data.login, null, 2));
            
            // Update session cookies
            if (loginResponse.headers['set-cookie']) {
                const newCookies = loginResponse.headers['set-cookie'].join('; ');
                sessionCookies = sessionCookies ? `${sessionCookies}; ${newCookies}` : newCookies;
                console.log(`   Updated cookies: ${sessionCookies}`);
            }
        } else if (loginResponse.data.errors) {
            console.log('❌ Login FAILED with GraphQL errors:');
            console.log('   Errors:', JSON.stringify(loginResponse.data.errors, null, 2));
            return;
        } else {
            console.log('❌ Login FAILED: No user data returned');
            console.log('   Response:', JSON.stringify(loginResponse.data, null, 2));
            return;
        }
        
    } catch (error) {
        console.log('❌ Login ERROR:', error.message);
        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
            console.log(`   Data: ${JSON.stringify(error.response.data)}`);
        }
        return;
    }
    
    console.log();
    
    try {
        // Step 3: Test session persistence with Me query
        console.log('3. Testing session persistence...');
        
        const meQuery = {
            query: `
                query Me {
                    me {
                        id
                        email
                        username
                        fullname
                        workspace {
                            id
                            name
                            bucket
                        }
                    }
                }
            `
        };
        
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (sessionCookies) {
            headers['Cookie'] = sessionCookies;
        }
        
        const meResponse = await axiosInstance.post('/api', meQuery, {
            headers
        });
        
        console.log(`   Status: ${meResponse.status}`);
        
        if (meResponse.data.data && meResponse.data.data.me) {
            console.log('✅ Session VALID: User is logged in');
            console.log('   Current user:', JSON.stringify(meResponse.data.data.me, null, 2));
        } else if (meResponse.data.errors) {
            console.log('❌ Session check FAILED with GraphQL errors:');
            console.log('   Errors:', JSON.stringify(meResponse.data.errors, null, 2));
        } else {
            console.log('❌ Session INVALID: No user data');
            console.log('   Response:', JSON.stringify(meResponse.data, null, 2));
        }
        
    } catch (error) {
        console.log('❌ Session check ERROR:', error.message);
        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
            console.log(`   Data: ${JSON.stringify(error.response.data)}`);
        }
    }
    
    console.log();
    
    try {
        // Step 4: Test auth endpoint
        console.log('4. Testing auth endpoint...');
        
        const headers = {};
        if (sessionCookies) {
            headers['Cookie'] = sessionCookies;
        }
        
        const authResponse = await axiosInstance.get('/api/test-auth', {
            headers
        });
        
        console.log(`   Status: ${authResponse.status}`);
        console.log('   Auth data:', JSON.stringify(authResponse.data, null, 2));
        
        if (authResponse.data.data && authResponse.data.data.session && authResponse.data.data.session.hasSession) {
            console.log('✅ Auth endpoint confirms user is logged in');
        } else {
            console.log('❌ Auth endpoint shows user is not logged in');
        }
        
    } catch (error) {
        console.log('❌ Auth endpoint ERROR:', error.message);
        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
            console.log(`   Data: ${JSON.stringify(error.response.data)}`);
        }
    }
    
    console.log();
    console.log('=== SUMMARY ===');
    console.log('Account:', testAccount.username);
    console.log('This test simulates the exact flow that happens in the browser:');
    console.log('1. GraphQL endpoint is accessible');
    console.log('2. Login mutation is sent with credentials');
    console.log('3. Session cookies are managed properly');
    console.log('4. Subsequent requests include session cookies');
    console.log();
    console.log('If the account still cannot login in the browser, the issue might be:');
    console.log('1. Client-side JavaScript errors');
    console.log('2. React state management issues');
    console.log('3. Form submission handling problems');
    console.log('4. Browser-specific cookie/CORS issues');
}

// Run the test
testLoginWithSession().catch(console.error);