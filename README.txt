# Centro Académico Clínico dos Açores (CACA) - Projeto Final

Aplicação web desenvolvida para a unidade curricular de **Tecnologias Web**, com o objetivo de refatorizar e desenvolver a landing page do **Centro Académico Clínico dos Açores (CACA)** utilizando uma framework front-end e uma API de gestão de utilizadores.

O projeto resulta da evolução dos trabalhos anteriores, mantendo a identidade visual da landing page já desenvolvida e acrescentando uma arquitetura com frontend, backend e base de dados.

---

## Equipa

- Rafael Dias — nº 2024110297
- Leandro Cosme — nº 2024111654

---

## Descrição do Projeto

A aplicação apresenta uma plataforma institucional para o CACA, com informação sobre investigação, eventos, oportunidades, parceiros e contactos.

Nesta versão final, a estrutura anterior em HTML, CSS e JavaScript foi adaptada para **React**, sendo também implementado um backend em **Node.js com Express** e uma base de dados **SQLite** para guardar informação de forma persistente.

---

## Principais Funcionalidades

- Landing page institucional do CACA
- Refatorização da interface para React
- Sistema de registo e login de utilizadores
- Perfil de utilizador
- Distinção básica entre utilizador regular e administrador
- Gestão de eventos com operações CRUD
- Subscrição de newsletter com validação
- Formulário de contactos com validação
- Armazenamento persistente em base de dados SQLite
- Comunicação assíncrona entre frontend e backend
- Interface responsiva e adaptada ao estilo visual do projeto anterior

---

## Tecnologias Utilizadas

### Frontend

- React
- Vite
- JavaScript ES6
- CSS3

**Justificação:**  
React foi utilizado por permitir organizar a interface em componentes reutilizáveis, facilitando a manutenção do código e a separação das diferentes secções da landing page. O Vite foi usado por simplificar a criação e execução do projeto React em ambiente de desenvolvimento.

### Backend

- Node.js
- Express.js

**Justificação:**  
Node.js permite utilizar JavaScript também no lado do servidor, mantendo a mesma linguagem entre frontend e backend. Express.js foi utilizado para criar uma API simples, organizada por rotas, responsável pela comunicação com a base de dados.

### Base de Dados

- SQLite

**Justificação:**  
SQLite foi escolhido por ser uma base de dados relacional simples, local e adequada para um projeto académico. Não exige instalação de um servidor externo como MySQL ou MongoDB, mas permite guardar dados de forma persistente.

---

## Estrutura do Projeto

```txt
caca-projeto-final/
|
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- styles/
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |
|   |-- public/
|   |-- package.json
|
|-- backend/
|   |-- src/
|   |   |-- server.js
|   |   |-- routes/
|   |   |-- database/
|   |
|   |-- package.json
|
|-- package.json
|-- README.md
```

---

## Arquitetura da Aplicação

A aplicação está dividida em três partes principais:

### 1. Frontend

O frontend foi desenvolvido em React e é responsável por apresentar a interface ao utilizador.  
As secções da landing page foram organizadas em componentes, permitindo uma estrutura mais modular do que a versão anterior em HTML e JavaScript puro.

### 2. Backend

O backend foi desenvolvido em Node.js com Express.js.  
Este backend disponibiliza uma API com rotas para autenticação, gestão de utilizadores, eventos, newsletter e contactos.

### 3. Base de Dados

A base de dados SQLite guarda os dados persistentes da aplicação, como utilizadores, eventos, subscrições e mensagens de contacto.

### Comunicação

A comunicação entre frontend e backend é feita através de pedidos assíncronos com `fetch`.

Exemplo geral da arquitetura:

```txt
Utilizador
   |
   v
Frontend React
   |
   | pedidos fetch
   v
Backend Node.js + Express
   |
   v
Base de Dados SQLite
```

---

## Base de Dados

A aplicação utiliza uma base de dados SQLite para guardar dados de forma persistente.

### Dados armazenados

