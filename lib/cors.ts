import cors from 'micro-cors';

// CORS configuration for production
// micro-cors has simpler configuration than regular cors
const corsOptions = {
    origin: '*', // micro-cors doesn't support array of origins
    allowCredentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: [
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
    origin: '*',
    allowCredentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: [
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