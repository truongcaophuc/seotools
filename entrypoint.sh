#!/bin/sh
# Chạy prisma generate hoặc db push trước
yarn prisma

# Sau đó chạy lệnh chính (pm2-runtime)
exec "$@"
