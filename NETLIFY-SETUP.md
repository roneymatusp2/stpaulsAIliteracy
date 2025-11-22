# 🚀 Setup Rápido - Netlify

## Problema: Tela em branco com erro "supabaseUrl is required"

### ✅ Solução em 3 Passos:

## 1️⃣ Configure as Variáveis no Netlify

1. Acesse: https://app.netlify.com/
2. Selecione seu site
3. Vá em: **Site configuration** → **Environment variables**
4. Clique em **"Add a variable"**

Adicione estas 2 variáveis:

```
Nome: VITE_SUPABASE_URL
Valor: https://seu-projeto.supabase.co
```

```
Nome: VITE_SUPABASE_ANON_KEY
Valor: sua_chave_publica_aqui
```

## 2️⃣ Onde Pegar as Credenciais do Supabase

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto (ou crie um novo)
3. Vá em: **Settings** ⚙️ → **API**
4. Copie:
   - **Project URL** → Cole em `VITE_SUPABASE_URL`
   - **anon public** key → Cole em `VITE_SUPABASE_ANON_KEY`

## 3️⃣ Faça o Redeploy

1. No Netlify, vá em **Deploys**
2. Clique em **"Trigger deploy"**
3. Selecione **"Clear cache and deploy site"**
4. Aguarde ~2 minutos

✅ **Pronto!** Seu site deve funcionar agora!

---

## 🆘 Ainda não funciona?

### Opção A: Usar sem Supabase (Modo Demo)

Se você não tem Supabase configurado, o site vai funcionar com dados mock (demonstração).

**No Netlify, adicione:**
```
VITE_SUPABASE_URL=https://demo.supabase.co
VITE_SUPABASE_ANON_KEY=demo-key
```

O site vai detectar que são placeholders e usar dados de exemplo.

### Opção B: Criar Projeto Supabase (Grátis)

1. Acesse: https://supabase.com/
2. Clique em **"Start your project"**
3. Crie uma conta (grátis)
4. Crie um novo projeto
5. Aguarde ~2 minutos para o projeto ser criado
6. Copie as credenciais conforme o passo 2 acima

---

## 📋 Checklist de Verificação

- [ ] Variáveis adicionadas no Netlify
- [ ] Variáveis começam com `VITE_`
- [ ] Fez "Clear cache and deploy site"
- [ ] Aguardou o deploy completar
- [ ] Abriu o site em uma aba anônima (Ctrl+Shift+N)

---

## 🔍 Como Verificar se Funcionou

1. Abra o site
2. Pressione **F12** (DevTools)
3. Vá na aba **Console**
4. Se ver: `⚠️ Supabase not configured` → Está usando dados mock (OK para demo)
5. Se não ver erros → Supabase configurado corretamente! ✅

---

## 💡 Dica Pro

Depois de configurar, você pode:
- Adicionar suas próprias ferramentas de IA no Supabase
- Gerenciar conteúdo pelo painel do Supabase
- Criar tabelas personalizadas

**Documentação:** https://supabase.com/docs

---

**Desenvolvido para St. Paul's School - São Paulo**
