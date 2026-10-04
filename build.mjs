#!/usr/bin/env node
// Static site generator — no dependencies. Run `node build.mjs` after editing anything in src/.
//
// index.html stays hand-crafted. The build reads its <style> block and icon sprite (so every page
// shares one design system), then rewrites only the marked regions in it (header, footer, JSON-LD,
// latest posts). Every other page, plus sitemap.xml, is generated from src/.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, team, testimonials, caseStudies, engagements } from './src/config.mjs';
import { services, serviceBySlug, GROUPS } from './src/services.mjs';
import { posts, postBySlug } from './src/posts.mjs';
import * as L from './src/layout.mjs';

const { esc, icon, ARROW } = L;
const ROOT = dirname(fileURLToPath(import.meta.url));
const TODAY = new Date().toISOString().slice(0, 10);
const read = f => readFileSync(join(ROOT, f), 'utf8');

// ------------------------------------------------------------------ integrity checks
for (const s of services) for (const r of s.related) if (!serviceBySlug[r]) throw new Error(`${s.slug}: unknown related service "${r}"`);
for (const s of services) if (s.post && !postBySlug[s.post]) throw new Error(`${s.slug}: unknown post "${s.post}"`);
for (const p of posts) for (const r of p.services) if (!serviceBySlug[r]) throw new Error(`${p.slug}: unknown service "${r}"`);
for (const c of caseStudies) for (const r of c.services || []) if (!serviceBySlug[r]) throw new Error(`case study ${c.client}: unknown service "${r}"`);
for (const t of testimonials) if (t.service && !serviceBySlug[t.service]) throw new Error(`testimonial: unknown service "${t.service}"`);

// ------------------------------------------------------------------ home-page regions
let home = read('index.html');
const markers = name => new RegExp(`(<!-- @${name} -->)[\\s\\S]*?(<!-- /@${name} -->)`);
function region(html, name) {
  const m = html.match(new RegExp(`<!-- @${name} -->([\\s\\S]*?)<!-- /@${name} -->`));
  if (!m) throw new Error(`index.html is missing the <!-- @${name} --> … <!-- /@${name} --> markers`);
  return m[1];
}
const inject = (html, name, content) => (region(html, name), html.replace(markers(name), (_, open, close) => `${open}\n${content}\n${close}`));

const css = home.match(/<style>([\s\S]*?)<\/style>/)[1] + read('src/pages.css');
const sprite = region(home, 'sprite').trim();
const render = opts => L.page({ ...opts, css, sprite });

