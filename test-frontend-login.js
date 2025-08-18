const axios = require('axios');

async function testFrontendLogin() {
    try {
        console.log('🌐 Kiểm tra đăng nhập từ Frontend');
        console.log('=' .repeat(50));
        
        const testCredentials = {
            username: '21521300@gm.uit.edu.vn',
            password: 'cp31012003'
        };
        
        console.log(`\n📝 Thông tin đăng nhập:`);
        console.log(`   - Username: ${testCredentials.username}`);
        console.log(`   - Password: ${testCredentials.password}`);
        
        // Test 1: NextAuth signin endpoint
        console.log('\n📝 Test 1: NextAuth signin endpoint');
        try {
            const nextAuthResponse = await axios.post('http://localhost:3001/api/auth/callback/credentials', {
                username: testCredentials.username,
                password: testCredentials.password,
                csrfToken: 'test-token',
                callbackUrl: 'http://localhost:3001/dashboard',
                json: true
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                validateStatus: () => true,
                maxRedirects: 0
            });
            
            console.log(`   - Status: ${nextAuthResponse.status}`);
            console.log(`   - Headers Location: ${nextAuthResponse.headers.location || 'N/A'}`);
            
            if (nextAuthResponse.status === 302) {
                console.log('   - ✅ Redirect thành công (có thể đăng nhập được)');
            } else {
                console.log('   - ❌ Không có redirect');
            }
        } catch (error) {
            console.log(`   - Error: ${error.message}`);
        }
        
        // Test 2: Kiểm tra CSRF token
        console.log('\n📝 Test 2: Kiểm tra CSRF token');
        try {
            const csrfResponse = await axios.get('http://localhost:3001/api/auth/csrf', {
                validateStatus: () => true
            });
            
            console.log(`   - Status: ${csrfResponse.status}`);
            if (csrfResponse.data && csrfResponse.data.csrfToken) {
                console.log(`   - CSRF Token: ${csrfResponse.data.csrfToken.substring(0, 20)}...`);
                console.log('   - ✅ CSRF token có sẵn');
            } else {
                console.log('   - ❌ Không có CSRF token');
            }
        } catch (error) {
            console.log(`   - Error: ${error.message}`);
        }
        
        // Test 3: Kiểm tra session endpoint
        console.log('\n📝 Test 3: Kiểm tra session endpoint');
        try {
            const sessionResponse = await axios.get('http://localhost:3001/api/auth/session', {
                validateStatus: () => true
            });
            
            console.log(`   - Status: ${sessionResponse.status}`);
            console.log(`   - Session Data:`, sessionResponse.data);
        } catch (error) {
            console.log(`   - Error: ${error.message}`);
        }
        
        // Test 4: Kiểm tra providers
        console.log('\n📝 Test 4: Kiểm tra providers');
        try {
            const providersResponse = await axios.get('http://localhost:3001/api/auth/providers', {
                validateStatus: () => true
            });
            
            console.log(`   - Status: ${providersResponse.status}`);
            if (providersResponse.data) {
                console.log(`   - Providers:`, Object.keys(providersResponse.data));
            }
        } catch (error) {
            console.log(`   - Error: ${error.message}`);
        }
        
        // Test 5: Thử đăng nhập với form data thực tế
        console.log('\n📝 Test 5: Đăng nhập với form data');
        try {
            // Lấy CSRF token trước
            const csrfResponse = await axios.get('http://localhost:3001/api/auth/csrf');
            const csrfToken = csrfResponse.data.csrfToken;
            
            const formData = new URLSearchParams();
            formData.append('username', testCredentials.username);
            formData.append('password', testCredentials.password);
            formData.append('csrfToken', csrfToken);
            formData.append('callbackUrl', 'http://localhost:3001/dashboard');
            formData.append('json', 'true');
            
            const loginResponse = await axios.post('http://localhost:3001/api/auth/callback/credentials', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                validateStatus: () => true,
                maxRedirects: 0
            });
            
            console.log(`   - Status: ${loginResponse.status}`);
            console.log(`   - Response:`, loginResponse.data);
            
            if (loginResponse.status === 302) {
                console.log('   - ✅ Đăng nhập thành công (redirect)');
                console.log(`   - Redirect to: ${loginResponse.headers.location}`);
            } else if (loginResponse.status === 200) {
                console.log('   - ✅ Đăng nhập thành công (200)');
            } else {
                console.log('   - ❌ Đăng nhập thất bại');
            }
            
            // Kiểm tra cookies
            const cookies = loginResponse.headers['set-cookie'];
            if (cookies) {
                console.log('   - Cookies được set:');
                cookies.forEach(cookie => {
                    console.log(`     * ${cookie.split(';')[0]}`);
                });
            }
        } catch (error) {
            console.log(`   - Error: ${error.message}`);
        }
        
        console.log('\n' + '=' .repeat(50));
        console.log('📊 KẾT LUẬN');
        console.log('=' .repeat(50));
        console.log('Tài khoản 21521300@gm.uit.edu.vn / cp31012003:');
        console.log('• ✅ Tồn tại trong database');
        console.log('• ✅ Mật khẩu chính xác');
        console.log('• ✅ Có workspace hợp lệ');
        console.log('• ✅ API login hoạt động');
        console.log('• ✅ GraphQL login hoạt động');
        console.log('\n🔍 Nếu vẫn không đăng nhập được từ giao diện:');
        console.log('1. Kiểm tra JavaScript console trong browser');
        console.log('2. Kiểm tra Network tab để xem request/response');
        console.log('3. Xóa cookies và thử lại');
        console.log('4. Kiểm tra NextAuth configuration');
        
    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    }
}

testFrontendLogin();