/* AF Nutrition — Landing Page (vanilla JS, mobile-first)
 * Renders product grid, intersperses banners, controls modal + WhatsApp links.
 */

const WHATSAPP_NUMBER = "5511939031675"; // +55 11 93903-1675

const buildWaUrl = (productName) => {
  const text = productName
    ? `Olá, tenho interesse no ${productName}.`
    : "Olá, gostaria de saber mais sobre a linha AF Nutrition.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

const formatBRL = (value) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// Original price = promotional * 1.15, rounded to integer reais
const originalFromPromo = (promo) => Math.round(promo * 1.15);

const PRODUCT_WIDTHS = [400, 800, 1200];
const BANNER_WIDTHS = [600, 1200];

const productImg = (slug, featured = false) => ({
  slug,
  avif: PRODUCT_WIDTHS.map(w => `img/products/${slug}-${w}.avif ${w}w`).join(", "),
  webp: PRODUCT_WIDTHS.map(w => `img/products/${slug}-${w}.webp ${w}w`).join(", "),
  jpg: `img/products/${slug}-800.jpg`,
  sizes: featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 300px, 50vw"
});

const bannerImg = (slug) => ({
  slug,
  avif: BANNER_WIDTHS.map(w => `img/banners/${slug}-${w}.avif ${w}w`).join(", "),
  webp: BANNER_WIDTHS.map(w => `img/banners/${slug}-${w}.webp ${w}w`).join(", "),
  jpg: `img/banners/${slug}-1200.jpg`,
  sizes: "(min-width: 768px) 50vw, 50vw"
});

const PRODUCTS = [
  {
    id: "gummy-creatina-uva",
    name: "Gummy Creatina · Sabor Uva",
    weight: "240g · 30 doses",
    price: 167,
    img: productImg("gummy-creatina-uva"),
    shortDescription: "Creatina monohidratada em formato de goma sabor uva — prática, gostosa e zero açúcares. 3g de creatina por dose, sem glúten e sem lactose.",
    benefits: [
      "3000 mg de creatina monohidratada por dose",
      "Aumento de força e potência muscular",
      "Suporte à saúde cerebral e cognição",
      "Zero açúcares · sem glúten · sem lactose",
      "Praticidade: 1 unidade por dia"
    ],
    doses: { unit: "1 unidade (8g)", frequency: "1x ao dia", total: "30 doses" },
    usage: "Consumir 1 unidade (8g) ao dia ou conforme recomendação do profissional de saúde."
  },
  {
    id: "gummy-creatina-frutas-vermelhas",
    name: "Gummy Creatina · Frutas Vermelhas",
    weight: "240g · 30 doses",
    price: 167,
    img: productImg("gummy-creatina-frutas-vermelhas"),
    shortDescription: "Creatina monohidratada em goma sabor frutas vermelhas — 3g por dose, sem açúcar e sem lactose. Performance no formato mais fácil de manter.",
    benefits: [
      "3000 mg de creatina monohidratada por dose",
      "Mais força, energia e explosão muscular",
      "Suporte à saúde mental e cognitiva",
      "Zero açúcares · sem glúten · sem lactose",
      "Adesão diária facilitada pelo sabor"
    ],
    doses: { unit: "1 unidade (8g)", frequency: "1x ao dia", total: "30 doses" },
    usage: "Consumir 1 unidade (8g) ao dia ou conforme recomendação do profissional de saúde."
  },
  {
    id: "gummy-collagen",
    name: "Gummy Colágeno",
    weight: "240g · 30 doses",
    price: 167,
    img: productImg("gummy-collagen"),
    shortDescription: "Colágeno em formato de goma — beleza e nutrição em uma unidade por dia. Suporte à pele, cabelo e unhas no formato mais prático possível.",
    benefits: [
      "Colágeno para pele, cabelo e unhas",
      "Praticidade: 1 unidade por dia",
      "Sabor agradável que facilita a adesão",
      "Sem glúten · sem lactose",
      "Fórmula A Fórmula com pureza garantida"
    ],
    doses: { unit: "1 unidade (8g)", frequency: "1x ao dia", total: "30 doses" },
    usage: "Consumir 1 unidade (8g) ao dia ou conforme orientação do profissional de saúde."
  },
  {
    id: "creatina-caramelo-caramelo",
    name: "Creatina em Caramelo · Caramelo",
    weight: "6,5g por unidade · 2/dia",
    price: 142,
    img: productImg("creatina-caramelo-caramelo"),
    shortDescription: "Creatina monohidratada em formato de bala de caramelo. A maneira mais gostosa e fácil de manter sua suplementação em dia.",
    benefits: [
      "Aumento de força e explosão muscular",
      "Mais energia para treinos e rotina",
      "Melhora da performance física",
      "Contribui para a saúde muscular",
      "Suporte à saúde mental e cognição",
      "Praticidade e sabor que facilitam a adesão diária"
    ],
    doses: { unit: "2 caramelos", frequency: "1x ao dia", total: "Posologia diária" },
    usage: "Consumir 2 caramelos por dia ou conforme orientação profissional."
  },
  {
    id: "creatina-caramelo-brigadeiro",
    name: "Creatina em Caramelo · Brigadeiro",
    weight: "6,5g por unidade · 2/dia",
    price: 142,
    img: productImg("creatina-caramelo-brigadeiro"),
    shortDescription: "Creatina em formato de brigadeiro. Mesma performance, sabor que vai te fazer esperar a hora do consumo.",
    benefits: [
      "Aumento de força e explosão muscular",
      "Mais energia para treinos e rotina",
      "Melhora da performance física",
      "Contribui para a saúde muscular",
      "Suporte à saúde mental e cognição",
      "Praticidade e sabor que facilitam a adesão diária"
    ],
    doses: { unit: "2 caramelos", frequency: "1x ao dia", total: "Posologia diária" },
    usage: "Consumir 2 caramelos por dia ou conforme orientação profissional."
  },
  {
    id: "creatina-efervescente",
    name: "Creatina Efervescente",
    weight: "180g · ~60 doses",
    price: 90,
    img: productImg("creatina-efervescente"),
    shortDescription: "Creatina monohidratada em pó efervescente. Dissolva em água ou bebida de preferência: 3g por dose, sabor leve e absorção rápida.",
    benefits: [
      "Aumento de força e potência muscular",
      "Energia e explosão para treinos intensos",
      "Melhora da performance física geral",
      "Suporte à saúde cerebral e mental",
      "Versátil: combina com qualquer bebida",
      "Fórmula efervescente prática"
    ],
    doses: { unit: "1 dose (3g)", frequency: "1x ao dia", total: "60 doses" },
    usage: "Consumir 1 dose ao dia (equivalente a 3g de creatina) ou conforme orientação profissional. Dissolver em água ou bebida de preferência."
  },
  {
    id: "formula-coffee",
    name: "Fórmula Coffee · Chocolate Belga",
    weight: "220g · ~30 doses",
    price: 129,
    img: productImg("formula-coffee"),
    shortDescription: "Café funcional sabor chocolate belga com TCM, colágeno e fibras. Energia, foco e disposição em uma xícara por dia.",
    benefits: [
      "Energia sustentada ao longo do dia",
      "Aumento da performance física e mental",
      "Termogênico e antioxidante",
      "Melhora foco, atenção e cognição",
      "Suporte ao metabolismo",
      "Contém TCM, colágeno e fibras"
    ],
    doses: { unit: "1 dose", frequency: "1x ao dia (manhã)", total: "Use diariamente" },
    usage: "Consumir 1 dose ao dia, preferencialmente pela manhã ou antes de atividades que exijam foco e energia."
  },
  {
    id: "nutri-hair-gum",
    name: "Nutri Hair Gum",
    weight: "84g · 2 gomas/dia",
    price: 70,
    img: productImg("nutri-hair-gum"),
    shortDescription: "Goma nutricional para cabelo, pele e unhas. Vitaminas do complexo B e antioxidantes em formato saboroso e prático.",
    benefits: [
      "Fortalece os cabelos",
      "Favorece o crescimento saudável",
      "Melhora a saúde e resistência das unhas",
      "Pele mais bonita e nutrida",
      "Suporte antioxidante",
      "Vitaminas do complexo B",
      "Fórmula completa e saborosa"
    ],
    doses: { unit: "2 gomas", frequency: "1x ao dia", total: "Consumo diário" },
    usage: "Consumir 2 gomas ao dia ou conforme orientação profissional."
  },
  {
    id: "omega-3-918-360",
    name: "Ômega 3 · EPA 918 · DHA 360",
    weight: "1300 mg · alta concentração",
    price: 115,
    featured: true,
    featuredLabel: "Alta concentração",
    img: productImg("omega-3-918-360", true),
    shortDescription: "Ômega 3 alta concentração com EPA 918mg e DHA 360mg. Suporte completo ao coração, cérebro e visão com tecnologia MEG-3.",
    benefits: [
      "Potente ação anti-inflamatória",
      "Suporte completo à saúde do coração",
      "Proteção dos vasos sanguíneos",
      "Ação antioxidante",
      "Saúde cerebral e imunológica",
      "Alta concentração de EPA e DHA",
      "Excelente absorção com tecnologia MEG-3"
    ],
    doses: { unit: "1 cápsula", frequency: "1x ao dia", total: "Consumo diário" },
    usage: "Consumir 1 dose ao dia ou conforme orientação profissional."
  },
  {
    id: "omega-3-579-379",
    name: "Ômega 3 · EPA 579 · DHA 379",
    weight: "958 mg · óleo de peixe puro",
    price: 99,
    featured: true,
    featuredLabel: "Linha clássica",
    img: productImg("omega-3-579-379", true),
    shortDescription: "Ômega 3 com EPA 579mg e DHA 379mg. Suporte cardiovascular, cognitivo e imunológico no formato clássico e acessível.",
    benefits: [
      "Ação anti-inflamatória",
      "Proteção ao sistema imune",
      "Saúde cognitiva e cerebral",
      "Suporte à memória e foco",
      "Saúde cardiovascular",
      "Óleo de peixe de alta pureza",
      "Excelente absorção"
    ],
    doses: { unit: "1 cápsula", frequency: "1x ao dia", total: "Consumo diário" },
    usage: "Consumir 1 dose ao dia ou conforme orientação profissional."
  }
];

const BANNERS = [
  { img: bannerImg("banner-gummy-creatinas"),       alt: "Linha Gummy Creatina — Uva e Frutas Vermelhas", productId: "gummy-creatina-uva" },
  { img: bannerImg("banner-omega"),                 alt: "Linha Ômega 3 AF Nutrition", productId: "omega-3-918-360" },
  { img: bannerImg("banner-collagen"),              alt: "Gummy Colágeno AF Nutrition", productId: "gummy-collagen" },
  { img: bannerImg("banner-coffee"),                alt: "Fórmula Coffee Chocolate Belga", productId: "formula-coffee" },
  { img: bannerImg("banner-creatina-efervescente"), alt: "Creatina Efervescente AF Nutrition", productId: "creatina-efervescente" },
  { img: bannerImg("banner-creatina-caramelo"),     alt: "Creatina em Caramelo Brigadeiro", productId: "creatina-caramelo-brigadeiro" },
  { img: bannerImg("banner-nutri-hair"),            alt: "Nutri Hair Gum AF Nutrition", productId: "nutri-hair-gum" }
];

/* ---------- Rendering ---------- */

const escapeHtml = (str) => String(str).replace(/[&<>"']/g, (ch) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[ch]));

const priceMarkup = (promoValue) => {
  const original = originalFromPromo(promoValue);
  return `
    <div class="card__prices">
      <span class="price__from">de ${formatBRL(original)}</span>
      <span class="price__now">por ${formatBRL(promoValue)}</span>
    </div>
  `;
};

const productCardHtml = (p, index) => {
  // First 4 cards are typically above the fold on mobile + always on desktop
  const eager = index < 4;
  const loadAttr = eager ? "eager" : "lazy";
  const priorityAttr = index === 0 ? ' fetchpriority="high"' : "";
  const featuredClass = p.featured ? " card--featured" : "";
  const featuredLabel = p.featured && p.featuredLabel
    ? `<span class="card__featured-label">${escapeHtml(p.featuredLabel)}</span>`
    : "";
  return `
  <article class="card${featuredClass}" data-product-id="${p.id}">
    ${featuredLabel}
    <button class="card__media" data-open="${p.id}" aria-label="Ver detalhes de ${escapeHtml(p.name)}">
      <picture>
        <source type="image/avif" srcset="${p.img.avif}" sizes="${p.img.sizes}">
        <source type="image/webp" srcset="${p.img.webp}" sizes="${p.img.sizes}">
        <img src="${p.img.jpg}" alt="${escapeHtml(p.name)}" width="800" height="800" loading="${loadAttr}" decoding="async"${priorityAttr}>
      </picture>
    </button>
    <div class="card__body">
      <h3 class="card__title">${escapeHtml(p.name)}</h3>
      <p class="card__weight">${escapeHtml(p.weight)}</p>
      ${priceMarkup(p.price)}
      <button class="card__cta" data-open="${p.id}" type="button">Ver detalhes</button>
    </div>
  </article>
  `;
};

const bannerPairHtml = (b1, b2) => `
  <div class="banner banner--pair">
    <a href="#produtos" data-open="${b1.productId}" aria-label="Abrir detalhes — ${escapeHtml(b1.alt)}">
      <picture>
        <source type="image/avif" srcset="${b1.img.avif}" sizes="${b1.img.sizes}">
        <source type="image/webp" srcset="${b1.img.webp}" sizes="${b1.img.sizes}">
        <img src="${b1.img.jpg}" alt="${escapeHtml(b1.alt)}" width="1200" height="1500" loading="lazy" decoding="async">
      </picture>
    </a>
    <a href="#produtos" data-open="${b2.productId}" aria-label="Abrir detalhes — ${escapeHtml(b2.alt)}">
      <picture>
        <source type="image/avif" srcset="${b2.img.avif}" sizes="${b2.img.sizes}">
        <source type="image/webp" srcset="${b2.img.webp}" sizes="${b2.img.sizes}">
        <img src="${b2.img.jpg}" alt="${escapeHtml(b2.alt)}" width="1200" height="1500" loading="lazy" decoding="async">
      </picture>
    </a>
  </div>
`;

const renderGrid = () => {
  const grid = document.getElementById("products-grid");
  const parts = [];

  // 4 products → banner pair → 4 products → banner pair → 2 products
  for (let i = 0; i < 4; i++) parts.push(productCardHtml(PRODUCTS[i], i));
  parts.push(bannerPairHtml(BANNERS[0], BANNERS[1]));
  for (let i = 4; i < 8; i++) parts.push(productCardHtml(PRODUCTS[i], i));
  parts.push(bannerPairHtml(BANNERS[2], BANNERS[3]));
  for (let i = 8; i < 10; i++) parts.push(productCardHtml(PRODUCTS[i], i));

  grid.innerHTML = parts.join("");
};

/* ---------- Modal ---------- */

const modal = document.getElementById("product-modal");
const modalBody = document.getElementById("modal-body");
let lastFocusedElement = null;

const renderModalContent = (p) => {
  const original = originalFromPromo(p.price);
  return `
    <div class="modal__media">
      <picture>
        <source type="image/avif" srcset="${p.img.avif}" sizes="(min-width: 768px) 720px, 100vw">
        <source type="image/webp" srcset="${p.img.webp}" sizes="(min-width: 768px) 720px, 100vw">
        <img src="${p.img.jpg}" alt="${escapeHtml(p.name)}" width="800" height="800" decoding="async" fetchpriority="high">
      </picture>
    </div>
    <div class="modal__content">
      <h2 class="modal__title" id="modal-title">${escapeHtml(p.name)}</h2>
      <p class="modal__weight">${escapeHtml(p.weight)}</p>
      <p class="modal__description">${escapeHtml(p.shortDescription)}</p>

      <div>
        <p class="benefits-title">Benefícios</p>
        <ul class="benefits-list">
          ${p.benefits.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
        </ul>
      </div>

      <div class="doses" aria-label="Tabela de doses">
        <span><strong>${escapeHtml(p.doses.unit)}</strong><br><span>por porção</span></span>
        <span><strong>${escapeHtml(p.doses.frequency)}</strong><br><span>frequência</span></span>
        <span><strong>${escapeHtml(p.doses.total)}</strong><br><span>total</span></span>
      </div>

      <p class="usage"><strong>Como usar:</strong> ${escapeHtml(p.usage)}</p>

      <div class="modal__prices">
        <span class="price__from">de ${formatBRL(original)}</span>
        <span class="price__now">por ${formatBRL(p.price)}</span>
      </div>

      <a class="btn btn--whatsapp modal__cta" href="${buildWaUrl(p.name)}" target="_blank" rel="noopener">
        <svg class="icon-wa" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4M12 2.2C6.6 2.2 2.2 6.6 2.2 12c0 1.7.5 3.4 1.3 4.9L2.1 21.8 7 20.5c1.5.8 3.2 1.2 4.9 1.2 5.4 0 9.8-4.4 9.8-9.8S17.4 2.2 12 2.2"/></svg>
        Comprar pelo WhatsApp
      </a>
    </div>
  `;
};

const openModal = (productId) => {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;
  lastFocusedElement = document.activeElement;
  modalBody.innerHTML = renderModalContent(product);
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  const closeBtn = modal.querySelector(".modal__close");
  if (closeBtn) closeBtn.focus();
};

const closeModal = () => {
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modalBody.innerHTML = "";
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
};

/* ---------- Wiring ---------- */

const wireCtas = () => {
  const url = buildWaUrl();
  ["header-cta", "hero-cta", "footer-cta", "fab-whatsapp"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = url;
  });
};

const wireFab = () => {
  const fab = document.getElementById("fab-whatsapp");
  if (!fab) return;
  const threshold = 240; // px from top before FAB appears
  let ticking = false;
  const update = () => {
    const y = window.scrollY || window.pageYOffset;
    fab.classList.toggle("is-visible", y > threshold);
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
};

const wireEvents = () => {
  document.addEventListener("click", (event) => {
    const opener = event.target.closest("[data-open]");
    if (opener) {
      event.preventDefault();
      openModal(opener.getAttribute("data-open"));
      return;
    }
    const closer = event.target.closest("[data-close]");
    if (closer && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });
};

/* ---------- Init ---------- */

document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  wireCtas();
  wireEvents();
  wireFab();
});
