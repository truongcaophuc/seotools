# MinIO Setup Guide for SEO Tools Project

This project has been migrated from AWS S3 to MinIO for local development. MinIO provides S3-compatible object storage that runs locally.

## 🚀 Quick Start

### 1. Start MinIO Server
```powershell
# Using PowerShell management script (Recommended)
.\manage-minio.ps1 start

# Or using Docker directly
docker run -d --name minio-server -p 9000:9000 -p 9001:9001 -e MINIO_ROOT_USER=minioadmin -e MINIO_ROOT_PASSWORD=minioadmin minio/minio server /data --console-address ":9001"
```

### 2. Verify Connection
```bash
node test-minio-connection.js
```

### 3. Access MinIO Console
- **Web Console**: http://localhost:9001
- **API Endpoint**: http://localhost:9000
- **Username**: `minioadmin`
- **Password**: `minioadmin`

## 📋 Management Commands

```powershell
# Start MinIO server
.\manage-minio.ps1 start

# Stop MinIO server
.\manage-minio.ps1 stop

# Restart MinIO server
.\manage-minio.ps1 restart

# Check status
.\manage-minio.ps1 status

# View logs
.\manage-minio.ps1 logs
```

## ⚙️ Configuration

### Environment Variables
The following variables are configured in `.env`:

```env
# MinIO Configuration
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET_NAME=seo-tools

# Legacy AWS S3 (kept for reference)
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_bucket_name
```

### Code Changes
The following files have been updated to use MinIO:

- `lib/minio.ts` - MinIO client configuration
- `lib/storage.ts` - Storage service abstraction layer
- `constants/aws.ts` - Added MinIO constants
- `pages/api/upload.ts` - Updated upload API
- `share/graphql/resolver/image/image.mutation.ts` - Updated image mutations
- `share/graphql/resolver/workspace/workspace.schema.ts` - Updated bucket size calculation

## 🔧 Development Workflow

1. **Start Development Environment**:
   ```bash
   # Start MinIO
   .\manage-minio.ps1 start
   
   # Start the application
   npm run dev
   
   # Start Prisma Studio (optional)
   npx prisma studio
   ```

2. **Test File Operations**:
   - Upload files through the application UI
   - Check MinIO console at http://localhost:9001
   - Run connection test: `node test-minio-connection.js`

3. **Stop Development Environment**:
   ```bash
   # Stop MinIO
   .\manage-minio.ps1 stop
   ```

## 🐛 Troubleshooting

### MinIO Server Won't Start
- Check if ports 9000 and 9001 are available
- Ensure Docker is running
- Check container logs: `.\manage-minio.ps1 logs`

### Connection Errors
- Verify MinIO server is running: `.\manage-minio.ps1 status`
- Check environment variables in `.env`
- Ensure bucket name matches configuration

### File Upload Issues
- Check MinIO console for bucket existence
- Verify credentials in `.env`
- Test connection: `node test-minio-connection.js`

## 📁 File Structure

```
├── lib/
│   ├── minio.ts          # MinIO client configuration
│   ├── storage.ts        # Storage service abstraction
│   └── s3.ts            # Legacy S3 configuration
├── constants/
│   └── aws.ts           # AWS/MinIO constants
├── manage-minio.ps1     # MinIO management script
├── test-minio-connection.js # Connection test script
└── MINIO_SETUP.md       # This file
```

## 🔄 Migration Notes

- The application now uses MinIO by default for local development
- AWS S3 configuration is preserved for production deployment
- All file operations are abstracted through `StorageService`
- Bucket auto-creation is handled automatically

## 📞 Support

If you encounter issues:
1. Check this documentation
2. Run the test script: `node test-minio-connection.js`
3. Check MinIO logs: `.\manage-minio.ps1 logs`
4. Verify Docker container status: `docker ps`