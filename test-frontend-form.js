const puppeteer = require('puppeteer');

// Test frontend login form behavior
async function testFrontendForm() {
    console.log('=== TEST FRONTEND LOGIN FORM ===\n');
    
    let browser;
    let page;
    
    try {
        // Launch browser
        console.log('1. Khởi động trình duyệt...');
        browser = await puppeteer.launch({
            headless: false, // Show browser for debugging
            devtools: true,  // Open DevTools
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        page = await browser.newPage();
        
        // Enable console logging
        page.on('console', msg => {
            console.log(`   [BROWSER CONSOLE] ${msg.type()}: ${msg.text()}`);
        });
        
        // Enable error logging
        page.on('pageerror', error => {
            console.log(`   [BROWSER ERROR] ${error.message}`);
        });
        
        // Enable request/response logging
        page.on('request', request => {
            if (request.url().includes('/api') || request.url().includes('login')) {
                console.log(`   [REQUEST] ${request.method()} ${request.url()}`);
            }
        });
        
        page.on('response', response => {
            if (response.url().includes('/api') || response.url().includes('login')) {
                console.log(`   [RESPONSE] ${response.status()} ${response.url()}`);
            }
        });
        
        console.log('   ✅ Trình duyệt đã khởi động');
        
    } catch (error) {
        console.log('   ❌ Lỗi khởi động trình duyệt:', error.message);
        return;
    }
    
    try {
        // Navigate to login page
        console.log('\n2. Truy cập trang đăng nhập...');
        await page.goto('http://localhost:3000/login', { 
            waitUntil: 'networkidle2',
            timeout: 10000
        });
        
        console.log('   ✅ Trang đăng nhập đã tải');
        
        // Wait for form to be ready
        await page.waitForSelector('form', { timeout: 5000 });
        console.log('   ✅ Form đăng nhập đã xuất hiện');
        
    } catch (error) {
        console.log('   ❌ Lỗi tải trang đăng nhập:', error.message);
        await browser.close();
        return;
    }
    
    try {
        // Check form elements
        console.log('\n3. Kiểm tra các element của form...');
        
        const usernameInput = await page.$('input[name="username"], input[type="email"], input[placeholder*="email"], input[placeholder*="username"]');
        const passwordInput = await page.$('input[name="password"], input[type="password"]');
        const submitButton = await page.$('button[type="submit"], button:contains("Đăng nhập"), button:contains("Login")');
        
        if (usernameInput) {
            console.log('   ✅ Tìm thấy input username/email');
        } else {
            console.log('   ❌ Không tìm thấy input username/email');
        }
        
        if (passwordInput) {
            console.log('   ✅ Tìm thấy input password');
        } else {
            console.log('   ❌ Không tìm thấy input password');
        }
        
        if (submitButton) {
            console.log('   ✅ Tìm thấy button submit');
        } else {
            console.log('   ❌ Không tìm thấy button submit');
        }
        
        if (!usernameInput || !passwordInput || !submitButton) {
            console.log('   ❌ Form không đầy đủ elements');
            await browser.close();
            return;
        }
        
    } catch (error) {
        console.log('   ❌ Lỗi kiểm tra form elements:', error.message);
        await browser.close();
        return;
    }
    
    try {
        // Fill and submit form
        console.log('\n4. Điền thông tin và submit form...');
        
        // Clear and fill username
        await page.focus('input[name="username"], input[type="email"], input[placeholder*="email"], input[placeholder*="username"]');
        await page.keyboard.down('Control');
        await page.keyboard.press('KeyA');
        await page.keyboard.up('Control');
        await page.type('input[name="username"], input[type="email"], input[placeholder*="email"], input[placeholder*="username"]', '21521300@gm.uit.edu.vn');
        
        console.log('   ✅ Đã điền username');
        
        // Clear and fill password
        await page.focus('input[name="password"], input[type="password"]');
        await page.keyboard.down('Control');
        await page.keyboard.press('KeyA');
        await page.keyboard.up('Control');
        await page.type('input[name="password"], input[type="password"]', 'cp31012003');
        
        console.log('   ✅ Đã điền password');
        
        // Wait a bit for any validation
        await page.waitForTimeout(1000);
        
        // Submit form
        console.log('   🔄 Đang submit form...');
        await page.click('button[type="submit"], button:contains("Đăng nhập"), button:contains("Login")');
        
        // Wait for response
        await page.waitForTimeout(3000);
        
        // Check current URL
        const currentUrl = page.url();
        console.log(`   Current URL: ${currentUrl}`);
        
        if (currentUrl.includes('/login')) {
            console.log('   ❌ Vẫn ở trang login - Đăng nhập thất bại');
            
            // Check for error messages
            const errorMessages = await page.$$eval('[class*="error"], [class*="alert"], .text-red-500, .text-danger', elements => 
                elements.map(el => el.textContent.trim()).filter(text => text.length > 0)
            );
            
            if (errorMessages.length > 0) {
                console.log('   Thông báo lỗi tìm thấy:');
                errorMessages.forEach(msg => console.log(`     - ${msg}`));
            } else {
                console.log('   Không tìm thấy thông báo lỗi cụ thể');
            }
            
        } else {
            console.log('   ✅ Đã chuyển hướng - Đăng nhập thành công!');
        }
        
    } catch (error) {
        console.log('   ❌ Lỗi khi submit form:', error.message);
    }
    
    try {
        // Keep browser open for manual inspection
        console.log('\n5. Giữ trình duyệt mở để kiểm tra thủ công...');
        console.log('   Bạn có thể kiểm tra Developer Tools để xem chi tiết');
        console.log('   Nhấn Enter để đóng trình duyệt...');
        
        // Wait for user input
        await new Promise(resolve => {
            process.stdin.once('data', () => resolve());
        });
        
    } catch (error) {
        console.log('   Lỗi:', error.message);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
    
    console.log('\n=== KẾT LUẬN ===');
    console.log('Script đã hoàn thành. Kiểm tra logs ở trên để xem chi tiết.');
}

// Check if puppeteer is available
try {
    require.resolve('puppeteer');
    testFrontendForm().catch(console.error);
} catch (error) {
    console.log('❌ Puppeteer chưa được cài đặt.');
    console.log('Để cài đặt, chạy: npm install puppeteer');
    console.log();
    console.log('Hoặc bạn có thể kiểm tra thủ công bằng cách:');
    console.log('1. Mở http://localhost:3000/login trong trình duyệt');
    console.log('2. Mở Developer Tools (F12)');
    console.log('3. Vào tab Console và Network');
    console.log('4. Thử đăng nhập với:');
    console.log('   - Username: 21521300@gm.uit.edu.vn');
    console.log('   - Password: cp31012003');
    console.log('5. Xem có lỗi nào trong Console và Network tabs');
}