# LyvioSec — Pentest & Red Team

Site institucional da consultoria LyvioSec, especializada em segurança ofensiva.

## 🚀 Deploy no GitHub Pages

### Passo 1: Configuração do Repositório

1. Crie um repositório no GitHub chamado `lyviosec.github.io`
2. Clone este repositório localmente
3. Copie todos os arquivos deste projeto para o repositório

### Passo 2: Commit e Push

```bash
git add .
git commit -m "Initial commit: LyvioSec website"
git push origin main
```

### Passo 3: Configurar GitHub Pages

1. Acesse o repositório no GitHub
2. Vá em **Settings** → **Pages**
3. Em **Source**, selecione:
   - **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
4. Clique em **Save**

### Passo 4: Configurar Domínio Customizado

1. No seu provedor de DNS (ex: Registro.br, Cloudflare), adicione os seguintes registros:

```
Tipo A:
www.lyviosec.com → 185.199.108.153
www.lyviosec.com → 185.199.109.153
www.lyviosec.com → 185.199.110.153
www.lyviosec.com → 185.199.111.153

Tipo CNAME:
lyviosec.com → lyviosec.github.io
```

2. No GitHub Pages (Settings → Pages):
   - Em **Custom domain**, digite: `www.lyviosec.com`
   - Marque **Enforce HTTPS**

3. Aguarde a propagação do DNS (pode levar até 48h)

## 📝 Como Editar o Conteúdo

### Alterar Textos

Edite o arquivo `index.html` e procure pelas seções:

- **Hero Section**: linha ~60
- **Serviços**: linha ~90
- **Metodologia**: linha ~180
- **Sobre**: linha ~240
- **Contato**: linha ~270

### Alterar Imagens

Substitua as imagens na pasta `assets/images/`:

- `logo.jpg` - Logo da empresa (400x400px)
- `hero.jpg` - Imagem do hero (1920x1080px)
- `service-web.jpg` - Ícone Web & API (800x600px)
- `service-mobile.jpg` - Ícone Mobile (800x600px)
- `service-infra.jpg` - Ícone Infra & AD (800x600px)
- `service-redteam.jpg` - Ícone Red Team (800x600px)

### Alterar Cores

Edite o arquivo `assets/css/styles.css`, linhas 7-20 (variáveis CSS):

```css
:root {
  --bg-primary: #000000;        /* Fundo principal */
  --brand-primary: #00FFD1;     /* Cor de destaque */
  --text-primary: #FFFFFF;      /* Cor do texto */
}
```

### Alterar Formulário

Para mudar o endpoint do Formspree:

1. Crie uma conta em [Formspree.io](https://formspree.io/)
2. Crie um novo form e copie a URL
3. Edite `index.html`, linha ~280:
   ```html
   <form id="contactForm" action="SUA_URL_AQUI" method="POST">
   ```

## 🛠️ Estrutura do Projeto

```
/
├── index.html              # Página principal
├── 404.html               # Página de erro
├── CNAME                  # Configuração de domínio
├── robots.txt             # SEO - robots
├── sitemap.xml            # SEO - sitemap
├── README.md              # Documentação
└── assets/
    ├── css/
    │   └── styles.css     # Estilos
    ├── js/
    │   └── main.js        # Scripts
    └── images/
        ├── logo.jpg
        ├── hero.jpg
        ├── service-*.jpg
        └── favicon.ico
```

## ✅ Checklist de SEO & Performance

- [x] HTML5 semântico
- [x] Meta tags (title, description)
- [x] Open Graph & Twitter Cards
- [x] Structured Data (JSON-LD)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonical URL
- [x] Lazy loading de imagens
- [x] Responsivo (mobile-first)
- [x] Acessibilidade (WCAG 2.1)
- [x] Formulário com validação

## 📞 Suporte

Em caso de dúvidas sobre edição ou deploy:

- Email: contato@lyviosec.com
- WhatsApp: +55 (11) 98447-6807

---

© 2025 Lyvio Security — Segurança Ofensiva
CNPJ: 61.976.792/0001-29