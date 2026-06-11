# Aprova Aí — Sistema de Aprovação de Conteúdo

Sistema completo para agências enviarem conteúdo para aprovação de clientes via link, sem necessidade de login.

## Stack

- **Frontend/Backend**: Next.js 14 (App Router)
- **Banco de dados**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Auth**: NextAuth.js
- **Upload de arquivos**: Supabase Storage
- **Email**: Resend
- **Deploy**: Vercel

---

## Passo a passo para colocar no ar

### 1. Criar conta no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie um projeto
2. Vá em **Settings → Database**
3. Em "Connection string", copie a URL do modo **Transaction** (porta 6543) → `DATABASE_URL`
4. Copie a URL do modo **Session** (porta 5432) → `DIRECT_URL`
5. Vá em **Storage → New bucket**, crie um bucket chamado `conteudos` e marque como **Public**
6. Vá em **Settings → API** e copie:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Criar conta no Resend (envio de email)

1. Acesse [resend.com](https://resend.com) e crie uma conta
2. Crie uma API Key → `RESEND_API_KEY`
3. Configure um domínio ou use o domínio de teste deles para `FROM_EMAIL`

### 3. Configurar variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
cp .env.example .env.local
```

```env
DATABASE_URL="postgresql://postgres.xxxx:[SENHA]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxxx:[SENHA]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"

NEXTAUTH_SECRET="gere-com-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

RESEND_API_KEY="re_xxxxxxxxxxxx"
FROM_EMAIL="noreply@seudominio.com.br"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJxxx..."
```

### 4. Instalar dependências e criar banco

```bash
npm install
npm run db:push     # cria as tabelas no Supabase
npm run dev         # inicia em http://localhost:3000
```

### 5. Deploy na Vercel

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Faça deploy
vercel

# Configure as variáveis de ambiente no painel da Vercel:
# vercel.com → seu projeto → Settings → Environment Variables
# Adicione todas as variáveis do .env.local
# Troque NEXTAUTH_URL e NEXT_PUBLIC_APP_URL pela URL da Vercel
```

Ou conecte o repositório GitHub em [vercel.com/new](https://vercel.com/new).

---

## Funcionalidades

- ✅ Cadastro e login de agências
- ✅ Cadastro de clientes com aprovadores
- ✅ Envio de conteúdo (texto + arquivo via Supabase Storage)
- ✅ Link único de aprovação por cliente (sem login necessário)
- ✅ Envio por email (Resend) e WhatsApp (link direto)
- ✅ Aprovação com um clique ou solicitação de refação com observação
- ✅ Dashboard com métricas (pendentes, aprovados, refações)
- ✅ Whitelabel: nome e cor da agência na página de aprovação
- ✅ Histórico de aprovações por status

## Estrutura de pastas

```
app/
  dashboard/          # área da agência (autenticado)
    clientes/         # listar e cadastrar clientes
    aprovacoes/       # listar e enviar conteúdos
    configuracoes/    # whitelabel
  aprovar/[token]/    # página pública de aprovação (sem login)
  api/                # rotas de API
lib/
  prisma.ts           # cliente do banco
  auth.ts             # configuração NextAuth
  supabase.ts         # upload de arquivos
  email.ts            # envio de email
prisma/
  schema.prisma       # modelo do banco
```
