# Hướng dẫn Setup Redis Cloud cho SEO Tools

## 1. Đăng ký Redis Cloud

Nếu bạn chưa có tài khoản Redis Cloud, hãy đăng ký tại: https://redis.com/try-free/

## 2. Tạo Database Redis

1. Đăng nhập vào Redis Cloud Console
2. Tạo một subscription mới (có thể chọn gói miễn phí)
3. Tạo database mới với các thông số:
   - Database name: `seo-tools-cache`
   - Port: `6379` (mặc định)
   - Memory limit: Tùy theo gói bạn chọn

## 3. Lấy thông tin kết nối

Sau khi tạo database, bạn sẽ nhận được:
- **Endpoint**: Địa chỉ host của Redis (ví dụ: `redis-12345.c1.us-east-1-1.ec2.cloud.redislabs.com`)
- **Port**: Cổng kết nối (thường là `6379`)
- **Password**: Mật khẩu để kết nối
- **Username**: Tên người dùng (thường là `default`)

## 4. Cấu hình Environment Variables

1. Tạo file `.env.local` trong thư mục gốc của project (nếu chưa có)
2. Thêm các biến môi trường Redis:

```env
# Redis Cloud Configuration
REDIS_HOST=your-redis-endpoint.cloud.redislabs.com
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
REDIS_USERNAME=default
REDIS_DB=0
```

**Thay thế các giá trị sau:**
- `your-redis-endpoint.cloud.redislabs.com`: Endpoint từ Redis Cloud
- `your-redis-password`: Password từ Redis Cloud

## 5. Kiểm tra kết nối

Sau khi cấu hình xong, khởi động lại ứng dụng:

```bash
npm run dev
# hoặc
yarn dev
```

Kiểm tra console để đảm bảo không có lỗi kết nối Redis.

## 6. Tính năng sử dụng Redis

Project này sử dụng Redis để:
- Cache dữ liệu services
- Lưu trữ tạm thời các thông tin session
- Tối ưu hiệu suất truy vấn

## 7. Troubleshooting

### Lỗi kết nối thường gặp:

1. **Connection timeout**: Kiểm tra firewall và network
2. **Authentication failed**: Kiểm tra lại username/password
3. **Host not found**: Kiểm tra lại endpoint

### Kiểm tra kết nối Redis:

Bạn có thể test kết nối bằng cách tạo file test:

```javascript
// test-redis.js
const Redis = require('ioredis');

const client = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME,
});

client.ping().then((result) => {
    console.log('Redis connection successful:', result);
    process.exit(0);
}).catch((error) => {
    console.error('Redis connection failed:', error);
    process.exit(1);
});
```

Chạy test:
```bash
node test-redis.js
```

## 8. Bảo mật

- **Không commit** file `.env.local` vào Git
- Sử dụng **strong password** cho Redis
- Cấu hình **IP whitelist** nếu có thể
- Định kỳ **rotate password**

## 9. Monitoring

Redis Cloud cung cấp dashboard để monitor:
- Memory usage
- Operations per second
- Connection count
- Latency metrics

Truy cập Redis Cloud Console để theo dõi hiệu suất.