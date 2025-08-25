import { SchemaFieldTypes, createClient } from 'redis';
import Redis from 'ioredis';

// Cấu hình Redis từ biến môi trường
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379');
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_USERNAME = process.env.REDIS_USERNAME;
const REDIS_DB = parseInt(process.env.REDIS_DB || '0');

// Tạo Redis client với cấu hình từ biến môi trường
const client = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
    username: REDIS_USERNAME, // Cần Redis >= 6
    password: REDIS_PASSWORD,
    db: REDIS_DB,
    // Cấu hình retry và timeout
    maxRetriesPerRequest: 2,
    enableReadyCheck: true,
    lazyConnect: true, // Kết nối khi cần thiết
    // Giảm số lượng kết nối
    family: 4,
    keepAlive: 30000,
    // Tự động ngắt kết nối khi không sử dụng
    connectTimeout: 10000,
    commandTimeout: 5000,
});

// Xử lý sự kiện kết nối Redis
client.on('connect', () => {
    console.log('✅ Redis connected successfully');
});

client.on('error', (err) => {
    console.error('❌ Redis Client Error:', err.message);
    console.error('💡 Kiểm tra lại cấu hình Redis trong file .env.local');
});

client.on('close', () => {
    console.log('🔌 Redis connection closed');
});

// Tự động đóng kết nối sau một khoảng thời gian không hoạt động
let connectionTimeout: NodeJS.Timeout;

const resetConnectionTimeout = () => {
    if (connectionTimeout) {
        clearTimeout(connectionTimeout);
    }
    connectionTimeout = setTimeout(() => {
        if (client.status === 'ready') {
            client.disconnect();
            console.log('🔌 Redis connection closed due to inactivity');
        }
    }, 30000); // Đóng kết nối sau 30 giây không hoạt động
};

// Override các method để reset timeout
const originalGet = client.get.bind(client);
const originalSet = client.set.bind(client);
const originalDel = client.del.bind(client);

client.get = (...args) => {
    resetConnectionTimeout();
    return originalGet(...args);
};

client.set = (...args) => {
    resetConnectionTimeout();
    return originalSet(...args);
};

client.del = (...args) => {
    resetConnectionTimeout();
    return originalDel(...args);
};

(async function () {
    try {
        // Kiểm tra kết nối Redis chỉ khi cần thiết
        if (REDIS_HOST !== 'localhost' || REDIS_PASSWORD) {
            await client.ping();
            console.log('🚀 Redis client initialized successfully');
            resetConnectionTimeout();
        } else {
            console.log('⚠️ Redis not configured, skipping connection');
        }
        // await client.ft.create(
        //     'idx:services',
        //     {
        //         '$.id': {
        //             type: SchemaFieldTypes.TEXT,
        //             SORTABLE: true,
        //         },
        //         '$.title': {
        //             type: SchemaFieldTypes.TEXT,
        //             AS: 'title',
        //         },
        //         '$.leadingSentence': {
        //             type: SchemaFieldTypes.TEXT,
        //             AS: 'leadingSentence',
        //         },
        //         '$.leadingLanguage': {
        //             type: SchemaFieldTypes.TEXT,
        //             AS: 'leadingLanguage',
        //         },
        //         '$.leadingStyleContent': {
        //             type: SchemaFieldTypes.TEXT,
        //             AS: 'leadingStyleContent',
        //         },
        //         '$.systemMessage': {
        //             type: SchemaFieldTypes.TEXT,
        //             AS: 'systemMessage',
        //         },
        //         '$.model': {
        //             type: SchemaFieldTypes.TEXT,
        //             AS: 'model',
        //         },
        //     },
        //     {
        //         ON: 'JSON',
        //         PREFIX: 'service:',
        //     }
        // );
    } catch (error) {
        if (error.message === 'Index already exists') {
            console.log('Index exists already, skipped creation.');
        } else {
            // Something went wrong, perhaps RediSearch isn't installed...
            console.error(error);
            // process.exit(1);
        }
    }
})();

export { client as clientRedis };
