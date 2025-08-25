# MinIO Management Script for SEO Tools Project
# This script helps you manage MinIO server for local development

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("start", "stop", "restart", "status", "logs")]
    [string]$Action
)

$ContainerName = "minio-server"
$MinIOImage = "minio/minio"
$APIPort = "9000"
$ConsolePort = "9001"
$Username = "minioadmin"
$Password = "minioadmin"

function Start-MinIO {
    Write-Host "🚀 Starting MinIO server..." -ForegroundColor Green
    
    # Check if container already exists
    $existing = docker ps -a --filter "name=$ContainerName" --format "{{.Names}}"
    if ($existing -eq $ContainerName) {
        Write-Host "📦 Container exists, starting..." -ForegroundColor Yellow
        docker start $ContainerName
    } else {
        Write-Host "📦 Creating new MinIO container..." -ForegroundColor Yellow
        docker run -d --name $ContainerName `
            -p "${APIPort}:9000" `
            -p "${ConsolePort}:9001" `
            -e "MINIO_ROOT_USER=$Username" `
            -e "MINIO_ROOT_PASSWORD=$Password" `
            $MinIOImage server /data --console-address ":9001"
    }
    
    Start-Sleep -Seconds 3
    Show-Status
}

function Stop-MinIO {
    Write-Host "🛑 Stopping MinIO server..." -ForegroundColor Red
    docker stop $ContainerName 2>$null
    Write-Host "✅ MinIO server stopped" -ForegroundColor Green
}

function Restart-MinIO {
    Stop-MinIO
    Start-Sleep -Seconds 2
    Start-MinIO
}

function Show-Status {
    Write-Host "\n📊 MinIO Server Status:" -ForegroundColor Cyan
    
    $status = docker ps --filter "name=$ContainerName" --format "{{.Status}}"
    if ($status) {
        Write-Host "✅ Status: Running ($status)" -ForegroundColor Green
        Write-Host "🌐 API Endpoint: http://localhost:$APIPort" -ForegroundColor Yellow
        Write-Host "🖥️  Web Console: http://localhost:$ConsolePort" -ForegroundColor Yellow
        Write-Host "👤 Username: $Username" -ForegroundColor Yellow
        Write-Host "🔑 Password: $Password" -ForegroundColor Yellow
        Write-Host "\n💡 Test connection: node test-minio-connection.js" -ForegroundColor Cyan
    } else {
        Write-Host "❌ MinIO server is not running" -ForegroundColor Red
        Write-Host "💡 Start with: .\manage-minio.ps1 start" -ForegroundColor Cyan
    }
}

function Show-Logs {
    Write-Host "📋 MinIO Server Logs:" -ForegroundColor Cyan
    docker logs $ContainerName --tail 50
}

# Main execution
switch ($Action) {
    "start" { Start-MinIO }
    "stop" { Stop-MinIO }
    "restart" { Restart-MinIO }
    "status" { Show-Status }
    "logs" { Show-Logs }
}

Write-Host ""