- Utilizadores registados
- Informação de login
- Perfis de utilizador
- Eventos
- Subscrições da newsletter
- Mensagens do formulário de contacto

Os dados ficam guardados no lado do servidor, dentro da pasta do backend, e continuam disponíveis mesmo depois de atualizar a página.

---

## Funcionalidades Implementadas

### Gestão de Utilizadores

- Registo de novos utilizadores
- Login
- Perfil de utilizador
- Edição do nome no perfil
- Permissão básica associada ao utilizador

### Gestão de Eventos

- Criar eventos
- Listar eventos
- Editar eventos
- Remover eventos
- Guardar eventos na base de dados

### Newsletter

- Validação do email
- Validação da seleção do país
- Armazenamento da subscrição na base de dados

### Contactos

- Validação do nome
- Validação do email
- Validação do número de telemóvel
- Validação do assunto
- Validação da mensagem
- Armazenamento da mensagem na base de dados

### Elementos visuais e interativos

- Carrossel de notícias
- Secções informativas sobre investigação, parceiros e oportunidades
- Animação visual associada à área da saúde/investigação
- Gráfico de produção académica e científica
- Mapa integrado na secção de contactos

---

## APIs e Integrações Externas

A aplicação utiliza integração visual com mapas através de conteúdo externo incorporado na página.

- **OpenStreetMap / mapa incorporado:** utilizado para apresentar a localização do CACA e/ou dos eventos.
- **Mapa por iframe:** utilizado na secção de contactos para apresentar a localização institucional.

Nota: nesta versão, o mapa é usado como integração visual. Não é necessário configurar chave de API externa para executar o projeto localmente.

---

## Segurança

Foram implementadas preocupações básicas de segurança adequadas ao contexto académico do projeto:

- Palavras-passe guardadas com hash
- Autenticação com token JWT
- Validação de dados recebidos nos formulários
- Separação entre frontend, backend e base de dados
- Distinção básica entre utilizador regular e administrador

### Limitações conhecidas

- O projeto utiliza configuração adequada para ambiente académico/local.
- Em ambiente de produção, o segredo do JWT deveria estar obrigatoriamente num ficheiro `.env`.
- O CORS deveria ser restringido ao domínio real da aplicação.
- As permissões poderiam ser reforçadas no backend para limitar certas operações apenas a administradores.

---

## Acessibilidade e Responsividade

Foram consideradas preocupações básicas de acessibilidade e usabilidade:

- Estrutura organizada por secções
- Labels e placeholders nos formulários
- Mensagens de erro e sucesso para feedback ao utilizador
- Contraste visual adequado
- Layout adaptado a diferentes tamanhos de ecrã
- Manutenção da identidade visual do projeto anterior

---

## Configuração e Execução Local

### Requisitos

- Node.js instalado

### Instalação

Na pasta principal do projeto, executar:

```bash
npm install
npm run install-all
```

Caso o PowerShell bloqueie o comando `npm`, pode ser utilizado:

```bash
npm.cmd install
npm.cmd run install-all
```

### Executar o projeto

```bash
npm run dev
```

Ou, no PowerShell:

```bash
npm.cmd run dev
```

Depois de correr o projeto, aceder no navegador a:

```txt
http://localhost:5173
```

O backend fica disponível em:

```txt
http://localhost:3001
```

---

## Conta de Teste

Existe uma conta de administrador para teste da aplicação:

```txt
Email: admin@caca.pt
Password: admin123
```

---

## Decisões de Implementação

A principal decisão foi transformar a landing page anterior numa aplicação React, mantendo o aspeto visual já desenvolvido no projeto anterior.

A gestão de dados, que anteriormente estava centrada no lado do cliente, foi migrada para uma solução com backend e base de dados SQLite. Esta alteração permite aproximar o projeto de uma arquitetura mais realista, onde o frontend comunica com uma API e os dados ficam guardados no servidor.

Optou-se por uma estrutura simples e compreensível, adequada aos conteúdos abordados na unidade curricular.
