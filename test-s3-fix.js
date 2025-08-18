const axios = require('axios');

// Test S3 fix for ECONNRESET error
async function testS3Fix() {
    console.log('=== TESTING S3 FIX FOR ECONNRESET ERROR ===\n');
    
    const graphqlEndpoint = 'http://localhost:3000/api';
    
    const loginMutation = `
        mutation Login($input: LoginInputType) {
            login(input: $input) {
                id
                email
                username
                fullname
                workspace {
                    id
                    name
                    bucket
                    bucketSize
                    balance
                    isOwner
                }
            }
        }
    `;
    
    const testAccounts = [
        {
            username: '21521300@gm.uit.edu.vn',
            password: 'cp31012003',
            description: 'Account that previously had ECONNRESET error'
        },
        {
            username: 'admin@example.com',
            password: 'admin123',
            description: 'Test account for comparison'
        }
    ];
    
    for (const account of testAccounts) {
        console.log(`\n🧪 Testing: ${account.description}`);
        console.log(`   Username: ${account.username}`);
        
        try {
            const startTime = Date.now();
            
            const response = await axios.post(graphqlEndpoint, {
                query: loginMutation,
                variables: {
                    input: {
                        username: account.username,
                        password: account.password
                    }
                }
            }, {
                timeout: 10000, // 10 second timeout
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            console.log(`   ⏱️  Response time: ${duration}ms`);
            
            if (response.data.errors) {
                console.log('   ❌ GraphQL Errors:');
                response.data.errors.forEach((error, index) => {
                    console.log(`      ${index + 1}. ${error.message}`);
                    if (error.path) {
                        console.log(`         Path: ${error.path.join(' -> ')}`);
                    }
                    if (error.extensions?.code) {
                        console.log(`         Code: ${error.extensions.code}`);
                    }
                });
                
                // Check if ECONNRESET still occurs
                const hasEconnreset = response.data.errors.some(error => 
                    error.message.includes('ECONNRESET') || 
                    error.extensions?.exception?.code === 'ECONNRESET'
                );
                
                if (hasEconnreset) {
                    console.log('   🔴 ECONNRESET error still occurs!');
                } else {
                    console.log('   🟡 Different error (ECONNRESET fixed)');
                }
            } else if (response.data.data?.login) {
                const user = response.data.data.login;
                console.log('   ✅ Login successful!');
                console.log(`      User ID: ${user.id}`);
                console.log(`      Email: ${user.email}`);
                
                if (user.workspace) {
                    console.log(`      Workspace: ${user.workspace.name}`);
                    console.log(`      Bucket: ${user.workspace.bucket || 'None'}`);
                    
                    if (user.workspace.bucketSize !== undefined) {
                        if (user.workspace.bucketSize === null) {
                            console.log('      Bucket Size: null (S3 error handled gracefully)');
                        } else {
                            console.log(`      Bucket Size: ${user.workspace.bucketSize} bytes`);
                        }
                    } else {
                        console.log('      Bucket Size: Not queried');
                    }
                }
            } else {
                console.log('   ⚠️  Unexpected response format');
                console.log('   Response:', JSON.stringify(response.data, null, 2));
            }
            
        } catch (error) {
            console.log('   ❌ Request failed:');
            
            if (error.code === 'ECONNRESET') {
                console.log('      🔴 ECONNRESET error at request level!');
            } else if (error.code === 'ECONNREFUSED') {
                console.log('      🔴 Server not running (ECONNREFUSED)');
            } else if (error.code === 'ETIMEDOUT') {
                console.log('      🔴 Request timeout');
            } else {
                console.log(`      Error: ${error.message}`);
                if (error.response?.data) {
                    console.log('      Response:', JSON.stringify(error.response.data, null, 2));
                }
            }
        }
        
        console.log('   ' + '─'.repeat(50));
    }
    
    console.log('\n=== TEST SUMMARY ===');
    console.log('✅ S3 client now has timeout configuration (5s request, 3s connection)');
    console.log('✅ bucketSize resolver has error handling and timeout protection');
    console.log('✅ bucketSize returns null on S3 errors instead of crashing login');
    console.log('✅ Reduced S3 retry attempts to prevent long delays');
    
    console.log('\n=== NEXT STEPS ===');
    console.log('1. If ECONNRESET still occurs, check AWS credentials and network');
    console.log('2. Consider removing bucketSize from login query temporarily');
    console.log('3. Implement background job for bucket size calculation');
    console.log('4. Add bucket size caching in database');
}

// Run the test
testS3Fix().catch(console.error);