const urls = [{ path: '/' }];
function write(path, html, { sitemap = true } = {}) {
  const file = path.endsWith('/') ? join(ROOT, path, 'index.html') : join(ROOT, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  if (sitemap) urls.push({ path });
}

const HOME = { label: 'Home', href: '/' };
const sectionHead = (eyebrow, h2, id, lede = '') => `<div class="sec-head">
        <p class="eyebrow">${eyebrow}</p>
        <h2 class="h2" id="${id}">${h2}</h2>${lede ? `\n        <p class="lede">${lede}</p>` : ''}
      </div>`;
const faqSection = (faqs, heading = 'Frequently asked questions') => `<section class="sec-tight" aria-labelledby="faq-h">
    <div class="wrap">
      ${sectionHead('FAQ', heading, 'faq-h')}
      <div class="faq">${faqs.map(f => `
        <details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}
      </div>
    </div>
  </section>`;
const bars = steps => `<div class="bars">${steps.map((p, i) => `
        <div class="bar">
          <span class="bar-n">STEP 0${i + 1}</span>
          <div class="bar-pips" aria-hidden="true">${[0, 1, 2, 3].map(k => `<i${k <= i ? ' class="f"' : ''}></i>`).join('')}</div>
          <h3>${esc(p.t)}</h3>
          <p>${esc(p.d)}</p>
        </div>`).join('')}
      </div>`;
const quotesSection = (items, h2 = 'What clients say') => items.length ? `<section class="sec-tight" aria-labelledby="quotes-h">
    <div class="wrap">
      ${sectionHead('Client feedback', h2, 'quotes-h')}
      ${L.testimonialCards(items)}
    </div>
  </section>` : '';
const base = () => [L.orgNode(), L.websiteNode()];

// ------------------------------------------------------------------ service pages
for (const s of services) {
  const path = `/services/${s.slug}/`;
  const trail = [HOME, { label: 'Services', href: '/services/' }, { label: s.name, href: path }];
  const post = s.post && postBySlug[s.post];
  const body = `
  <section class="phero" style="--c:${s.color}">
    <div class="wrap phero-in">
      ${L.crumbs(trail)}
      <div class="phero-ico">${icon(s.icon)}</div>
      <p class="eyebrow">${esc(s.kicker)}</p>
      <h1 class="h1">${esc(s.h1)}</h1>
      <p class="hero-sub">${esc(s.description)}</p>
      <div class="hero-cta">
        <a class="btn" href="/contact/?service=${s.slug}">Get a free quote ${ARROW}</a>
        <a class="btn btn-ghost" href="/pricing/">How pricing works</a>
      </div>
    </div>
  </section>

  <section class="sec-tight">
    <div class="wrap split">
      <div class="copy">
        ${s.intro.map(p => `<p>${esc(p)}</p>`).join('\n        ')}
      </div>
      <aside class="aside">
        <p class="aside-h">A good fit when</p>
        <ul class="checks">${s.fit.map(f => `
          <li>${icon('i-check')}<span>${esc(f)}</span></li>`).join('')}
        </ul>
      </aside>
    </div>
  </section>

  <section class="sec-tight sec-alt" aria-labelledby="dlv-h">
    <div class="wrap">
      ${sectionHead('What we deliver', `${esc(s.name)} services`, 'dlv-h')}
      <ul class="dlv">${s.deliverables.map((d, i) => `
        <li><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(d.t)}</h3><p>${esc(d.d)}</p></li>`).join('')}
      </ul>
    </div>
  </section>

  <section class="sec-tight" aria-labelledby="proc-h">
    <div class="wrap">
      ${sectionHead('How it works', 'From first call to live — and after', 'proc-h', 'You see working software at the end of every step, not a status deck.')}
      ${bars(s.process)}
      <p class="aside-h" style="margin-top:36px">Tools we use</p>
      <ul class="stack-row">${s.tech.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
    </div>
  </section>

  ${quotesSection(testimonials.filter(t => t.service === s.slug))}

  ${faqSection(s.faqs, `${esc(s.name)} — FAQs`)}

  <section class="sec-tight sec-alt" aria-labelledby="rel-h">
    <div class="wrap">
      ${sectionHead('Keep exploring', 'Related services', 'rel-h')}
      <div class="svc-grid">
        ${s.related.map(r => L.serviceCard(serviceBySlug[r])).join('\n        ')}
      </div>
      ${post ? `<div class="post-grid" style="margin-top:18px">${L.postCard(post)}</div>` : ''}
    </div>
  </section>

  ${L.ctaBlock({ title: `Planning a <span>${esc(s.short.toLowerCase())}</span> project?` })}`;

  write(path, render({
    path, title: s.title, description: s.description, active: '/services/', body,
    graph: [
      ...base(),
      L.webPageNode({ path, title: s.title, description: s.description }),
      {
        '@type': 'Service',
        '@id': L.abs(path + '#service'),
        name: s.name,
        serviceType: s.name,
        description: s.description,
        url: L.abs(path),
        provider: { '@id': L.abs('/#organization') },
        areaServed: s.local
          ? [{ '@type': 'City', name: 'Jaipur' }, { '@type': 'State', name: 'Rajasthan' }, { '@type': 'Country', name: 'India' }]
          : [{ '@type': 'Country', name: 'India' }, { '@type': 'Place', name: 'Worldwide' }],
      },
      L.breadcrumbNode(path, trail),
      L.faqNode(path, s.faqs),
    ],
  }));
}

// ------------------------------------------------------------------ services index
{
  const path = '/services/';
  const title = 'Software, AI & Cloud Development Services — Rythmn AI';
  const description = 'All Rythmn AI services: AI chatbots, RAG and AI agents; website, web app, SaaS, e-commerce and mobile development; APIs, integrations, cloud, DevOps, databases, automation, support and consulting.';
  const trail = [HOME, { label: 'Services', href: path }];
  const body = `
  <section class="phero">
    <div class="wrap phero-in">
      ${L.crumbs(trail)}
      <p class="eyebrow">What we do</p>
      <h1 class="h1">Everything your product needs, <span class="accent">under one roof</span></h1>
      <p class="hero-sub">Fourteen service lines, one accountable team. Start with a landing page or a full platform — the same engineers stay with you through architecture, launch and the years after it.</p>
      <div class="hero-cta"><a class="btn" href="/contact/">Start a project ${ARROW}</a><a class="btn btn-ghost" href="/pricing/">Pricing &amp; engagement</a></div>
    </div>
  </section>
  <section class="sec-tight">
    <div class="wrap">
      ${GROUPS.map(g => `<div class="grp">
        <div class="grp-head"><h2>${esc(g.label)}</h2><p>${esc(g.blurb)}</p></div>
        <div class="svc-grid">
          ${services.filter(s => s.group === g.key).map(L.serviceCard).join('\n          ')}
        </div>
      </div>`).join('\n      ')}
    </div>
  </section>
  ${L.ctaBlock()}`;
  write(path, render({
    path, title, description, active: path, body,
    graph: [...base(), L.webPageNode({ path, title, description, type: 'CollectionPage' }), L.breadcrumbNode(path, trail),
      { '@type': 'ItemList', '@id': L.abs(path + '#list'), itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: L.abs(`/services/${s.slug}/`) })) }],
  }));
}

// ------------------------------------------------------------------ about
{
  const path = '/about/';
  const title = 'About Rythmn AI — Software & AI Engineering Company in Jaipur';
  const description = 'Rythmn AI Digital Private Limited is a Jaipur-based software, AI and cloud engineering company. Why we exist, how we work, and the team behind it.';
  const trail = [HOME, { label: 'About', href: path }];
  const facts = [
    ['Company', site.legalName],
    site.address.locality && ['Based in', `${site.address.locality}, ${site.address.region}, ${site.address.countryName}`],
    site.founded && ['Founded', site.founded],
    site.cin && ['CIN', site.cin],
    site.gstin && ['GSTIN', site.gstin],
    ['Serving', 'India & worldwide'],
    ['Service lines', '14'],
  ].filter(Boolean);
  const values = [
    { t: 'One accountable team', d: 'Design, engineering, AI, cloud and support under one roof — no hand-offs between agencies, no finger-pointing.' },
    { t: 'Working software, weekly', d: 'You review real software on a staging link every week, not slides about progress.' },
    { t: 'You own everything', d: 'Code, cloud accounts, data and documentation are yours from day one.' },
    { t: 'Boring where it counts', d: 'Mainstream, well-supported technology your next engineer will already know. No lock-in you didn’t agree to.' },
  ];
  const body = `
  <section class="phero">
    <div class="wrap phero-in">
      ${L.crumbs(trail)}
      <p class="eyebrow">About us</p>
      <h1 class="h1">Every business deserves <span class="accent">its own website, its own product, its own AI</span>.</h1>
      <p class="hero-sub">${esc(site.legalName)} is a software, AI and cloud engineering company based in ${esc(site.address.locality)}. We design, build and run the websites, products, platforms and AI systems modern businesses depend on.</p>
    </div>
  </section>

  <section class="sec-tight">
    <div class="wrap split">
      <div class="copy">
        <p>That is the whole idea behind Rythmn AI. The corner store, the clinic, the studio, the factory, the scale-up — each one should have a digital home it actually owns, a product that carries its business online, and AI working quietly inside it. Not a rented page on someone else’s platform. Not a template with their logo dropped in.</p>
        <p>So we build the same way for a first-time owner as we do for a funded team: real engineering, real ownership, and a path that keeps going after launch. Most clients start with a website or app, then add marketing, commerce and analytics as they grow — with the same team and the same stack, so nothing has to be rebuilt.</p>
        <p>We also build and run our own products: <a href="/work/#marketing-os">Marketing OS</a>, our AI social media marketing platform, and <a href="/work/#astro">Astro</a>, our Vedic astrology app. Everything we learn shipping client platforms goes into our products, and everything we learn running our products goes back into client work.</p>
      </div>
      <aside class="aside">
        <p class="aside-h">Company facts</p>
        <ul class="facts">${facts.map(([k, v]) => `
          <li><span>${esc(k)}</span><b>${esc(v)}</b></li>`).join('')}
        </ul>
      </aside>
    </div>
  </section>

  <section class="sec-tight sec-alt" aria-labelledby="values-h">
    <div class="wrap">
      ${sectionHead('How we work', 'What you can expect from us', 'values-h')}
      <ul class="values">${values.map(v => `
        <li><h3>${esc(v.t)}</h3><p>${esc(v.d)}</p></li>`).join('')}
      </ul>
    </div>
  </section>

  ${team.length ? `<section class="sec-tight" aria-labelledby="team-h">
    <div class="wrap">
      ${sectionHead('Our team', 'The people you’ll work with', 'team-h')}
      <ul class="team">${team.map(m => `
        <li>${m.photo ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" width="400" height="400" loading="lazy">` : ''}<div><h3>${esc(m.name)}</h3><p class="role">${esc(m.role)}</p>${m.bio ? `<p>${esc(m.bio)}</p>` : ''}${m.linkedin ? `<p><a href="${esc(m.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>` : ''}</div></li>`).join('')}
      </ul>
    </div>
  </section>` : ''}

  <section class="sec-tight" aria-labelledby="proc-h">
    <div class="wrap">
      ${sectionHead('Our process', 'Four steps, then you’re live', 'proc-h', 'Every engagement runs the same four steps. <a href="/pricing/">See how engagements are priced</a>.')}
      ${bars(serviceBySlug['web-application-development'].process)}
    </div>
  </section>

  ${quotesSection(testimonials)}
  ${L.ctaBlock()}`;
  write(path, render({
    path, title, description, active: path, body,
    graph: [...base(), L.businessNode(), L.webPageNode({ path, title, description, type: 'AboutPage' }), L.breadcrumbNode(path, trail)],
  }));
}

// ------------------------------------------------------------------ work / case studies
{
  const path = '/work/';
  const title = 'Our Work — Case Studies & Products | Rythmn AI';
  const description = 'Case studies and products from Rythmn AI, including our own live products — Marketing OS for AI social media marketing and Astro for Vedic astrology — plus the in-house foundations behind every client build.';
  const trail = [HOME, { label: 'Work', href: path }];
  const caseCard = c => `<article class="case">
        <p class="eyebrow">${esc([c.client, c.industry].filter(Boolean).join(' · '))}</p>
        <h3>${esc(c.title)}</h3>
        <div class="case-grid">
          <div><h4>The challenge</h4><p>${esc(c.challenge)}</p></div>
          <div><h4>What we built</h4><p>${esc(c.solution)}</p></div>
          <div><h4>Results</h4><ul>${c.results.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>
        </div>
        ${c.stack?.length ? `<ul class="tags">${c.stack.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
        ${c.services?.length ? `<p class="aside-h" style="margin:18px 0 0">Services: ${c.services.map(sl => `<a href="/services/${sl}/">${esc(serviceBySlug[sl].short)}</a>`).join(' · ')}</p>` : ''}
        ${c.url ? `<p style="margin:18px 0 0"><a class="btn btn-ghost btn-sm" href="${c.url}" target="_blank" rel="noopener">Visit ${esc(c.url.replace(/^https?:\/\//, ''))} ${ARROW}</a></p>` : ''}
      </article>`;
  const body = `
  <section class="phero">
    <div class="wrap phero-in">
      ${L.crumbs(trail)}
      <p class="eyebrow">Our work</p>
      <h1 class="h1">We don’t just build software. <span class="accent">We run it too.</span></h1>
      <p class="hero-sub">Client platforms and our own products, built by the same team. Everything we learn running our products goes back into your build.</p>
    </div>
  </section>

  ${caseStudies.length ? `<section class="sec-tight" aria-labelledby="cases-h">
    <div class="wrap">
      ${sectionHead('Case studies', 'Client projects', 'cases-h')}
      ${caseStudies.map(caseCard).join('\n      ')}
    </div>
  </section>` : ''}

  <section class="sec-tight${caseStudies.length ? ' sec-alt' : ''}" aria-labelledby="prod-h" id="marketing-os">
    <div class="wrap">
      ${sectionHead('Our products', 'Marketing OS — a week of posts, briefed and scheduled', 'prod-h')}
      ${caseCard({
        client: 'Marketing OS', industry: 'Live product · AI social media marketing',
        title: 'A week of Facebook and Instagram posts for every brand you run — written, art-directed and scheduled.',
        challenge: 'Small businesses know they should post every day, but writing captions, making pictures that don’t look alike and remembering to publish eats the week. Agencies running many brands have the same problem, multiplied.',
        solution: 'Brief it once and the AI drafts a week of posts — captions, hashtags, a call to action, art-directed photographs or designed posters with the brand’s own logo and number set onto them, and a suggested time for each. Every post waits as a draft until someone approves it; then it publishes on the minute.',
        results: ['Publishes to Facebook Pages and Instagram business accounts today', 'Website visits and calls traced back to the post that sent them', 'Up to fifteen brand profiles in one workspace, with team access per brand'],
        stack: ['Next.js', 'React', 'FastAPI', 'PostgreSQL', 'Redis', 'Cloudflare R2', 'OpenAI'],
        services: ['saas-development', 'ai-agent-development', 'api-integration-services'],
      })}
      <p style="margin-top:20px;display:flex;flex-wrap:wrap;gap:12px"><a class="btn" href="https://rythmn.in/" target="_blank" rel="noopener">Try Marketing OS free ${ARROW}</a>${L.emailLink({ cls: 'btn btn-ghost', label: 'Ask about Marketing OS', subject: 'Marketing OS' })}</p>
    </div>
  </section>

  <section class="sec-tight${caseStudies.length ? '' : ' sec-alt'}" aria-labelledby="astro-h" id="astro">
    <div class="wrap">
      ${sectionHead('Our products', 'Astro — your Vedic chart, explained in plain words', 'astro-h')}
      ${caseCard({
        client: 'Astro', industry: 'Live product · Vedic astrology & AI',
        title: 'Kundali, matching, numerology and AI answers grounded in the chart itself.',
        challenge: 'Most astrology apps either bury people in tables they can’t read or let a chatbot invent answers. Accuracy lives in the calculation; trust lives in being able to see why an answer says what it says.',
        solution: 'A calculation engine on Swiss Ephemeris with Lahiri ayanamsa computes the full chart, dashas, panchang and numerology. An AI layer then explains it in plain English or Hindi — it is handed only the computed chart facts, and every claim cites the factor it came from.',
        results: ['Kundali (D1 and D9), Guna Milan matching and a Vimshottari dasha timeline', 'Daily rashifal, Rahu Kaal and choghadiya to plan the day', 'Numerology and Name Lab, in English and हिन्दी — with or without a birth time'],
        stack: ['Python', 'FastAPI', 'Swiss Ephemeris', 'OpenAI', 'Razorpay', 'Vanilla JS'],
        services: ['ai-chatbot-development', 'rag-development', 'api-backend-development'],
      })}
      <p style="margin-top:20px"><a class="btn" href="https://astro.rythmn.in/" target="_blank" rel="noopener">Open Astro ${ARROW}</a></p>
      <div class="soon" style="margin-top:28px">
        <div class="soon-card">
          <span class="soon-tag">In development</span>
          <h4>AI agent workbench</h4>
          <p>An internal platform for building, evaluating and monitoring the AI agents we ship — retrieval quality, tool traces and cost per task in one place. It powers our <a href="/services/ai-agent-development/">AI agent</a> and <a href="/services/rag-development/">RAG</a> work.</p>
        </div>
        <div class="soon-card">
          <span class="soon-tag">White-label</span>
          <h4>Product foundations</h4>
          <p>Our SaaS starter — tenancy, auth, billing, roles, audit logs and admin — so client platforms start at month three, not month zero. See <a href="/services/saas-development/">SaaS development</a>.</p>
        </div>
      </div>
      ${caseStudies.length ? '' : `<p class="lede" style="margin-top:28px">Client case studies are published only with the client’s permission. On a call, we’re happy to walk you through relevant past work and put you in touch with references.</p>`}
    </div>
  </section>

  ${quotesSection(testimonials)}
  ${L.ctaBlock()}`;
  write(path, render({
    path, title, description, active: path, body,
    graph: [...base(), L.webPageNode({ path, title, description, type: 'CollectionPage' }), L.breadcrumbNode(path, trail), marketingOsNode(), astroNode()],
  }));
}

function marketingOsNode() {
  return {
    '@type': 'SoftwareApplication',
    '@id': L.abs('/#marketing-os'),
    name: 'Marketing OS',
    url: L.abs('/work/#marketing-os'),
    sameAs: 'https://rythmn.in/',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Social media marketing',
    operatingSystem: 'Web browser',
    publisher: { '@id': L.abs('/#organization') },
    description: 'Marketing OS is an AI marketing operating system for small businesses: brief it once and get a week of Facebook and Instagram posts — captions, art-directed images and a suggested time for each — that publish only after you approve them.',
    featureList: ['Weekly AI content plans', 'Art-directed images and designed posters', 'Brand logo and contact details on every image', 'Instagram carousels', 'Approval calendar and scheduled publishing', 'Website visit tracking by post'],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR', description: 'Free to sign up, with starter credits' },
  };
}

function astroNode() {
  return {
    '@type': 'SoftwareApplication',
    '@id': L.abs('/#astro'),
    name: 'Astro',
    url: L.abs('/work/#astro'),
    sameAs: 'https://astro.rythmn.in/',
    applicationCategory: 'LifestyleApplication',
    applicationSubCategory: 'Vedic astrology',
    operatingSystem: 'Web browser',
    inLanguage: ['en', 'hi'],
    publisher: { '@id': L.abs('/#organization') },
    description: 'Astro calculates a full Vedic kundali, numerology and name analysis from birth details, then answers questions in plain language with every claim linked to the chart factor behind it.',
    featureList: ['Kundali (D1 and D9)', 'Ask My Chart AI answers with citations', 'Guna Milan matching', 'Vimshottari dasha timeline', 'Daily rashifal and day planning', 'Numerology and Name Lab'],
  };
}

// ------------------------------------------------------------------ pricing
{
  const path = '/pricing/';
  const title = 'Pricing & Engagement Models — Rythmn AI';
  const description = 'How Rythmn AI prices software, website and AI projects: fixed-price project builds, dedicated monthly pods and support retainers — with a free scoping call and written quote.';
  const trail = [HOME, { label: 'Pricing', href: path }];
  const drivers = [
    { t: 'Scope', d: 'The number of screens, workflows, user roles and edge cases — by far the biggest factor.' },
    { t: 'Integrations', d: 'Each connected system (payments, CRM, ERP, messaging) adds build and testing time.' },
    { t: 'Design', d: 'A custom design system costs more than a well-applied component library; both can look great.' },
    { t: 'AI & data', d: 'Assistants and agents add evaluation work and per-use running costs, which we estimate up front.' },
  ];
  const faqs = [
    { q: 'Is the first call free?', a: 'Yes. The scoping call and the written estimate that follows are free, whether or not you go ahead with us.' },
    { q: 'Why don’t you list fixed prices for everything?', a: 'Because two projects with the same name can differ in effort by ten times. A written quote based on your actual scope is fairer than a package price padded to cover every case.' },
    { q: 'Can we start small?', a: 'Yes. Many clients start with a discovery sprint, a prototype or a focused first version, then move to a dedicated pod once the product is live.' },
    { q: 'What if the scope changes during the project?', a: 'Changes are estimated and agreed in writing before any extra work starts, so there are no surprises on the invoice.' },
    { q: 'Who owns the code and accounts?', a: 'You do — the code, cloud accounts, data and documentation are yours from day one.' },
    { q: 'Do you work with startups and small businesses?', a: 'Yes. We build the same way for a first-time business owner as for a funded team, and scope the first version to fit the budget.' },
  ];
  const body = `
  <section class="phero">
    <div class="wrap phero-in">
      ${L.crumbs(trail)}
      <p class="eyebrow">Pricing &amp; engagement</p>
      <h1 class="h1">Clear pricing, <span class="accent">agreed in writing</span> before work starts</h1>
      <p class="hero-sub">Three ways to work with us. Every engagement starts with a free call and a written scope and estimate — you know what you’re paying for before anyone writes code.</p>
    </div>
  </section>

  <section class="sec-tight" aria-labelledby="models-h">
    <div class="wrap">
      ${sectionHead('Engagement models', 'Three ways to start', 'models-h', 'Most clients start with one and move to another as the product settles.')}
      <div class="eng">${engagements.map(e => `
        <div class="eng-card${e.highlight ? ' hi' : ''}">
          <p class="eng-tag">${esc(e.tag)}</p>
          <h3>${esc(e.name)}</h3>
          ${e.from ? `<p class="price">From ${esc(e.from)}</p><p class="price-note">${esc(e.fallback)}</p>` : `<p class="price-alt">${esc(e.fallback)}</p>`}
          <p>${esc(e.desc)}</p>
          <ul>${e.items.map(i => `<li>${icon('i-check')}${esc(i)}</li>`).join('')}</ul>
          <a class="btn${e.highlight ? '' : ' btn-ghost'}" href="/contact/">${esc(e.cta)}</a>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="sec-tight sec-alt" aria-labelledby="drivers-h">
    <div class="wrap">
      ${sectionHead('What affects the price', 'Where the budget actually goes', 'drivers-h', 'For a deeper breakdown with indicative ranges, read <a href="/blog/cost-of-building-a-saas/">how much it costs to build a SaaS product</a>.')}
      <ul class="values">${drivers.map(v => `
        <li><h3>${esc(v.t)}</h3><p>${esc(v.d)}</p></li>`).join('')}
      </ul>
    </div>
  </section>

  ${faqSection(faqs, 'Pricing questions')}
  ${L.ctaBlock({ title: 'Get a <span>written quote</span>.', text: 'Tell us what you’re building. After a free 30-minute call we’ll send a written scope, timeline and price.' })}`;
  write(path, render({
    path, title, description, active: path, body,
    graph: [...base(), L.webPageNode({ path, title, description }), L.breadcrumbNode(path, trail), L.faqNode(path, faqs)],
  }));
}

// ------------------------------------------------------------------ contact
{
  const path = '/contact/';
  const title = `Contact Rythmn AI — Software & AI Company in ${site.address.locality}`;
  const description = `Get in touch with Rythmn AI in ${site.address.locality}, ${site.address.region}. Book a free 30-minute call about your website, app, SaaS or AI project.`;
  const trail = [HOME, { label: 'Contact', href: path }];
  const [user, domain] = site.email.split('@');
  const info = [
    { ic: 'i-mail', k: 'Email', v: L.emailLink() },
    site.phone && { ic: 'i-phone', k: 'Phone', v: `<a href="${L.telHref(site.phone)}">${esc(site.phone)}</a>` },
    site.whatsapp && { ic: 'i-wa', k: 'WhatsApp', v: `<a href="${L.waHref()}" target="_blank" rel="noopener noreferrer">Chat with us</a>` },
    site.address.locality && { ic: 'i-pin', k: site.address.street ? 'Office' : 'Based in', v: `<span>${L.addressText({ multiline: true })}</span>${site.mapsUrl ? `<br><a href="${esc(site.mapsUrl)}" target="_blank" rel="noopener noreferrer">Get directions →</a>` : ''}` },
    site.hours && { ic: 'i-clock', k: 'Hours', v: `<span>${esc(site.hours)}</span>` },
  ].filter(Boolean);
  const budgets = ['Under ₹2 lakh', '₹2–5 lakh', '₹5–15 lakh', '₹15–50 lakh', '₹50 lakh+', 'Not sure yet'];
  const body = `
  <section class="phero">
    <div class="wrap phero-in">
      ${L.crumbs(trail)}
      <p class="eyebrow">Contact</p>
      <h1 class="h1">Tell us what you’re <span class="accent">building</span>.</h1>
      <p class="hero-sub">Thirty minutes, no deck. Describe the problem and we’ll come back with how we’d approach it, what it takes and roughly when it ships — whether or not you hire us.</p>
    </div>
  </section>

  <section class="sec-tight">
    <div class="wrap contact-grid">
      ${L.emailOff(`<form class="form" id="contactForm" data-user="${esc(user)}" data-domain="${esc(domain)}"${site.formEndpoint ? ` data-endpoint="${esc(site.formEndpoint)}"` : ''} novalidate>
        <div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" autocomplete="name" required></div>
        <div class="field"><label for="f-email">Work email</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
        <div class="field"><label for="f-phone">Phone <small>(optional)</small></label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div>
        <div class="field"><label for="f-company">Company <small>(optional)</small></label><input id="f-company" name="company" autocomplete="organization"></div>
        <div class="field"><label for="f-service">What do you need?</label>
          <select id="f-service" name="service">
            <option value="">Not sure yet</option>
            ${services.map(s => `<option value="${s.slug}">${esc(s.name)}</option>`).join('\n            ')}
          </select>
        </div>
        <div class="field"><label for="f-budget">Budget <small>(optional)</small></label>
          <select id="f-budget" name="budget">
            <option value="">Prefer not to say</option>
            ${budgets.map(b => `<option>${esc(b)}</option>`).join('\n            ')}
          </select>
        </div>
        <div class="field full"><label for="f-msg">Tell us about the project</label><textarea id="f-msg" name="message" required placeholder="What are you building, who is it for, and when do you need it?"></textarea></div>
        <div class="hp" aria-hidden="true"><label for="f-hp">Leave this empty</label><input id="f-hp" name="company_website" tabindex="-1" autocomplete="off"></div>
        <button class="btn full" type="submit">Send enquiry ${ARROW}</button>
        <p class="form-status full" id="formStatus" role="status" aria-live="polite"></p>
      </form>`)}
      <div style="display:grid;gap:18px">
        <aside class="aside">
          <p class="aside-h">Reach us directly</p>
          <ul class="cinfo">${info.map(i => `
            <li><span class="ci">${icon(i.ic)}</span><div><b>${i.k}</b>${i.v}</div></li>`).join('')}
          </ul>
          ${L.socials().length ? `<ul class="social">${L.socials().map(s => `<li><a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="Rythmn AI on ${s.label}">${icon(s.icon)}</a></li>`).join('')}</ul>` : ''}
        </aside>
        <aside class="aside">
          <p class="aside-h">What happens next</p>
          <ol class="steps3">
            <li><span><b>We reply</b> to set up a 30-minute call at a time that suits you.</span></li>
            <li><span><b>We listen</b> — goals, users, systems, constraints and timeline.</span></li>
            <li><span><b>You get a written plan</b> with scope, timeline and a fixed quote. No obligation.</span></li>
          </ol>
        </aside>
      </div>
    </div>
  </section>`;
  const scripts = `<script>
(function(){
  var f = document.getElementById('contactForm'), status = document.getElementById('formStatus');
  var pre = new URLSearchParams(location.search).get('service');
  if (pre) Array.prototype.forEach.call(f.service.options, function(o){ if (o.value === pre) f.service.value = pre; });
  f.addEventListener('submit', function(e){
    e.preventDefault();
    if (!f.checkValidity()) { f.reportValidity(); return; }
    var d = new FormData(f);
    if (d.get('company_website')) return;
    var to = f.getAttribute('data-user') + '@' + f.getAttribute('data-domain');
    var ep = f.getAttribute('data-endpoint');
    if (ep) {
      status.textContent = 'Sending…';
      fetch(ep, { method: 'POST', body: d, headers: { Accept: 'application/json' } })
        .then(function(r){ if (!r.ok) throw new Error(r.status); f.reset(); status.textContent = 'Thanks — your message is on its way. We’ll be in touch shortly.'; })
        .catch(function(){ status.textContent = 'That didn’t send. Please email us at ' + to + '.'; });
      return;
    }
    var svc = f.service.options[f.service.selectedIndex].text;
    var lines = ['Name: ' + d.get('name'), 'Email: ' + d.get('email'), 'Phone: ' + (d.get('phone') || '-'), 'Company: ' + (d.get('company') || '-'), 'Service: ' + svc, 'Budget: ' + (d.get('budget') || '-'), '', d.get('message')];
    location.href = 'mailto:' + to + '?subject=' + encodeURIComponent('Project enquiry from ' + d.get('name')) + '&body=' + encodeURIComponent(lines.join('\\n'));
    status.textContent = 'Opening your email app… If nothing happens, email us at ' + to + '.';
  });
})();
</script>`;
  write(path, render({
    path, title, description, active: path, body, scripts,
    graph: [...base(), L.businessNode(), L.webPageNode({ path, title, description, type: 'ContactPage' }), L.breadcrumbNode(path, trail)],
  }));
}

// ------------------------------------------------------------------ blog
{
  const path = '/blog/';
  const title = 'Blog — AI, SaaS & Software Engineering Guides | Rythmn AI';
  const description = 'Practical guides on AI, RAG, AI agents, SaaS development and software engineering from the Rythmn AI team.';
  const trail = [HOME, { label: 'Blog', href: path }];
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const body = `
  <section class="phero">
    <div class="wrap phero-in">
      ${L.crumbs(trail)}
      <p class="eyebrow">Blog</p>
      <h1 class="h1">Guides from the <span class="accent">engineering floor</span></h1>
      <p class="hero-sub">Plain-English explanations of the technology we build with every day — AI, SaaS, cloud and the costs behind them.</p>
    </div>
  </section>
  <section class="sec-tight">
    <div class="wrap">
      <div class="post-grid">
        ${sorted.map(L.postCard).join('\n        ')}
      </div>
    </div>
  </section>
  ${L.ctaBlock()}`;
  write(path, render({
    path, title, description, active: path, body,
    graph: [...base(), L.webPageNode({ path, title, description, type: 'CollectionPage' }), L.breadcrumbNode(path, trail),
      { '@type': 'Blog', '@id': L.abs(path + '#blog'), url: L.abs(path), name: 'Rythmn AI Blog', publisher: { '@id': L.abs('/#organization') },
        blogPost: sorted.map(p => ({ '@id': L.abs(`/blog/${p.slug}/#article`) })) }],
  }));
}

const fmtDate = d => new Date(d + 'T00:00:00Z').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

for (const p of posts) {
  const path = `/blog/${p.slug}/`;
  const title = `${p.title} | Rythmn AI`;
  const trail = [HOME, { label: 'Blog', href: '/blog/' }, { label: p.title, href: path }];
  const toc = [...p.body.matchAll(/<h2 id="([^"]+)">(.*?)<\/h2>/g)].map(m => ({ id: m[1], label: m[2] }));
  const others = posts.filter(o => o.slug !== p.slug);
  const body = `
  <section class="phero">
    <div class="wrap phero-in">
      ${L.crumbs(trail)}
      <p class="art-meta"><time datetime="${p.date}">${fmtDate(p.date)}</time> · ${p.readMins} min read · ${esc(p.tags.join(' · '))}</p>
      <h1 class="h1" style="margin-top:14px">${esc(p.title)}</h1>
    </div>
  </section>
  <section class="sec-tight">
    <div class="wrap article">
      <article class="prose">
        ${p.body.trim()}
        <aside class="post-foot">
          <h2>Need this built?</h2>
          <p>We design, build and run exactly this kind of system for businesses in India and abroad.</p>
          <div class="links">
            ${p.services.map((sl, i) => `<a class="btn${i ? ' btn-ghost' : ''}" href="/services/${sl}/">${esc(serviceBySlug[sl].name)}</a>`).join('\n            ')}
          </div>
        </aside>
      </article>
      <nav class="toc" aria-label="On this page">
        <p>On this page</p>
        <ol>${toc.map(t => `<li><a href="#${t.id}">${t.label}</a></li>`).join('')}</ol>
      </nav>
    </div>
  </section>
  <section class="sec-tight sec-alt" aria-labelledby="more-h">
    <div class="wrap">
      ${sectionHead('Keep reading', 'More from the blog', 'more-h')}
      <div class="post-grid">
        ${others.map(L.postCard).join('\n        ')}
      </div>
    </div>
  </section>
  ${L.ctaBlock()}`;
  write(path, render({
    path, title, description: p.description, active: '/blog/', body, ogType: 'article',
    graph: [
      ...base(),
      L.webPageNode({ path, title, description: p.description }),
      {
        '@type': 'BlogPosting',
        '@id': L.abs(path + '#article'),
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        dateModified: p.updated || p.date,
        inLanguage: 'en',
        image: L.abs('/og-image.jpg'),
        mainEntityOfPage: { '@id': L.abs(path + '#webpage') },
        author: { '@id': L.abs('/#organization') },
        publisher: { '@id': L.abs('/#organization') },
        keywords: p.tags.join(', '),
      },
      L.breadcrumbNode(path, trail),
    ],
  }));
}

// ------------------------------------------------------------------ 404
write('/404.html', render({
  path: '/404.html', title: 'Page not found — Rythmn AI', description: 'This page doesn’t exist.', robots: 'noindex, follow',
  body: `
  <section class="notfound">
    <div class="wrap">
      <p class="eyebrow" style="justify-content:center">404</p>
      <h1 class="h1">This page skipped a beat.</h1>
      <p class="hero-sub" style="margin-inline:auto">The page you’re looking for has moved or never existed.</p>
      <div class="hero-cta"><a class="btn" href="/">Back to home</a><a class="btn btn-ghost" href="/services/">Browse services</a></div>
    </div>
  </section>`,
}), { sitemap: false });

// ------------------------------------------------------------------ home regions
home = inject(home, 'header', L.header());
home = inject(home, 'footer', L.footer());
home = inject(home, 'jsonld', L.jsonld([
  L.orgNode(),
  L.businessNode(),
  marketingOsNode(),
  astroNode(),
  L.websiteNode(),
  L.webPageNode({ path: '/', title: 'Software, AI & Cloud Engineering Company in Jaipur — Rythmn AI', description: 'Rythmn AI Digital Private Limited designs, builds and runs software: websites, web apps, SaaS, e-commerce, mobile, AI agents, cloud and DevOps.' }),
]));
home = inject(home, 'proof', `  ${quotesSection(testimonials)}
  ${caseStudies.length ? `<section class="sec" id="work" aria-labelledby="work-h" style="padding-top:0">
    <div class="wrap">
      <div class="sec-head rv">
        <p class="eyebrow">Client work</p>
        <h2 class="h2" id="work-h">Built for real businesses, <span class="accent">running in production</span></h2>
        <p class="lede">A few of the teams we design, build and run software for.</p>
      </div>
      <div class="work-grid">${caseStudies.slice(0, 2).map((c, i) => `
        <article class="work-card rv" style="--c:${['#0B6FE8', '#12B76A', '#F58B00'][i % 3]};--d:${i * 0.12}s">
          <p class="work-ind">${esc(c.industry)}</p>
          <h3>${esc(c.client)}</h3>
          <p>${esc(c.title)}</p>
          <ul class="work-res">${c.results.slice(0, 2).map(r => `<li>${icon('i-check')}<span>${esc(r)}</span></li>`).join('')}</ul>
          <div class="work-foot">
            <a class="btn btn-ghost btn-sm" href="/work/">Read the case study</a>
            ${c.url ? `<a class="work-url" href="${c.url}" target="_blank" rel="noopener">${esc(c.url.replace(/^https?:\/\//, ''))} ↗</a>` : ''}
          </div>
        </article>`).join('')}
      </div>
    </div>
  </section>` : ''}
  <section class="sec" aria-labelledby="blog-h" style="padding-top:0">
    <div class="wrap">
      <div class="sec-head">
        <p class="eyebrow">From the blog</p>
        <h2 class="h2" id="blog-h">Guides from the <span class="accent">engineering floor</span></h2>
      </div>
      <div class="post-grid">
        ${[...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3).map(L.postCard).join('\n        ')}
      </div>
    </div>
  </section>`);
writeFileSync(join(ROOT, 'index.html'), home);

// ------------------------------------------------------------------ sitemap
writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${L.abs(u.path)}</loc>
    <lastmod>${TODAY}</lastmod>
  </url>`).join('\n')}
</urlset>
`);

// ------------------------------------------------------------------ report
const todo = [
  !site.phone && 'site.phone',
  !site.address.street && 'site.address.street',
  !site.address.postalCode && 'site.address.postalCode',
  !site.mapsUrl && 'site.mapsUrl (Google Business Profile link)',
  !site.hours && 'site.hours',
  !site.cin && 'site.cin',
  !site.social.linkedin && 'site.social.linkedin',
  !site.formEndpoint && 'site.formEndpoint (form falls back to mailto)',
  !team.length && 'team',
  !testimonials.length && 'testimonials',
  !caseStudies.length && 'caseStudies',
  engagements.every(e => !e.from) && 'engagements[].from (starting prices)',
].filter(Boolean);
console.log(`Built ${urls.length} URLs (+404) → sitemap.xml`);
if (todo.length) console.log(`Not yet filled in (hidden on the site until set) in src/config.mjs:\n  - ${todo.join('\n  - ')}`);
