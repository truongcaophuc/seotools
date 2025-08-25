const axios = require('axios');

async function testSocialMediaAPI() {
    try {
        console.log('Step 1: Login to get session...');
        
        // First login to get session
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
        
        const loginResponse = await axios.post('http://localhost:3000/api', loginMutation, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!loginResponse.data.data || !loginResponse.data.data.login) {
            console.log('❌ Login failed');
            return;
        }
        
        console.log('✅ Login successful');
        
        // Extract cookies
        const cookies = loginResponse.headers['set-cookie'];
        const cookieString = cookies ? cookies.join('; ') : '';
        
        console.log('\nStep 2: Test social media post API...');
        
        // Test social media post API
        const postData = {
            platform: 'facebook',
            message: 'Test post from API',
            pageId: '123456789',
            accessToken: 'test_token'
        };
        
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (cookieString) {
            headers['Cookie'] = cookieString;
        }
        
        const postResponse = await axios.post('http://localhost:3000/api/social-media-post', postData, {
            headers,
            validateStatus: () => true // Don't throw on 4xx/5xx
        });
        
        console.log('Social Media API Response Status:', postResponse.status);
        console.log('Social Media API Response Data:', JSON.stringify(postResponse.data, null, 2));
        
        if (postResponse.status === 401) {
            console.log('❌ Still getting unauthorized - session issue');
        } else if (postResponse.status === 400) {
            console.log('✅ Authorization passed - now getting Facebook API error (expected)');
        } else {
            console.log('✅ API call successful');
        }
        
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
}

testSocialMediaAPI();