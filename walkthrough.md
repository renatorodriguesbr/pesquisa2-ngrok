# Demonstração: Pesquisa de Satisfação (pesquisa1-gemini)

## Alterações Realizadas
- **Configuração do Projeto Next.js**: Criação do projeto `pesquisa1-gemini` com integração do Tailwind CSS.
- **Backend e Armazenamento de Dados**:
  - Implementação do `data.json` para armazenamento leve baseado em arquivo.
  - Criação do endpoint `POST /api/submit` para receber e validar as respostas da pesquisa.
  - Criação do endpoint `GET /api/results` para fornecer os dados agregados.
- **Páginas do Frontend**:
  - **`/survey` (Pesquisa)**: Um formulário limpo e amigável para dispositivos móveis, contendo a pergunta "Sim/Não", avaliação de "1 a 5 Estrelas" e entrada de "Texto livre" limitada a 20 caracteres.
  - **`/` (Painel de Controle)**: Uma interface de apresentação com atualização em tempo real, apresentando:
    - Um QR Code com link direto para a URL `/survey`.
    - Um Gráfico de Pizza (Sim vs Não) usando a biblioteca `recharts`.
    - Um Gráfico de Barras (1 a 5 Estrelas) usando a biblioteca `recharts`.
    - Uma **Nuvem de Palavras** construída com puro CSS, exibindo as palavras cadastradas com tamanhos dinâmicos baseados na quantidade de votos.

## Resultados das Validações

Simulei um fluxo de submissão do participante para verificar se as informações integraram de ponta a ponta:

1. Iniciei o servidor local de desenvolvimento.
2. Acessei o painel de controle e testei sua renderização visual (`http://localhost:3001`).
3. Naveguei para o formulário de participante (`http://localhost:3001/survey`), preenchi com o voto "Sim", avaliação "5 Estrelas" e a palavra "Sensacional", enviando as respostas.
4. Confirmei o aparecimento da tela de sucesso ("Obrigado!") e que o resultado foi gravado no banco de dados local `data.json`.
5. Retornei ao painel principal (`/`) e verifiquei o funcionamento em tempo real confirmando a atualização dos 3 gráficos usando o meu novo voto.
