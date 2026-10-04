// Shared page chrome: <head>, header, footer, JSON-LD nodes and small render helpers.
import { site } from './config.mjs';
import { services, serviceBySlug } from './services.mjs';

export const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const abs = path => site.url + path;
export const icon = id => `<svg aria-hidden="true"><use href="#${id}"></use></svg>`;
export const ARROW = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M12.5 5.5 19 12l-6.5 6.5"/></svg>';

// Cloudflare's Email Address Obfuscation rewrites plain addresses into /cdn-cgi/ links;
// email_off keeps the real, clickable address in the served HTML.
export const emailOff = html => `<!--email_off-->${html}<!--/email_off-->`;
export const mailto = (subject = '') => `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
export const emailLink = ({ cls = '', label = site.email, subject = '' } = {}) =>
  emailOff(`<a${cls ? ` class="${cls}"` : ''} href="${mailto(subject)}">${esc(label)}</a>`);
export const telHref = phone => 'tel:' + phone.replace(/[^\d+]/g, '');
export const waHref = () => `https://wa.me/${site.whatsapp}`;

export const socials = () => [
  site.social.facebook && { href: site.social.facebook, icon: 'i-fb', label: 'Facebook' },
  site.social.instagram && { href: site.social.instagram, icon: 'i-ig', label: 'Instagram' },
  site.social.linkedin && { href: site.social.linkedin, icon: 'i-li', label: 'LinkedIn' },
].filter(Boolean);

export function addressText({ multiline = false } = {}) {
  const a = site.address;
  const parts = [a.street, [a.locality, a.region].filter(Boolean).join(', ') + (a.postalCode ? ` ${a.postalCode}` : ''), a.countryName].filter(Boolean);
  return parts.map(esc).join(multiline ? '<br>' : ', ');
}

// ------------------------------------------------------------------ JSON-LD

export function orgNode() {
  const a = site.address;
  const node = {
    '@type': 'Organization',
    '@id': abs('/#organization'),
    name: site.name,
    legalName: site.legalName,
    alternateName: 'RythmnAI',
    url: abs('/'),
    email: site.email,
    slogan: site.slogan,
    description: `${site.legalName} is a software, AI and cloud engineering company building websites, web applications, SaaS products, e-commerce platforms, mobile apps, AI chatbots, RAG systems and AI agents, backed by cloud, DevOps and long-term support.`,
    logo: { '@type': 'ImageObject', '@id': abs('/#logo'), url: abs('/assets/logo-lockup.png'), contentUrl: abs('/assets/logo-lockup.png'), caption: site.legalName },
    image: { '@id': abs('/#logo') },
    sameAs: socials().map(s => s.href),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.email,
      ...(site.phone && { telephone: site.phone }),
      availableLanguage: ['English', 'Hindi'],
    },
  };
  if (site.phone) node.telephone = site.phone;
  if (site.founded) node.foundingDate = site.founded;
  if (a.locality) node.address = postalAddress();
  return node;
}

function postalAddress() {
  const a = site.address;
  return Object.fromEntries(Object.entries({
    '@type': 'PostalAddress',
    streetAddress: a.street,
    addressLocality: a.locality,
    addressRegion: a.region,
    postalCode: a.postalCode,
    addressCountry: a.country,
  }).filter(([, v]) => v));
}

// Local-business node: this is what ties the site to Jaipur for local search.
export function businessNode() {
  const node = {
    '@type': 'ProfessionalService',
    '@id': abs('/#business'),
    name: site.name,
    url: abs('/'),
    email: site.email,
    image: abs('/og-image.jpg'),
    logo: abs('/assets/logo-lockup.png'),
    parentOrganization: { '@id': abs('/#organization') },
    areaServed: [{ '@type': 'Country', name: 'India' }, { '@type': 'Place', name: 'Worldwide' }],
    knowsLanguage: ['en', 'hi'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: abs(`/services/${s.slug}/`) } })),
    },
  };
  if (site.phone) node.telephone = site.phone;
  if (site.address.locality) node.address = postalAddress();
  if (site.mapsUrl) node.hasMap = site.mapsUrl;
  return node;
}

export const websiteNode = () => ({
  '@type': 'WebSite', '@id': abs('/#website'), url: abs('/'), name: site.name, inLanguage: 'en', publisher: { '@id': abs('/#organization') },
});

export const webPageNode = ({ path, title, description, type = 'WebPage' }) => ({
  '@type': type, '@id': abs(path + '#webpage'), url: abs(path), name: title, description,
  isPartOf: { '@id': abs('/#website') }, about: { '@id': abs('/#organization') }, inLanguage: 'en',
});

export const breadcrumbNode = (path, trail) => ({
  '@type': 'BreadcrumbList',
  '@id': abs(path + '#breadcrumb'),
  itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: abs(c.href) })),
});

