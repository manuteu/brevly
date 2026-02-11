# Docker Setup - Brevly Backend

Este documento explica como executar o backend do Brevly usando Docker.

## Pré-requisitos

- Docker
- Docker Compose
- Conta no Cloudflare R2 (para armazenamento)

## Como executar

### 1. Configurar variáveis de ambiente

Copie o arquivo de exemplo e configure suas variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais reais do Cloudflare R2:

```env
# Cloudflare R2 - Configure com seus valores reais
CLOUDFLARE_ACCOUNT_ID=seu_account_id_aqui
CLOUDFLARE_ACCESS_KEY_ID=seu_access_key_aqui
CLOUDFLARE_SECRET_ACCESS_KEY=sua_secret_key_aqui
CLOUDFLARE_BUCKET=nome_do_seu_bucket
CLOUDFLARE_PUBLIC_URL=https://sua-url-publica.com
```

### 2. Executar com Docker Compose

```bash
# Construir e executar todos os serviços
docker-compose up --build

# Ou executar em background
docker-compose up -d --build
```

### 3. Executar migrações do banco

```bash
# Executar migrações
docker-compose exec app pnpm run db:migrate
```

## Comandos úteis

```bash
# Parar todos os serviços
docker-compose down

# Ver logs da aplicação
docker-compose logs app

# Ver logs do banco
docker-compose logs postgres

# Acessar o container da aplicação
docker-compose exec app sh

# Reconstruir apenas a aplicação
docker-compose up --build app

# Testar build da imagem
docker build -t brevly-backend .
```

## Acessos

- **API Backend**: http://localhost:3333
- **PostgreSQL**: localhost:5432
  - Usuário: `app_user`
  - Senha: `app_password`
  - Database: `app_db`

## Estrutura dos arquivos Docker

- `Dockerfile`: Configuração da imagem da aplicação
- `docker-compose.yml`: Orquestração dos serviços
- `.dockerignore`: Arquivos ignorados no build
- `.env.example`: Exemplo de variáveis de ambiente

## Segurança

- A aplicação executa como usuário não-root
- Variáveis sensíveis são carregadas do arquivo `.env`
- Rede isolada entre os containers
- Volumes persistentes para o banco de dados

## ⚠️ Solução de problemas

### Erro: "Cannot find module '/app/dist/server.js'"

Este erro foi corrigido! O Vite gera `server.mjs` (ES module), não `server.js`. O Dockerfile foi atualizado para usar o arquivo correto.

### Build local para teste

```bash
# Testar build local
pnpm run build
ls -la dist/  # Deve mostrar server.mjs
```
