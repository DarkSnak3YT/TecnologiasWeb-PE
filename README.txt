# Centro Académico Clínico dos Açores (CACA) - Projeto Final

Aplicação web desenvolvida para a unidade curricular de Tecnologias Web, com o objetivo de criar uma plataforma institucional dinâmica para o Centro Académico Clínico dos Açores (CACA).

A aplicação combina uma interface moderna e interativa com integração de bases de dados, permitindo gestão de eventos, armazenamento persistente de dados e comunicação entre frontend e backend.

---

## Descrição do Projeto

A plataforma apresenta informações relacionadas com investigação, produção académica e eventos na área da saúde nos Açores.

### Principais Funcionalidades

- Gestão completa de eventos (CRUD)
- Sistema de newsletter com persistência de dados
- Formulário de contactos com validação
- Visualização de produção académica através de gráfico interativo
- Hélice de ADN animada em 3D
- Mapas dinâmicos para localização dos eventos
- Interface responsiva e interativa
- Integração entre frontend e backend através de API REST

---

## Tecnologias Utilizadas

### Frontend
- React
- CSS3
- JavaScript ES6
- Vite

### Backend
- Node.js
- Express.js

### Base de Dados
- SQLite

### Bibliotecas e APIs
- D3.js
- Three.js
- Leaflet.js
- OpenStreetMap
- OpenWeatherMap API

---

## Estrutura do Projeto

caca-projeto-final/
|
|-- frontend/
|   |-- src/
|   |-- public/
|   |-- package.json
|
|-- backend/
|   |-- src/
|   |-- database/
|   |-- package.json
|
|-- package.json

---

## Funcionalidades da Base de Dados

A aplicação utiliza uma base de dados SQLite para armazenamento persistente de informação.

### Dados armazenados:
- Utilizadores registados
- Dados de autenticação
- Perfis de utilizador
- Eventos criados pelo utilizador
- Subscrições da newsletter
- Mensagens enviadas através do formulário de contacto

Os dados permanecem guardados mesmo após fechar o navegador ou reiniciar o servidor.

---

## Configuração e Execução Local

### Requisitos
- Node.js instalado

### Instalação

Na pasta principal do projeto executar:

npm install
npm run install-all

Caso esteja a ser utilizado PowerShell e exista bloqueio do comando npm, pode ser utilizado:

npm.cmd install
npm.cmd run install-all

### Executar o Projeto

npm run dev

Ou, no PowerShell:

npm.cmd run dev

Frontend:
http://localhost:5173

Backend:
http://localhost:3001

---

## Arquitetura da Aplicação

A aplicação encontra-se dividida em duas partes principais: frontend e backend.

### Frontend

O frontend foi desenvolvido em React e é responsável pela interface gráfica, componentes visuais, animações, formulários e interação com o utilizador.

A estrutura anterior em HTML, CSS e JavaScript foi adaptada para componentes React, mantendo a identidade visual do projeto anterior.

### Backend

O backend foi desenvolvido em Node.js com Express.js e é responsável pelo processamento dos pedidos, validação dos dados e comunicação com a base de dados SQLite.

A comunicação entre o frontend e o backend é feita através de pedidos assíncronos utilizando fetch.

---

## Funcionalidades Implementadas

### Gestão de Eventos
- Criar eventos
- Listar eventos
- Editar eventos
- Remover eventos
- Persistência automática na base de dados

### Gestão de Utilizadores
- Registo de utilizadores
- Login
- Perfil de utilizador
- Edição do nome do perfil
- Permissões básicas entre administrador e utilizador regular

### Newsletter
- Validação de email
- Armazenamento na base de dados

### Contactos
- Validação de formulário
- Armazenamento persistente das mensagens

### Visualização de Dados
- Gráfico de barras interativo para representar a produção académica e científica.

### Mapas
- Integração com Leaflet e OpenStreetMap
- Localização dinâmica associada aos eventos

---

## Segurança e Validação

Foram aplicadas algumas preocupações básicas de segurança e validação:

- Validação dos dados introduzidos nos formulários
- Utilização de hash para guardar palavras-passe
- Utilização de token para autenticação
- Separação entre frontend, backend e base de dados
- Controlo básico de permissões de utilizador

---

## Acessibilidade e Responsividade

A aplicação mantém uma estrutura visual responsiva, adaptando-se a diferentes tamanhos de ecrã.

Foram também consideradas preocupações de acessibilidade, como:
- Utilização de labels nos formulários
- Contraste visual adequado
- Organização clara das secções
- Feedback visual em ações do utilizador

---

## Decisões de Implementação

Optou-se por utilizar React no frontend por permitir dividir a interface em componentes reutilizáveis e facilitar a organização da aplicação.

No backend, foi utilizado Node.js com Express.js por estar alinhado com os conteúdos abordados na unidade curricular e permitir criar uma API simples para comunicação com a base de dados.

A base de dados escolhida foi SQLite, por ser uma base de dados relacional simples, local e adequada para um projeto académico deste tipo.

---

## Equipa

- Rafael Dias — nº 2024110297
- Leandro Cosme — nº 2024111654
