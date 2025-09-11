# Ì∞≥ Docker Setup - Brevly Backend

Este documento explica como executar o backend do Brevly usando Docker.

## Ì≥ã Pr√©-requisitos

- Docker
- Docker Compose
- Conta no Cloudflare R2 (para armazenamento)

## Ì∫Ä Como executar

### 1. Configurar vari√°veis de ambiente

Copie o arquivo de exemplo e configure suas vari√°veis:

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
# Construir e executar todos os servi√ßos
docker-compose up --build

# Ou executar em background
docker-compose up -d --build
```

### 3. Executar migra√ß√µes do banco

```bash
# Executar migra√ß√µes
docker-compose exec app pnpm run db:migrate
```

## Ì¥ß Comandos √∫teis

```bash
# Parar todos os servi√ßos
docker-compose down

# Ver logs da aplica√ß√£o
docker-compose logs app

# Ver logs do banco
docker-compose logs postgres

# Acessar o container da aplica√ß√£o
docker-compose exec app sh

# Reconstruir apenas a aplica√ß√£o
docker-compose up --build app

# Testar build da imagem
docker build -t brevly-backend .
```

## Ìºê Acessos

- **API Backend**: http://localhost:3333
- **PostgreSQL**: localhost:5432
  - Usu√°rio: `app_user`
  - Senha: `app_password`
  - Database: `app_db`

## Ì≥Å Estrutura dos arquivos Docker

- `Dockerfile`: Configura√ß√£o da imagem da aplica√ß√£o
- `docker-compose.yml`: Orquestra√ß√£o dos servi√ßos
- `.dockerignore`: Arquivos ignorados no build
- `.env.example`: Exemplo de vari√°veis de ambiente

## Ì¥í Seguran√ßa

- A aplica√ß√£o executa como usu√°rio n√£o-root
- Vari√°veis sens√≠veis s√£o carregadas do arquivo `.env`
- Rede isolada entre os containers
- Volumes persistentes para o banco de dados

## ‚ö†Ô∏è Solu√ß√£o de problemas

### Erro: "Cannot find module '/app/dist/server.js'"

Este erro foi corrigido! O Vite gera `server.mjs` (ES module), n√£o `server.js`. O Dockerfile foi atualizado para usar o arquivo correto.

### Build local para teste

```bash
# Testar build local
pnpm run build
ls -la dist/  # Deve mostrar server.mjs
```
