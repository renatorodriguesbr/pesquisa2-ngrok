@echo off
echo =======================================================
echo     Iniciando a Pesquisa V2 com suporte ao Ngrok
echo =======================================================
echo.

:: Inicia o servidor do Next.js em uma nova janela isolada
start "Servidor Next.js (Não Feche)" cmd /k "npm run dev"

echo O servidor local esta sendo ligado. Aguardando 5 segundos...
timeout /t 5 /nobreak > nul

:: Inicia o Ngrok em uma segunda janela
start "Tunel Ngrok (Copie o Link)" cmd /k "ngrok http 3001"

echo.
echo =========================================================================
echo  Passo a Passo:
echo  1. Uma janela preta do NGROK foi aberta.
echo  2. Procure pela linha "Forwarding" nela (algo como https://abcd.ngrok...)
echo  3. Copie o seu link https.
echo  4. Cole esse link no campo do Painel que acabamos de abrir no seu Chrome!
echo =========================================================================
echo.

:: Abre o painel localmente para gerenciamento
start http://localhost:3001

pause
