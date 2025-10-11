# 🚀 Guia Completo de Deploy - LyvioSec Website

## 📦 Arquivos para Deploy no GitHub Pages

Você precisa fazer upload dos seguintes arquivos e pastas para o repositório `lyviosec.github.io`:

### Estrutura de Arquivos:
```
lyviosec.github.io/
├── index.html              ✅ Página principal (OBRIGATÓRIO na raiz)
├── 404.html               ✅ Página de erro 404
├── CNAME                  ✅ Configuração de domínio customizado
├── robots.txt             ✅ SEO - Instruções para crawlers
├── sitemap.xml            ✅ SEO - Mapa do site
├── README.md              ✅ Documentação
└── assets/
    ├── css/
    │   └── styles.css     ✅ Estilos do site
    ├── js/
    │   └── main.js        ✅ JavaScript do site
    └── images/
        ├── logo.jpg       ✅ Logo da empresa
        ├── hero.jpg       ✅ Imagem do hero
        ├── og-image.jpg   ✅ Imagem para redes sociais
        ├── service-web.jpg      ✅ Ícone Web & API
        ├── service-mobile.jpg   ✅ Ícone Mobile
        ├── service-infra.jpg    ✅ Ícone Infra & AD
        └── service-redteam.jpg  ✅ Ícone Red Team
```

---

## 📋 Passo a Passo para Deploy

### 1️⃣ Criar o Repositório no GitHub

1. Acesse: https://github.com/new
2. Nome do repositório: `lyviosec.github.io` (exatamente este nome)
3. Deixe como **Public**
4. **NÃO** inicialize com README
5. Clique em **Create repository**

### 2️⃣ Fazer Upload dos Arquivos

**Opção A: Via Interface Web do GitHub**

1. No repositório criado, clique em **uploading an existing file**
2. Arraste todos os arquivos e pastas listados acima
3. Mantenha a estrutura de pastas (assets/css, assets/js, assets/images)
4. Commit message: "Initial commit: LyvioSec website"
5. Clique em **Commit changes**

**Opção B: Via Git Command Line**

```bash
# Clone o repositório vazio
git clone https://github.com/SEU_USUARIO/lyviosec.github.io.git
cd lyviosec.github.io

# Copie todos os arquivos do site para esta pasta
# (mantenha a estrutura de pastas)

# Adicione todos os arquivos
git add .

# Faça o commit
git commit -m "Initial commit: LyvioSec website"

# Envie para o GitHub
git push origin main
```

### 3️⃣ Configurar GitHub Pages

1. Acesse o repositório no GitHub
2. Vá em **Settings** → **Pages** (menu lateral)
3. Em **Source**, selecione:
   - ✅ **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
4. Clique em **Save**
5. Aguarde alguns minutos - o site estará disponível em: `https://lyviosec.github.io`

### 4️⃣ Configurar Domínio Customizado (www.lyviosec.com)

**A) Configurar DNS no seu provedor de domínio:**

Adicione os seguintes registros DNS:

```
Tipo: A
Nome: @
Valor: 185.199.108.153

Tipo: A
Nome: @
Valor: 185.199.109.153

Tipo: A
Nome: @
Valor: 185.199.110.153

Tipo: A
Nome: @
Valor: 185.199.111.153

Tipo: CNAME
Nome: www
Valor: lyviosec.github.io
```

**B) Configurar no GitHub Pages:**

1. No GitHub, vá em **Settings** → **Pages**
2. Em **Custom domain**, digite: `www.lyviosec.com`
3. Clique em **Save**
4. Aguarde a validação do DNS (pode levar de minutos a 48 horas)
5. Marque ✅ **Enforce HTTPS** quando disponível

---

## ✅ Checklist de Verificação

Após o deploy, verifique:

- [ ] Site acessível em `https://lyviosec.github.io`
- [ ] Domínio customizado `www.lyviosec.com` funcionando
- [ ] HTTPS ativado (cadeado verde no navegador)
- [ ] Todas as imagens carregando corretamente
- [ ] Formulário de contato funcionando (Formspree)
- [ ] Menu de navegação funcionando
- [ ] Site responsivo no mobile
- [ ] Página 404 funcionando (acesse uma URL inválida)
- [ ] Meta tags para redes sociais (compartilhe no WhatsApp/Twitter)

---

## 🧪 Testar Localmente (Opcional)

Para testar o site localmente antes do deploy:

```bash
# Navegue até a pasta com os arquivos
cd /caminho/para/arquivos

# Inicie um servidor HTTP simples
python3 -m http.server 8080

# Acesse no navegador
# http://localhost:8080
```

---

## 🔧 Troubleshooting

### Problema: Site não carrega após deploy

**Solução:**
- Verifique se o arquivo `index.html` está na raiz do repositório
- Confirme que a branch selecionada é `main` (não `master`)
- Aguarde 5-10 minutos para o GitHub processar

### Problema: Imagens não aparecem

**Solução:**
- Verifique se a pasta `assets/images` foi enviada com todas as imagens
- Confirme que os nomes dos arquivos estão corretos (minúsculas)
- Limpe o cache do navegador (Ctrl+Shift+R)

### Problema: Domínio customizado não funciona

**Solução:**
- Verifique os registros DNS no seu provedor
- Use ferramentas como https://dnschecker.org para verificar propagação
- Aguarde até 48h para propagação completa do DNS

### Problema: Formulário não envia

**Solução:**
- Verifique se o endpoint Formspree está correto no `index.html`
- Confirme que o Formspree está ativo em sua conta
- Teste em modo anônimo (desabilite extensões do navegador)

---

## 📞 Suporte

Em caso de dúvidas ou problemas:

- **Email**: contato@lyviosec.com
- **WhatsApp**: +55 (11) 98447-6807
- **GitHub Issues**: https://github.com/lyviosec/lyviosec.github.io/issues

---

## 📚 Recursos Úteis

- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Custom Domain Configuration](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Formspree Documentation](https://help.formspree.io/)
- [DNS Checker Tool](https://dnschecker.org)

---

✅ **Após seguir todos os passos, seu site estará no ar em www.lyviosec.com!**
