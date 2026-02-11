# Sistema de Rotas - Brevly

## Rotas Implementadas

### 1. **Página Inicial** - `/`
- **Componente**: `Home`
- **Descrição**: Página principal da aplicação com formulário para criar links encurtados
- **Exemplo**: `http://localhost:5173/`

### 2. **Redirect** - `/:shortCode`
- **Componente**: `Redirect`
- **Descrição**: Página que faz o redirect para a URL original baseada no código curto
- **Exemplo**: `http://localhost:5173/youtube`
- **Funcionalidade**:
  - Faz requisição para o backend: `GET /short-urls/{shortCode}`
  - Redireciona automaticamente para a `originalUrl`
  - Em caso de erro, redireciona para a página 404 após 2 segundos

### 3. **Not Found** - `/404` e `*`
- **Componente**: `NotFound`
- **Descrição**: Página exibida quando uma rota não é encontrada
- **Exemplo**: `http://localhost:5173/404`
- **Funcionalidade**:
  - Exibe mensagem de link não encontrado
  - Link para voltar à página inicial

## Configuração Técnica

### Dependências Adicionadas
- `react-router-dom` - Gerenciamento de rotas

### Arquivos Criados/Modificados
- `src/components/Routes.tsx` - Configuração das rotas
- `src/hooks/useRedirect.ts` - Hook para lógica de redirect
- `src/pages/Redirect.tsx` - Página de redirect (atualizada)
- `src/pages/NotFound.tsx` - Página 404 (atualizada)
- `src/App.tsx` - Configuração do BrowserRouter
- `src/libs/axios.ts` - Removida dependência do env.ts

### Estrutura de Rotas
```
/ (Home)
├── /:shortCode (Redirect)
├── /404 (Not Found)
└── * (Not Found - catch all)
```

## Como Usar

### Desenvolvimento
```bash
pnpm dev
```
Acesse: `http://localhost:5173/` (ou porta disponível)

### Testando as Rotas
1. **Página Inicial**: `http://localhost:5173/`
2. **Redirect**: `http://localhost:5173/qualquer-codigo`
3. **404**: `http://localhost:5173/rota-inexistente`

### Backend
Certifique-se de que o backend está rodando e acessível na URL configurada em `VITE_END_POINT` (padrão: `http://localhost:3333/`)

## ��� Fluxo de Redirect

1. Usuário acessa `http://localhost:5173/{shortCode}`
2. Hook `useRedirect` faz requisição para `GET /short-urls/{shortCode}`
3. Se sucesso: redireciona para `originalUrl`
4. Se erro: exibe mensagem de erro e redireciona para `/404`

## ���️ Variáveis de Ambiente

```env
VITE_END_POINT=http://localhost:3333/
```
