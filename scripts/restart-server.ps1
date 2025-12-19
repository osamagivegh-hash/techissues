$ErrorActionPreference = "Stop"

# Server details
$IP = "157.175.55.203"

# Find PEM key file
$KEY = Get-ChildItem -Path . -Filter "*.pem" -ErrorAction SilentlyContinue | Select-Object -First 1

if (-not $KEY) {
    Write-Host "ERROR: No PEM key file found in current directory"
    exit 1
}

$KEY = $KEY.FullName

Write-Host "========================================================"
Write-Host "RESTARTING TECHISS.STORE SERVER"
Write-Host "========================================================"
Write-Host "Server IP: $IP"
Write-Host "Key File: $KEY"
Write-Host ""

# Fix Permissions for Key
icacls $KEY /reset 2>$null
icacls $KEY /grant:r "$($env:USERNAME):R" 2>$null
icacls $KEY /inheritance:r 2>$null

Write-Host "Connecting to server and restarting PM2..."

ssh -i $KEY -o StrictHostKeyChecking=no ubuntu@$IP "pm2 restart all && pm2 list && echo 'PM2 restarted successfully'"

Write-Host ""
Write-Host "========================================================"
Write-Host "Server restart complete!"
Write-Host "Please refresh: https://techiss.store/ar/category/device-reviews"
Write-Host "========================================================"
