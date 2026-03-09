@echo off
echo =======================================================
echo     Iniciando o Servidor do Projeto de Pesquisa...
echo =======================================================
echo.

:: Inicia o servidor do Next.js em uma nova janela invisivel/separada
start cmd /k "npm run dev"

echo O servidor esta inicializando. Aguardando 5 segundos...
timeout /t 5 /nobreak > nul

echo.
echo Abrindo os links no seu navegador padrao...
start http://localhost:3001
start http://localhost:3001/survey

echo.
echo =======================================================
echo     Tudo pronto! 
echo     Para encerrar o sistema, basta fechar a janela 
echo     preta do servidor (Node.js/npm) que foi aberta.
echo =======================================================
pause
