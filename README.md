# Projeto Final - CACA

## Descrição
Este projeto refatoriza a landing page do Centro Académico Clínico dos Açores para React e acrescenta uma API em Node.js/Express para gestão de utilizadores, eventos, subscrições de newsletter e mensagens de contacto.

## Tecnologias usadas
- Frontend: React com Vite
- Backend: Node.js com Express
- Base de dados: SQLite
- Autenticação: JWT
- Segurança básica: passwords guardadas com hash através de bcryptjs

## Estrutura
```txt
frontend/  aplicação React
backend/   API Express e base de dados SQLite
```

## Funcionalidades
- Landing page migrada para React
- Secções principais: apresentação, notícias, investigação, eventos, parceiros e contactos
- Gestão de eventos com persistência em SQLite através da API
- Newsletter com validação e persistência em SQLite
- Formulário de contactos com validação e persistência em SQLite
- Registo de utilizadores
- Login com token JWT
- Visualização e edição do perfil
- Permissões básicas: utilizador e admin

## Como correr
Na pasta principal:

```bash
npm install
npm run install-all
npm run dev
```

Também é possível correr separadamente:

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

O backend corre em `http://localhost:3001` e o frontend em `http://localhost:5173`.

## Conta de teste
Administrador criado automaticamente:

- Email: `admin@caca.pt`
- Password: `admin123`

## Decisões de implementação
A estrutura foi mantida simples para ficar próxima dos conteúdos trabalhados em aula. A landing page anterior foi dividida em componentes React, como Header, LandingPage, Auth, Perfil e Footer. A comunicação com o backend é feita através de `fetch`, de forma assíncrona.

A API foi separada por rotas, controladores, middleware e base de dados. O token JWT permite manter a sessão do utilizador no frontend. A base de dados SQLite guarda utilizadores, eventos, subscrições da newsletter e mensagens de contacto. Os eventos são carregados com GET, criados com POST, editados com PUT e removidos com DELETE.

## Acessibilidade e responsividade
Foram mantidas etiquetas semânticas, textos alternativos nas imagens principais, formulários com campos identificáveis e adaptação para dispositivos móveis através de CSS.