export const faqNode = (path, faqs) => ({
  '@type': 'FAQPage',
  '@id': abs(path + '#faq'),
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const jsonld = graph => `<script type="application/ld+json">\n${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replace(/</g, '\\u003c')}\n</script>`;

// ------------------------------------------------------------------ Chrome

export const NAV = [
  { href: '/services/', label: 'Services' },
  { href: '/work/', label: 'Work' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/about/', label: 'About' },
  { href: '/blog/', label: 'Blog' },
];

const current = (href, active) => (active && active.startsWith(href) ? ' aria-current="page"' : '');

export function header(active = '') {
  return `<header class="hdr">
  <div class="wrap hdr-in">
    <a class="brand" href="/" aria-label="Rythmn AI — home">
      <img src="/assets/logo-mark.png" width="41" height="34" alt="Rythmn AI logo">
      <span class="brand-txt">
        <span class="brand-name">RYTHMN <span>AI</span></span>
        <span class="brand-sub">Digital Private Limited</span>
      </span>
    </a>
    <nav class="nav" aria-label="Primary">
      ${NAV.map(n => `<a href="${n.href}"${current(n.href, active)}>${n.label}</a>`).join('\n      ')}
    </nav>
    <a class="btn btn-sm" href="/contact/">Start a project</a>
    <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="mobileNav" aria-label="Open menu">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
    </button>
  </div>
  <div class="mobile-nav" id="mobileNav">
    <ul>
      ${NAV.map(n => `<li><a href="${n.href}"${current(n.href, active)}>${n.label}</a></li>`).join('\n      ')}
      <li><a href="/contact/"${current('/contact/', active)}>Contact</a></li>
      <li><a class="btn" href="/contact/">Start a project</a></li>
    </ul>
  </div>
</header>`;
}

const FOOTER_COLS = [
  { h: 'Build', links: ['website-development', 'web-application-development', 'saas-development', 'ecommerce-development', 'mobile-app-development'] },
  { h: 'AI & platform', links: ['ai-chatbot-development', 'rag-development', 'ai-agent-development', 'cloud-infrastructure', 'devops-kubernetes', 'workflow-automation'] },
];

export function footer() {
  const contact = [
    `<li>${icon('i-mail')}${emailLink()}</li>`,
    site.phone && `<li>${icon('i-phone')}<a href="${telHref(site.phone)}">${esc(site.phone)}</a></li>`,
    site.whatsapp && `<li>${icon('i-wa')}<a href="${waHref()}" target="_blank" rel="noopener noreferrer">WhatsApp us</a></li>`,
    site.address.locality && `<li>${icon('i-pin')}<span>${site.address.street ? addressText() : `${esc(site.address.locality)}, ${esc(site.address.region)}, ${esc(site.address.countryName)}`}</span></li>`,
  ].filter(Boolean).join('\n          ');
  const legal = [
    `© ${new Date().getFullYear()} ${esc(site.legalName)}`,
    site.cin && `CIN ${esc(site.cin)}`,
    site.gstin && `GSTIN ${esc(site.gstin)}`,
  ].filter(Boolean).join(' · ');

  return `<footer class="ftr">
  <div class="wrap">
    <div class="ftr-top">
      <div class="ftr-brand">
        <a class="brand" href="/" aria-label="Rythmn AI — home">
          <img src="/assets/logo-mark.png" width="41" height="34" alt="Rythmn AI logo" loading="lazy">
          <span class="brand-txt">
            <span class="brand-name">RYTHMN <span>AI</span></span>
            <span class="brand-sub">Digital Private Limited</span>
          </span>
        </a>
        <p>Software, AI and cloud engineering for companies that need it built properly and kept running.</p>
        <ul class="ftr-contact">
          ${contact}
        </ul>
        <ul class="social">
          ${socials().map(s => `<li><a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="Rythmn AI on ${s.label}">${icon(s.icon)}</a></li>`).join('\n          ')}
        </ul>
      </div>
      ${FOOTER_COLS.map(c => `<div class="ftr-col">
        <h4>${esc(c.h)}</h4>
        <ul>
          ${c.links.map(slug => `<li><a href="/services/${slug}/">${esc(serviceBySlug[slug].short)}</a></li>`).join('\n          ')}
        </ul>
      </div>`).join('\n      ')}
      <div class="ftr-col">
        <h4>Company</h4>
        <ul>
          <li><a href="/about/">About us</a></li>
          <li><a href="/work/">Our work</a></li>
          <li><a href="/pricing/">Pricing &amp; engagement</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/services/">All services</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="ftr-bot">
      <p class="ftr-meta">${legal}</p>
      <span class="ftr-tag">Build <b>·</b> Innovate <b>·</b> Grow</span>
    </div>
  </div>
</footer>`;
}

export function crumbs(trail) {
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${trail.map((c, i) =>
    i === trail.length - 1 ? `<li><span aria-current="page">${esc(c.label)}</span></li>` : `<li><a href="${c.href}">${esc(c.label)}</a></li>`
  ).join('')}</ol></nav>`;
}

export function ctaBlock({ title = 'Tell us what you’re <span>building</span>.', text = 'Thirty minutes, no deck. Describe the problem and we’ll come back with how we’d approach it, what it takes and roughly when it ships — whether or not you hire us.' } = {}) {
  return `<section class="sec" aria-label="Get in touch" style="padding-top:0">
    <div class="wrap">
      <div class="cta">
        <div class="cta-in">
          <h2>${title}</h2>
          <p>${text}</p>
          <div class="cta-row">
            <a class="btn btn-amber" href="/contact/">Book a free call ${ARROW}</a>
            ${emailLink({ cls: 'btn btn-ghost', subject: 'Project enquiry' })}
          </div>
          <p class="cta-meta">Build · Innovate · Grow</p>
        </div>
      </div>
    </div>
  </section>`;
}

export function testimonialCards(items) {
  if (!items.length) return '';
  return `<div class="quotes">${items.map(t => `
        <figure class="quote">
          ${icon('i-quote')}
          <blockquote><p>${esc(t.quote)}</p></blockquote>
          <figcaption><b>${esc(t.name)}</b><span>${esc([t.role, t.company].filter(Boolean).join(', '))}</span></figcaption>
        </figure>`).join('')}
      </div>`;
}

export function postCard(p) {
  return `<article class="post-card">
          <p class="post-meta">${esc(p.tags.join(' · '))} · ${p.readMins} min read</p>
          <h3><a href="/blog/${p.slug}/">${esc(p.title)}</a></h3>
          <p>${esc(p.description)}</p>
          <span class="post-go" aria-hidden="true">Read article →</span>
        </article>`;
}

export function serviceCard(s) {
  return `<article class="svc" style="--c:${s.color}">
          <div class="svc-ico">${icon(s.icon)}</div>
          <p class="svc-kicker">${esc(s.kicker)}</p>
          <h3><a class="stretch" href="/services/${s.slug}/">${esc(s.name)}</a></h3>
          <p>${esc(s.description)}</p>
          <span class="svc-go" aria-hidden="true">Explore →</span>
        </article>`;
}

const MENU_JS = `<script>
(function(){
  var b = document.getElementById('menuBtn'), n = document.getElementById('mobileNav');
  b.addEventListener('click', function(){
    var open = n.classList.toggle('open');
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
    b.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  /* header shrink + scroll progress */
  var h = document.querySelector('.hdr'), busy = false;
  function onScroll(){
    var y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    h.classList.toggle('scrolled', y > 8);
    h.style.setProperty('--prog', max > 0 ? (y / max).toFixed(4) : 0);
    busy = false;
  }
  addEventListener('scroll', function(){ if (!busy) { busy = true; requestAnimationFrame(onScroll); } }, {passive:true});
  onScroll();

  /* reveal cards as they scroll in; anything already on screen is left alone */
  if (!document.documentElement.classList.contains('rv-on') || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold: .12, rootMargin: '0px 0px -6% 0px'});
  document.querySelectorAll('main .sec-head, .svc, .post-card, .dlv li, .bar, .eng-card, .values li, .case, .quote, .stack-col, .faq details, .aside, .soon-card, .grp-head, .cta').forEach(function(el){
    if (el.getBoundingClientRect().top < innerHeight) return;
    var k = Array.prototype.indexOf.call(el.parentNode.children, el) % 3;
    el.style.setProperty('--d', (k * 0.08) + 's');
    el.classList.add('rv');
    io.observe(el);
  });
  document.querySelectorAll('.svc').forEach(function(c){
    c.addEventListener('mousemove', function(e){
      var r = c.getBoundingClientRect();
      c.style.setProperty('--x', (e.clientX - r.left) + 'px');
      c.style.setProperty('--y', (e.clientY - r.top) + 'px');
    });
  });
})();
</script>`;

// Full document for every generated page. `css` and `sprite` are lifted from index.html by build.mjs,
// so the home page stays the single source of truth for base styles and icons.
export function page({ path, title, description, active = '', body, graph = [], ogType = 'website', css, sprite, scripts = '', robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }) {
  const url = abs(path);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
${site.analytics}
<meta name="robots" content="${robots}">
<meta name="author" content="${esc(site.legalName)}">
<meta name="theme-color" content="#F4F7FE">
<meta name="color-scheme" content="light">
<script>if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rv-on')</script>
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="en_IN">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${abs('/og-image.jpg')}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${abs('/og-image.jpg')}">
<link rel="icon" href="/assets/icon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/assets/icon-192.png" sizes="192x192" type="image/png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>${css}</style>
${graph.length ? jsonld(graph) : ''}
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>
${sprite}
${header(active)}
<main id="main">
${body}
</main>
${footer()}
${MENU_JS}
${scripts}
</body>
</html>
`;
}
