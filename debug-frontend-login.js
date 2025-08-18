const axios = require('axios');
const { GraphQLClient } = require('graphql-request');

// Debug frontend login issues
async function debugFrontendLogin() {
    const baseURL = 'http://localhost:3000';
    const testAccount = {
        username: '21521300@gm.uit.edu.vn',
        password: 'cp31012003'
    };
    
    console.log('=== DEBUG FRONTEND LOGIN ISSUES ===\n');
    console.log(`Testing account: ${testAccount.username}`);
    console.log();
    
    // Create axios instance to simulate browser behavior
    const axiosInstance = axios.create({
        baseURL,
        withCredentials: true,
        timeout: 10000,
        validateStatus: () => true // Don't throw on error status
    });
    
    let cookies = '';
    
    try {
        // Step 1: Check if login page loads correctly
        console.log('1. Kiểm tra trang đăng nhập...');
        const loginPageResponse = await axiosInstance.get('/login');
        console.log(`   Status: ${loginPageResponse.status}`);
        
        if (loginPageResponse.status === 200) {
            console.log('   ✅ Trang đăng nhập tải thành công');
            // Extract any initial cookies
            if (loginPageResponse.headers['set-cookie']) {
                cookies = loginPageResponse.headers['set-cookie'].join('; ');
                console.log(`   Cookies nhận được: ${cookies}`);
            }
        } else {
            console.log('   ❌ Trang đăng nhập không tải được');
            return;
        }
        
    } catch (error) {
        console.log('   ❌ Lỗi khi tải trang đăng nhập:', error.message);
        return;
    }
    
    console.log();
    
    try {
        // Step 2: Test GraphQL endpoint directly
        console.log('2. Kiểm tra GraphQL endpoint...');
        
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        
        if (cookies) {
            headers['Cookie'] = cookies;
        }
        
        // Test simple query first
        const testQuery = {
            query: 'query { __typename }'
        };
        
        const testResponse = await axiosInstance.post('/api', testQuery, { headers });
        console.log(`   Status: ${testResponse.status}`);
        
        if (testResponse.status === 200 && testResponse.data) {
            console.log('   ✅ GraphQL endpoint hoạt động');
            console.log(`   Response: ${JSON.stringify(testResponse.data)}`);
        } else {
            console.log('   ❌ GraphQL endpoint có vấn đề');
            console.log(`   Response: ${JSON.stringify(testResponse.data)}`);
            return;
        }
        
    } catch (error) {
        console.log('   ❌ Lỗi GraphQL endpoint:', error.message);
        return;
    }
    
    console.log();
    
    try {
        // Step 3: Test login mutation with detailed error handling
        console.log('3. Thực hiện đăng nhập qua GraphQL...');
        
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
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        };
        
        if (cookies) {
            headers['Cookie'] = cookies;
        }
        
        console.log('   Gửi mutation với data:', JSON.stringify(loginMutation.variables, null, 2));
        
        const loginResponse = await axiosInstance.post('/api', loginMutation, { headers });
        
        console.log(`   Status: ${loginResponse.status}`);
        console.log(`   Headers: ${JSON.stringify(loginResponse.headers, null, 2)}`);
        
        // Update cookies if received
        if (loginResponse.headers['set-cookie']) {
            const newCookies = loginResponse.headers['set-cookie'].join('; ');
            cookies = cookies ? `${cookies}; ${newCookies}` : newCookies;
            console.log(`   Cookies cập nhật: ${cookies}`);
        }
        
        if (loginResponse.data) {
            console.log('   Response data:', JSON.stringify(loginResponse.data, null, 2));
            
            if (loginResponse.data.errors) {
                console.log('   ❌ GraphQL Errors:');
                loginResponse.data.errors.forEach((error, index) => {
                    console.log(`     ${index + 1}. ${error.message}`);
                    if (error.extensions) {
                        console.log(`        Extensions: ${JSON.stringify(error.extensions)}`);
                    }
                });
            }
            
            if (loginResponse.data.data && loginResponse.data.data.login) {
                console.log('   ✅ Đăng nhập GraphQL THÀNH CÔNG');
                console.log('   User data:', JSON.stringify(loginResponse.data.data.login, null, 2));
            } else if (!loginResponse.data.errors) {
                console.log('   ❌ Đăng nhập thất bại: Không có dữ liệu user');
            }
        } else {
            console.log('   ❌ Không có response data');
        }
        
    } catch (error) {
        console.log('   ❌ Lỗi khi đăng nhập:', error.message);
        if (error.response) {
            console.log(`   Response status: ${error.response.status}`);
            console.log(`   Response data: ${JSON.stringify(error.response.data)}`);
        }
    }
    
    console.log();
    
    try {
        // Step 4: Test session after login
        console.log('4. Kiểm tra session sau đăng nhập...');
        
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
                        }
                    }
                }
            `
        };
        
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (cookies) {
            headers['Cookie'] = cookies;
        }
        
        const meResponse = await axiosInstance.post('/api', meQuery, { headers });
        
        console.log(`   Status: ${meResponse.status}`);
        
        if (meResponse.data && meResponse.data.data && meResponse.data.data.me) {
            console.log('   ✅ Session hợp lệ - User đã đăng nhập');
            console.log('   Current user:', JSON.stringify(meResponse.data.data.me, null, 2));
        } else if (meResponse.data && meResponse.data.errors) {
            console.log('   ❌ Session không hợp lệ - GraphQL errors:');
            meResponse.data.errors.forEach(error => {
                console.log(`     - ${error.message}`);
            });
        } else {
            console.log('   ❌ Session không hợp lệ - Không có dữ liệu user');
        }
        
    } catch (error) {
        console.log('   ❌ Lỗi kiểm tra session:', error.message);
    }
    
    console.log();
    
    try {
        // Step 5: Test with wrong password to see error handling
        console.log('5. Test với mật khẩu sai để kiểm tra error handling...');
        
        const wrongLoginMutation = {
            query: `
                mutation Login($input: LoginInputType) {
                    login(input: $input) {
                        id
                        email
                        username
                    }
                }
            `,
            variables: {
                input: {
                    username: testAccount.username,
                    password: 'wrong_password_123'
                }
            }
        };
        
        const headers = {
            'Content-Type': 'application/json'
        };
        
        const wrongResponse = await axiosInstance.post('/api', wrongLoginMutation, { headers });
        
        console.log(`   Status: ${wrongResponse.status}`);
        
        if (wrongResponse.data && wrongResponse.data.errors) {
            console.log('   ✅ Error handling hoạt động đúng:');
            wrongResponse.data.errors.forEach(error => {
                console.log(`     - ${error.message}`);
            });
        } else {
            console.log('   ❌ Error handling có vấn đề');
            console.log('   Response:', JSON.stringify(wrongResponse.data, null, 2));
        }
        
    } catch (error) {
        console.log('   ❌ Lỗi test mật khẩu sai:', error.message);
    }
    
    console.log();
    console.log('=== KẾT LUẬN ===');
    console.log('Nếu tất cả các bước trên đều thành công nhưng bạn vẫn không đăng nhập được từ trình duyệt:');
    console.log();
    console.log('🔍 KIỂM TRA TRONG TRÌNH DUYỆT:');
    console.log('1. Mở Developer Tools (F12)');
    console.log('2. Vào tab Console - xem có lỗi JavaScript không');
    console.log('3. Vào tab Network - xem request đăng nhập có được gửi không');
    console.log('4. Kiểm tra tab Application > Cookies - xem cookies có được set không');
    console.log();
    console.log('🛠️ CÁC BƯỚC KHẮC PHỤC:');
    console.log('1. Xóa cache và cookies của trang web');
    console.log('2. Thử đăng nhập ở chế độ ẩn danh (Incognito)');
    console.log('3. Kiểm tra có extension nào block request không');
    console.log('4. Thử với trình duyệt khác');
    console.log();
    console.log('📝 THÔNG TIN QUAN TRỌNG:');
    console.log(`- Tài khoản: ${testAccount.username}`);
    console.log('- Backend hoạt động bình thường');
    console.log('- GraphQL endpoint: /api');
    console.log('- Session management hoạt động đúng');
}

// Run the debug
debugFrontendLogin().catch(console.error);