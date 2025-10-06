# API de Gerenciamento de Usuários e Tarefas

API REST desenvolvida com Node.js e TypeScript para gerenciar usuários e tarefas, seguindo boas práticas de desenvolvimento e arquitetura limpa.

## 🎯 Objetivo

Este projeto implementa uma API REST para gerenciamento de usuários e tarefas, permitindo operações CRUD completas para ambas as entidades, com relacionamento entre elas.

Esse projeto foi desenvolvido para o teste de Estagiario na Empresa Agenus
Requisitos do teste: https://docs.google.com/document/d/1QQMB9ifiRWMgETel34SNkOcv5UnNoH031Zgwg-Tiwt0/edit?tab=t.0

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Express** - Framework web para Node.js
- **Prisma ORM** - ORM para interação com o banco de dados
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Biblioteca para validação de dados

## 📁 Estrutura do Projeto

```
├── prisma/                  # Configurações do Prisma ORM
│   ├── migrations/          # Migrações do banco de dados
│   └── schema.prisma        # Schema do banco de dados
├── src/
│   ├── controllers/         # Controladores da aplicação
│   ├── database/            # Configuração de conexão com o banco
│   ├── generated/           # Arquivos gerados pelo Prisma
│   ├── repositories/        # Repositórios para acesso aos dados
│   ├── routes/              # Definição das rotas da API
│   └── use-cases/           # Casos de uso da aplicação
├── .env                     # Variáveis de ambiente
├── index.ts                 # Ponto de entrada da aplicação
├── package.json             # Dependências do projeto
└── tsconfig.json            # Configurações do TypeScript
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL
- npm ou yarn

### Passos para instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/GustaDev12/Agenus-Teste
   cd agenus
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
     ```
     DATABASE_URL="postgresql://usuario:senha@localhost:5432/agenus?schema=public"
     ```
   - Substitua `usuario`, `senha` e `agenus` pelos seus dados de conexão com o PostgreSQL

4. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   # ou
   yarn prisma migrate dev
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

## 📡 Endpoints da API

### Usuários

- **POST /users** - Criar um novo usuário
  ```json
  {
    "name": "Nome do Usuário",
    "email": "usuario@email.com"
  }
  ```

- **GET /users** - Listar todos os usuários

- **GET /users/:id** - Buscar um usuário específico

- **PUT /users/:id** - Atualizar um usuário
  ```json
  {
    "name": "Novo Nome",
    "email": "novo@email.com"
  }
  ```

- **DELETE /users/:id** - Deletar um usuário

### Tarefas

- **POST /tasks** - Criar uma tarefa vinculada a um usuário
  ```json
  {
    "title": "Título da Tarefa",
    "description": "Descrição da tarefa",
    "status": "PENDING",
    "userId": "id-do-usuario"
  }
  ```

- **GET /tasks** - Listar todas as tarefas (com nome do usuário associado)

- **GET /tasks/:id** - Buscar uma tarefa específica

- **PUT /tasks/:id** - Atualizar uma tarefa
  ```json
  {
    "title": "Novo Título",
    "description": "Nova descrição",
    "status": "COMPLETED"
  }
  ```

- **DELETE /tasks/:id** - Deletar uma tarefa

## 🗃️ Estrutura do Banco de Dados

### Tabela `Users`
- `id` (UUID) - Identificador único do usuário
- `name` (string) - Nome do usuário
- `email` (string, único) - Email do usuário
- `createdAt` (datetime) - Data de criação do registro

### Tabela `Tasks`
- `id` (UUID) - Identificador único da tarefa
- `title` (string, único) - Título da tarefa
- `description` (string) - Descrição da tarefa
- `status` (enum: 'PENDING' | 'COMPLETED') - Status da tarefa
- `userId` (UUID) - Referência ao usuário proprietário da tarefa
- `createdAt` (datetime) - Data de criação do registro

## 🧪 Iniciar

Para iniciar a aplicação siga os comandos abaixo no terminal:

```bash
npm run dev
# ou
yarn run dev
```
