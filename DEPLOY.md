# 🚀 Deploy no Netlify - St. Paul's AI Literacy Platform

## Pré-requisitos

- Conta no [Netlify](https://www.netlify.com/)
- Repositório GitHub conectado
- Variáveis de ambiente do Supabase

## Passo a Passo para Deploy

### 1. Conectar o Repositório

1. Acesse [Netlify](https://app.netlify.com/)
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Escolha **GitHub** e autorize o acesso
4. Selecione o repositório: `roneymatusp2/stpaulsAIliteracy`

### 2. Configurar Build Settings

O Netlify vai detectar automaticamente as configurações do `netlify.toml`:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18

### 3. Configurar Variáveis de Ambiente

No painel do Netlify, vá em **Site settings** → **Environment variables** e adicione:

```
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
VITE_SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role (opcional)
```

**Onde encontrar essas variáveis:**
1. Acesse seu projeto no [Supabase](https://supabase.com/dashboard)
2. Vá em **Settings** → **API**
3. Copie a **URL** e as **Keys**

### 4. Deploy

1. Clique em **"Deploy site"**
2. Aguarde o build (leva ~2-3 minutos)
3. Seu site estará disponível em: `https://seu-site.netlify.app`

### 5. Configurar Domínio Personalizado (Opcional)

1. Vá em **Domain settings**
2. Clique em **"Add custom domain"**
3. Siga as instruções para configurar DNS

## Recursos Configurados

✅ **SPA Routing** - Todas as rotas redirecionam para index.html
✅ **Cache Otimizado** - Assets estáticos com cache de 1 ano
✅ **Security Headers** - Proteção XSS, clickjacking, etc.
✅ **Performance** - Compressão e otimização automática
✅ **Lighthouse Plugin** - Relatórios de performance automáticos

## Deploy Automático

Cada push para a branch `main` vai disparar um deploy automático! 🎉

## Preview Deploys

Pull requests geram automaticamente preview URLs para testar antes de mergear.

## Troubleshooting

### Build falha?
- Verifique se todas as variáveis de ambiente estão configuradas
- Confirme que o Node version é 18
- Veja os logs de build no Netlify

### Rotas não funcionam?
- O `netlify.toml` já está configurado com redirects
- Certifique-se que o arquivo está no root do projeto

### Variáveis de ambiente não funcionam?
- Variáveis devem começar com `VITE_` para serem expostas no frontend
- Após adicionar variáveis, faça um novo deploy

## Comandos Úteis

```bash
# Testar build localmente
npm run build
npm run preview

# Verificar se o build está OK
npm run build && ls -la dist/
```

## Suporte

- [Documentação Netlify](https://docs.netlify.com/)
- [Documentação Vite](https://vitejs.dev/guide/)
- [Documentação Supabase](https://supabase.com/docs)

---

**Desenvolvido para St. Paul's School - São Paulo**
