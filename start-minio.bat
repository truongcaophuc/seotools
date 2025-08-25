@echo off
echo Starting MinIO server with Docker...
echo.
echo MinIO will be available at:
echo - API: http://localhost:9000
echo - Console: http://localhost:9001
echo - Username: minioadmin
echo - Password: minioadmin
echo.

docker run -d --name minio-seo-tools -p 9000:9000 -p 9001:9001 -e "MINIO_ROOT_USER=minioadmin" -e "MINIO_ROOT_PASSWORD=minioadmin" -v minio-data:/data minio/minio server /data --console-address ":9001"

echo.
echo MinIO server started successfully!
echo You can access the MinIO console at: http://localhost:9001
echo Use credentials: minioadmin / minioadmin
echo.
pause