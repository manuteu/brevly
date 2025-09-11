# Use a imagem oficial do Node.js como base
FROM node:23.11-alpine AS base

# Instalar pnpm globalmente
RUN npm install -g pnpm@10.13.1

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Stage de dependências
FROM base AS deps
RUN pnpm install --frozen-lockfile

# Stage de build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build da aplicação
RUN pnpm run build

# Stage de produção
FROM node:23.11-alpine AS production

# Instalar pnpm globalmente
RUN npm install -g pnpm@10.13.1

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instalar apenas dependências de produção
RUN pnpm install --frozen-lockfile --prod

# Copiar arquivos buildados do stage anterior
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist

# Copiar arquivos de configuração necessários
COPY --chown=nodejs:nodejs drizzle.config.ts ./

# Mudar para usuário não-root
USER nodejs

# Expor a porta
EXPOSE 3333

# Definir variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3333

# Comando para iniciar a aplicação (usando o arquivo .mjs gerado pelo Vite)
CMD ["node", "dist/server.mjs"]
