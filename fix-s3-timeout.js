const fs = require('fs');
const path = require('path');

// Fix S3 timeout and ECONNRESET issues
async function fixS3TimeoutIssues() {
    console.log('=== FIXING S3 TIMEOUT AND ECONNRESET ISSUES ===\n');
    
    // 1. Update S3 client configuration with timeout
    const s3ClientPath = path.join(__dirname, 'lib', 's3.ts');
    const s3ClientContent = `import { S3Client } from '@aws-sdk/client-s3';
import {
    AWS_ACCESS_KEY,
    AWS_REGION,
    AWS_SECRET_ACCESS_KEY,
} from '../constants';

// Create an Amazon S3 service client object with timeout configuration
const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
    requestHandler: {
        requestTimeout: 5000, // 5 seconds timeout
        connectionTimeout: 3000, // 3 seconds connection timeout
    },
    maxAttempts: 2, // Reduce retry attempts
});

export { s3Client };
`;
    
    try {
        fs.writeFileSync(s3ClientPath, s3ClientContent, 'utf8');
        console.log('✅ Updated S3 client with timeout configuration');
    } catch (error) {
        console.log('❌ Failed to update S3 client:', error.message);
    }
    
    // 2. Update workspace schema with better error handling
    const workspaceSchemaPath = path.join(__dirname, 'share', 'graphql', 'resolver', 'workspace', 'workspace.schema.ts');
    
    try {
        let workspaceContent = fs.readFileSync(workspaceSchemaPath, 'utf8');
        
        // Replace the bucketSize resolver with improved version
        const oldBucketSizeResolver = `        t.nullable.field('bucketSize', {
            type: 'Int',
            async resolve(root) {
                let bucketSize = 0;

                if (!root.bucket) return bucketSize;

                const bucketParams = {
                    Bucket: AWS_BUCKET_NAME,
                    Prefix: root.bucket,
                    // Prefix: '/' // for test
                };

                const responseData = await s3Client.send(
                    new ListObjectsV2Command(bucketParams)
                );

                if (!responseData.Contents) {
                    return bucketSize;
                }

                bucketSize = responseData.Contents.reduce(
                    (value, item) => value + item.Size,
                    0
                );

                return bucketSize;
            },
        });`;
        
        const newBucketSizeResolver = `        t.nullable.field('bucketSize', {
            type: 'Int',
            async resolve(root) {
                let bucketSize = 0;

                if (!root.bucket) return bucketSize;

                try {
                    const bucketParams = {
                        Bucket: AWS_BUCKET_NAME,
                        Prefix: root.bucket,
                        MaxKeys: 1000, // Limit number of objects to prevent timeout
                    };

                    // Add timeout wrapper
                    const timeoutPromise = new Promise((_, reject) => {
                        setTimeout(() => reject(new Error('S3 request timeout')), 4000);
                    });

                    const s3Promise = s3Client.send(
                        new ListObjectsV2Command(bucketParams)
                    );

                    const responseData = await Promise.race([s3Promise, timeoutPromise]);

                    if (!responseData.Contents) {
                        return bucketSize;
                    }

                    bucketSize = responseData.Contents.reduce(
                        (value, item) => value + (item.Size || 0),
                        0
                    );

                    return bucketSize;
                } catch (error) {
                    console.error('S3 bucketSize error:', error.message);
                    // Return null instead of throwing error to prevent login failure
                    return null;
                }
            },
        });`;
        
        if (workspaceContent.includes("t.nullable.field('bucketSize',")) {
            workspaceContent = workspaceContent.replace(
                /t\.nullable\.field\('bucketSize',\s*{[\s\S]*?}\);/,
                newBucketSizeResolver
            );
            
            fs.writeFileSync(workspaceSchemaPath, workspaceContent, 'utf8');
            console.log('✅ Updated workspace schema with improved bucketSize resolver');
        } else {
            console.log('⚠️  Could not find bucketSize resolver to update');
        }
        
    } catch (error) {
        console.log('❌ Failed to update workspace schema:', error.message);
    }
    
    // 3. Create alternative GraphQL fragment without bucketSize
    const alternativeFragmentPath = path.join(__dirname, 'share', 'graphql', 'resolver', 'auth', 'auth.codegen.graphql');
    
    try {
        let authContent = fs.readFileSync(alternativeFragmentPath, 'utf8');
        
        // Check if we need to remove bucketSize from UserInfo fragment
        if (authContent.includes('bucketSize')) {
            authContent = authContent.replace(/\s*bucketSize\s*\n/g, '\n');
            fs.writeFileSync(alternativeFragmentPath, authContent, 'utf8');
            console.log('✅ Removed bucketSize from auth fragment to prevent timeout');
        }
        
    } catch (error) {
        console.log('⚠️  Could not update auth fragment (file may not exist)');
    }
    
    // 4. Create environment variables check
    console.log('\n=== CHECKING AWS CONFIGURATION ===');
    
    const requiredEnvVars = [
        'AWS_BUCKET_NAME',
        'AWS_ACCESS_KEY', 
        'AWS_SECRET_ACCESS_KEY'
    ];
    
    const missingVars = [];
    
    requiredEnvVars.forEach(varName => {
        if (!process.env[varName]) {
            missingVars.push(varName);
        } else {
            console.log(`✅ ${varName}: ${process.env[varName] ? 'Set' : 'Missing'}`);
        }
    });
    
    if (missingVars.length > 0) {
        console.log('\n❌ Missing environment variables:');
        missingVars.forEach(varName => {
            console.log(`   - ${varName}`);
        });
        console.log('\n💡 Add these to your .env file:');
        missingVars.forEach(varName => {
            console.log(`${varName}=your_value_here`);
        });
    }
    
    console.log('\n=== RECOMMENDATIONS ===');
    console.log('1. ✅ Added timeout configuration to S3 client');
    console.log('2. ✅ Added error handling to bucketSize resolver');
    console.log('3. ✅ bucketSize now returns null on error instead of crashing');
    console.log('4. 🔄 Restart your development server: npm run dev');
    console.log('5. 🧪 Test login again - should work without ECONNRESET');
    
    console.log('\n=== ALTERNATIVE SOLUTIONS ===');
    console.log('If the issue persists:');
    console.log('1. Remove bucketSize from GraphQL queries temporarily');
    console.log('2. Use a background job to calculate bucket sizes');
    console.log('3. Cache bucket sizes in database');
    console.log('4. Make bucketSize optional in frontend');
}

// Run the fix
fixS3TimeoutIssues().catch(console.error);