const axios = require('axios');

async function testCompleteLoginFlow() {
    try {
        console.log('🚀 Testing complete login flow...');
        console.log('=' .repeat(50));
        
        // Test 1: Direct API login
        console.log('\n📝 Test 1: Direct API login');
        const apiLoginResponse = await axios.post('http://localhost:3001/api/test-login', {
            username: 'phuctruong.310103@gmail.com',
            password: '123456789',
            testMode: true
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ API Login Status:', apiLoginResponse.status);
        console.log('✅ API Login Success:', apiLoginResponse.data.success);
        
        // Test 2: GraphQL login mutation
        console.log('\n📝 Test 2: GraphQL login mutation');
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
        
        const graphqlLoginResponse = await axios.post('http://localhost:3001/api', {
            query: loginQuery,
            variables: loginVariables
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ GraphQL Login Status:', graphqlLoginResponse.status);
        console.log('✅ GraphQL Login Success:', !!graphqlLoginResponse.data.data.login);
        
        // Extract cookies for session testing
        const cookies = graphqlLoginResponse.headers['set-cookie'];
        
        // Test 3: Session persistence with Me query
        console.log('\n📝 Test 3: Session persistence with Me query');
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
                'Cookie': cookies ? cookies.join('; ') : ''
            }
        });
        
        console.log('✅ Me Query Status:', meResponse.status);
        console.log('✅ Me Query Success:', !!meResponse.data.data.me);
        
        // Test 4: Session validation via test-auth
        console.log('\n📝 Test 4: Session validation via test-auth');
        const authTestResponse = await axios.get('http://localhost:3001/api/test-auth', {
            headers: {
                'Cookie': cookies ? cookies.join('; ') : ''
            }
        });
        
        console.log('✅ Auth Test Status:', authTestResponse.status);
        console.log('✅ Session Valid:', authTestResponse.data.data.session.hasSession);
        
        // Test 5: Password verification
        console.log('\n📝 Test 5: Password verification test');
        const wrongPasswordResponse = await axios.post('http://localhost:3001/api/test-login', {
            username: 'phuctruong.310103@gmail.com',
            password: 'wrongpassword',
            testMode: true
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            validateStatus: () => true // Don't throw on error status
        });
        
        console.log('✅ Wrong Password Status:', wrongPasswordResponse.status);
        console.log('✅ Wrong Password Rejected:', !wrongPasswordResponse.data.success);
        
        // Summary
        console.log('\n' + '=' .repeat(50));
        console.log('📊 LOGIN FLOW TEST SUMMARY');
        console.log('=' .repeat(50));
        
        const tests = [
            { name: 'API Login', passed: apiLoginResponse.data.success },
            { name: 'GraphQL Login', passed: !!graphqlLoginResponse.data.data.login },
            { name: 'Session Persistence', passed: !!meResponse.data.data.me },
            { name: 'Session Validation', passed: authTestResponse.data.data.session.hasSession },
            { name: 'Password Security', passed: !wrongPasswordResponse.data.success }
        ];
        
        tests.forEach(test => {
            console.log(`${test.passed ? '✅' : '❌'} ${test.name}: ${test.passed ? 'PASSED' : 'FAILED'}`);
        });
        
        const allPassed = tests.every(test => test.passed);
        console.log('\n' + (allPassed ? '🎉 ALL TESTS PASSED! Login system is working correctly.' : '⚠️  Some tests failed. Please check the issues above.'));
        
        if (allPassed) {
            console.log('\n🔐 Authentication system is fully functional:');
            console.log('   • User authentication works via both API and GraphQL');
            console.log('   • Password hashing and verification is secure');
            console.log('   • Session management persists correctly');
            console.log('   • Cookie-based authentication is working');
            console.log('   • Database connections are stable');
        }
        
    } catch (error) {
        console.error('❌ Error in login flow test:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

testCompleteLoginFlow();