/**
 * Script kiểm tra kết nối Redis Cloud
 * Chạy: node scripts/test-redis.js
 */

require('dotenv').config({ path: '.env.local' });
const Redis = require('ioredis');

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379');
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_USERNAME = process.env.REDIS_USERNAME;
const REDIS_DB = parseInt(process.env.REDIS_DB || '0');

console.log('🔍 Kiểm tra cấu hình Redis...');
console.log(`Host: ${REDIS_HOST}`);
console.log(`Port: ${REDIS_PORT}`);
console.log(`Username: ${REDIS_USERNAME || 'không có'}`);
console.log(`Password: ${REDIS_PASSWORD ? '***' : 'không có'}`);
console.log(`Database: ${REDIS_DB}`);
console.log('\n🚀 Đang kết nối Redis...');

const client = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    db: REDIS_DB,
    retryDelayOnFailover: 100,
    maxRetriesPerRequest: 3,
    lazyConnect: true,
});

async function testRedis() {
    try {
        // Test ping
        console.log('📡 Testing ping...');
        const pingResult = await client.ping();
        console.log(`✅ Ping successful: ${pingResult}`);

        // Test set/get
        console.log('\n💾 Testing set/get...');
        const testKey = 'test:connection';
        const testValue = `Test at ${new Date().toISOString()}`;
        
        await client.set(testKey, testValue);
        console.log(`✅ Set successful: ${testKey} = ${testValue}`);
        
        const getValue = await client.get(testKey);
        console.log(`✅ Get successful: ${getValue}`);
        
        // Cleanup
        await client.del(testKey);
        console.log(`🗑️ Cleanup successful`);

        // Test Redis info
        console.log('\n📊 Redis server info:');
        const info = await client.info('server');
        const lines = info.split('\r\n').filter(line => 
            line.includes('redis_version') || 
            line.includes('redis_mode') || 
            line.includes('os')
        );
        lines.forEach(line => console.log(`   ${line}`));

        console.log('\n🎉 Tất cả test đều thành công! Redis đã được cấu hình đúng.');
        
    } catch (error) {
        console.error('\n❌ Lỗi kết nối Redis:');
        console.error(`   ${error.message}`);
        
        console.log('\n🔧 Hướng dẫn khắc phục:');
        console.log('   1. Kiểm tra file .env.local có đúng thông tin Redis Cloud không');
        console.log('   2. Đảm bảo Redis Cloud database đang hoạt động');
        console.log('   3. Kiểm tra firewall/network có chặn kết nối không');
        console.log('   4. Xem lại username/password có chính xác không');
        
        process.exit(1);
    } finally {
        await client.quit();
        console.log('\n🔌 Đã đóng kết nối Redis');
    }
}

// Xử lý sự kiện
client.on('connect', () => {
    console.log('🔗 Đã kết nối Redis');
});

client.on('error', (err) => {
    console.error(`❌ Redis Error: ${err.message}`);
});

// Chạy test
testRedis().catch(console.error);