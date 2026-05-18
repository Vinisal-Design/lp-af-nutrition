# AF Nutrition — Landing Page

Linha completa de suplementos AF Nutrition com venda direta via WhatsApp.

## Stack

HTML5 + CSS3 + JavaScript vanilla. Zero dependências em runtime.

## Estrutura

```
.
├── index.html
├── css/
│   ├── style.css          (fonte)
│   └── style.min.css      (production)
├── js/
│   ├── main.js            (fonte)
│   └── main.min.js        (production)
├── img/
│   ├── brand/             (SVG logos)
│   ├── products/          (10 produtos × AVIF/WebP/JPG em múltiplas larguras)
│   └── banners/           (7 banners × AVIF/WebP/JPG)
└── vercel.json            (config de deploy + cache headers)
```

## Performance

- AVIF + WebP + JPEG fallback via `<picture>` com srcset responsivo
- LCP preload com `imagesrcset`
- CSS/JS minificados, JS com `defer`
- `loading="lazy"` abaixo da dobra, `fetchpriority="high"` no LCP
- `width`/`height` em todas as imagens → CLS = 0
- Cache imutável de 1 ano para assets estáticos via `vercel.json`
