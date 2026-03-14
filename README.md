# Pesquisa de Satisfação (pesquisa2-ngrok)

## Sobre o Projeto
Este é um projeto **Next.js** desenvolvido para a criação de uma pesquisa de satisfação interativa em tempo real com suporte a conexões externas via Ngrok. Os participantes da pesquisa podem usar a própria rede móvel (3G/4G/5G) com celulares independentes lendo um QRCode em uma tela.

### Características e Alterações Realizadas
- **Configuração do Projeto Next.js**: Integração com Tailwind CSS para a estilização limpa.
- **Backend e Armazenamento de Dados**:
  - Implementação do `data.json` na raiz do projeto para armazenamento leve sem precisar de um banco de dados externo agora. 
  - Criação do endpoint `POST /api/submit` para receber e validar as respostas.
  - Criação do endpoint `GET /api/results` para fornecer os dados atualizados para geração dos gráficos.
- **Páginas do Frontend**:
  - **`/survey` (Pesquisa)**: Um formulário limpo e amigável para dispositivos móveis, contendo a pergunta "Sim/Não", avaliação de "1 a 5 Estrelas" e entrada de "Texto livre" limitada a 20 caracteres.
  - **`/` (Painel de Controle)**: Uma interface de apresentação com atualização em tempo real, apresentando:
    - Um campo para adicionar a URL púbica do **Ngrok**.
    - Um **QR Code** principal e acessível linkando diretamente para a URL colada + `/survey`, atualizando-se de forma dinâmica na tela!
    - Um **Gráfico de Pizza** (Sim vs Não) desenvolvido com a biblioteca `recharts`.
    - Um **Gráfico de Barras** (1 a 5 Estrelas), também com a biblioteca `recharts`.
    - Uma **Nuvem de Palavras**, construída com puro CSS, que vai ajustando o tamanho das palavras exibições de forma dinâmica baseada na quantidade de votos.

---

## Como Rodar o Projeto

Criamos o arquivo `iniciar_com_ngrok.bat` para facilitar e automatizar sua vida caso esteja rodando no Windows! Ao dar dois cliques, ele faz **três coisas** automaticamente:
1. Inicia o servidor local Next.js (na porta `3001` para não dar conflito com outros projetos locais).
2. Lança uma janela rodando o túnel público do **Ngrok**.
3. Abre seu navegador web exibindo o Painel de Controle local.

**Passo a passo manual:**
1. Instale as dependências com `npm install`.
2. Rode `npm run dev`. Vai abrir na porta `3001`.
3. Em outra janela do terminal, inicie o `ngrok http 3001`.
4. Copie a URL gerada pelo Ngrok (ex: `https://abcd.ngrok-free.app`).
5. Cole no campo que existe no painel e seu QR Code mudará automaticamente.
