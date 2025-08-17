import cors from 'micro-cors';

// CORS configuration for production
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:3001', 
        'https://seotools-zeta.vercel.app',
        'https://copybox.app',
        // Add any other domains you need
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
    ],
};

// Create CORS middleware
export const corsMiddleware = cors(corsOptions);

// For development, allow all origins
const devCorsOptions = {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization', 
        'X-Requested-With',
        'Accept',
        'Origin',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
    ],
};

export const devCorsMiddleware = cors(devCorsOptions);

// Export the appropriate middleware based on environment
export const getCorsMiddleware = () => {
    return process.env.NODE_ENV === 'production' ? corsMiddleware : devCorsMiddleware;
};

export default getCorsMiddleware();