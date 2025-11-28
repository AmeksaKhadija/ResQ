# Script de démarrage de ResQ

Write-Host "🚑 Démarrage de ResQ - Système de Dispatching d'Ambulances" -ForegroundColor Cyan
Write-Host ""

# Vérifier si json-server est installé
$jsonServerInstalled = Get-Command json-server -ErrorAction SilentlyContinue

if (-not $jsonServerInstalled) {
    Write-Host "⚠️  JSON Server n'est pas installé globalement." -ForegroundColor Yellow
    Write-Host "Installation en cours..." -ForegroundColor Yellow
    npm install -g json-server
}

Write-Host "✅ Démarrage du serveur JSON (Port 5000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "json-server --watch db.json --port 5000"

Start-Sleep -Seconds 2

Write-Host "✅ Démarrage de l'application React (Port 5173)..." -ForegroundColor Green
Write-Host ""
Write-Host "📝 Comptes de test disponibles:" -ForegroundColor Cyan
Write-Host "   Régulateur: regulateur@resq.com / password123" -ForegroundColor White
Write-Host "   Chef de Parc: chef@resq.com / password123" -ForegroundColor White
Write-Host ""

npm run dev
