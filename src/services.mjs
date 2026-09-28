// One entry per service page at /services/<slug>/. Each page targets its own keyword
// through `title`, `h1` and `description`; keep those unique across entries.

export const GROUPS = [
  {
    key: "ai",
    label: "AI & generative AI",
    blurb:
      "Assistants, retrieval and agents built into the systems your team already uses.",
  },
  {
    key: "build",
    label: "Build",
    blurb:
      "Websites, web apps, SaaS, commerce and mobile — designed and engineered in-house.",
  },
  {
    key: "platform",
    label: "Platform",
    blurb:
      "The APIs, integrations, cloud and data layers everything else stands on.",
  },
  {
    key: "run",
    label: "Automate, run & advise",
    blurb: "Automation, long-term support and senior technical advice.",
  },
];

const DEFAULT_PROCESS = [
  {
    t: "Discover",
    d: "We map the goal, the users, the systems and the constraints, then agree on what “done” means before anyone opens a file.",
  },
  {
    t: "Design",
    d: "Flows, screens and architecture. You approve a clickable prototype and a written technical plan.",
  },
  {
    t: "Build",
    d: "Weekly cuts on a live staging URL, behind CI and tests. You review real software every week and steer the next one.",
  },
  {
    t: "Run & grow",
    d: "Launch, monitoring and an SLA — then we keep iterating on whatever the numbers and your users say next.",
  },
];

export const services = [
  // ---------------------------------------------------------------- AI
  {
    slug: "ai-chatbot-development",
    group: "ai",
    name: "AI Chatbot Development",
    short: "AI chatbots & assistants",
    title: "AI Chatbot Development Company in India — Rythmn AI",
    h1: "AI chatbot development that answers from your own data",
    description:
      "Custom AI chatbots and assistants for support, sales and internal teams — grounded in your documents, connected to your CRM and helpdesk, with human handoff built in.",
    kicker: "AI · Chatbots & assistants",
    icon: "i-bot",
    color: "#0B6FE8",
    intro: [
      "Most chatbots fail the same way: they answer confidently from nowhere, can’t see the customer’s order, and trap people in a loop when they need a human. We build assistants that do the opposite — they answer from your own documents and data, show where the answer came from, and hand off cleanly when they’re unsure.",
      "Whether it lives on your website, in WhatsApp, inside your helpdesk or in Slack, the assistant is wired into the systems that hold the real answers — knowledge base, product catalogue, CRM and order data — and tested against real customer questions before it goes anywhere near a customer.",
    ],
    deliverables: [
      {
        t: "Customer support assistant",
        d: "Answers FAQs, order and account questions from your help centre and live data, and escalates to an agent with the full conversation attached.",
      },
      {
        t: "Sales & lead-qualification bot",
        d: "Engages website visitors, answers product questions, qualifies leads and books meetings straight into your calendar or CRM.",
      },
      {
        t: "Internal knowledge copilot",
        d: "Lets your team ask questions across policies, SOPs, wikis and past tickets — in Slack, Teams or a web app.",
      },
      {
        t: "WhatsApp & multichannel",
        d: "One assistant deployed to website chat, WhatsApp Business, Instagram and email, sharing the same knowledge and rules.",
      },
      {
        t: "Evaluation & guardrails",
        d: "A test set of real questions, automated scoring, prompt-injection defences and topic limits — all before launch.",
      },
      {
        t: "Analytics & improvement loop",
        d: "Resolution rate, handoff reasons and unanswered questions on a dashboard, feeding the next content fix.",
      },
    ],
    fit: [
      "Your support team answers the same questions every day",
      "Customers need answers outside office hours, in English or Hindi",
      "Staff lose time hunting through SOPs, wikis and shared drives",
      "You tried a no-code chatbot and it made things up",
    ],
    process: [
      {
        t: "Question audit",
        d: "We pull real tickets, chats and emails to see what people actually ask, and where the answers live.",
      },
      {
        t: "Knowledge & integrations",
        d: "Connect the sources — docs, CRM, orders — and build the retrieval layer the assistant answers from.",
      },
      {
        t: "Build & evaluate",
        d: "Prompts, tools and handoff logic, scored against a test set of real questions until accuracy is where it needs to be.",
      },
      {
        t: "Launch & tune",
        d: "Soft launch to a slice of traffic, review transcripts weekly, and close the gaps in content and behaviour.",
      },
    ],
    tech: [
      "Anthropic Claude",
      "OpenAI",
      "RAG",
      "pgvector",
      "WhatsApp Business API",
      "Zendesk / Freshdesk",
      "Evals",
    ],
    faqs: [
      {
        q: "How much does an AI chatbot cost?",
        a: "It depends on the number of knowledge sources, channels and integrations. A focused support assistant over a help centre is a small fixed-scope project; an assistant that reads live order data, writes to your CRM and runs on several channels is larger. We give a fixed written quote after a free scoping call.",
      },
      {
        q: "Will the chatbot make things up?",
        a: "We ground every answer in retrieved content, show sources, and instruct the model to say when it doesn’t know — then test that behaviour against real questions before launch. No model is perfect, so the handoff to a person is designed in from the start.",
      },
      {
        q: "Can it talk to customers in Hindi and other Indian languages?",
        a: "Yes. Current models handle Hindi, Hinglish and most major Indian languages well, and we test in the languages your customers actually use.",
      },
      {
        q: "Which AI model do you use?",
        a: "Whichever fits the job on quality, speed, cost and data requirements — typically Anthropic Claude or OpenAI models. We keep the architecture model-agnostic so you can switch later.",
      },
      {
        q: "Is our data safe?",
        a: "Your data stays in your own cloud or with model providers under business terms that exclude training on it, and access controls ensure the assistant only sees what each user is allowed to see.",
      },
    ],
    related: ["rag-development", "ai-agent-development", "workflow-automation"],
    post: "what-is-rag",
  },
  {
    slug: "rag-development",
    group: "ai",
    name: "RAG Development",
    short: "RAG systems",
    title:
      "RAG Development Services — Retrieval-Augmented Generation | Rythmn AI",
    h1: "RAG development: AI answers grounded in your knowledge",
    description:
      "Retrieval-augmented generation (RAG) systems built for accuracy — ingestion, chunking, embeddings, hybrid search, reranking and citations over your documents and data.",
    kicker: "AI · Retrieval-augmented generation",
    icon: "i-search",
    color: "#032A82",
    intro: [
      "A language model only knows what it was trained on. Retrieval-augmented generation (RAG) fixes that by fetching the relevant passages from your own documents and data at question time and handing them to the model as the source of truth. Done well, you get answers that are current, specific to your business and traceable back to a source.",
      "Done badly — naive chunking, vector search alone, no evaluation — you get confident answers built on the wrong paragraph. Our RAG builds treat retrieval as the product: we measure it, tune it and monitor it the way you would a search engine.",
    ],
    deliverables: [
      {
        t: "Ingestion pipelines",
        d: "Connectors for PDFs, Word, Confluence, Notion, Google Drive, websites, databases and ticketing systems, with scheduled re-sync.",
      },
      {
        t: "Chunking & enrichment",
        d: "Structure-aware chunking, metadata, table parsing and OCR, so the right context survives the split.",
      },
      {
        t: "Hybrid retrieval",
        d: "Vector and keyword search combined, with reranking and filters for permissions, product, region or date.",
      },
      {
        t: "Grounded answers with citations",
        d: "Every answer links back to its source passage, so users — and auditors — can check it.",
      },
      {
        t: "Retrieval evaluation",
        d: "Test sets that score recall, precision and answer faithfulness, run automatically on every change.",
      },
      {
        t: "Access control",
        d: "Document-level permissions, so each user only retrieves what they’re allowed to read.",
      },
    ],
    fit: [
      "You have thousands of pages of documentation nobody can search",
      "Answers must cite a policy, contract clause or manual page",
      "Your content changes weekly and a fine-tuned model would go stale",
      "Different users are allowed to see different documents",
    ],
    process: [
      {
        t: "Source audit",
        d: "Inventory the content, formats, update frequency and permissions, and collect real questions for the test set.",
      },
      {
        t: "Pipeline build",
        d: "Ingestion, chunking, embeddings and index — with metadata and permission filters from day one.",
      },
      {
        t: "Retrieval tuning",
        d: "Hybrid search, reranking and prompt design, measured against the test set until recall and faithfulness hold up.",
      },
      {
        t: "Production & monitoring",
        d: "Deploy with logging, feedback capture, cost tracking and scheduled re-indexing.",
      },
    ],
    tech: [
      "pgvector",
      "Pinecone",
      "OpenSearch",
      "LlamaIndex",
      "LangChain",
      "Rerankers",
      "Anthropic",
      "OpenAI",
    ],
    faqs: [
      {
        q: "RAG or fine-tuning — which do we need?",
        a: "For answering from your own, changing knowledge, RAG is almost always the right start: it is cheaper, stays current when documents change, and can cite its sources. Fine-tuning helps with tone or narrow output formats, and the two can be combined.",
      },
      {
        q: "Which vector database do you use?",
        a: "Often PostgreSQL with pgvector, so vectors live next to your existing data. For very large or high-traffic indexes we use a dedicated store such as Pinecone or OpenSearch.",
      },
      {
        q: "How do you measure accuracy?",
        a: "We build a test set of real questions with known answers and automatically score retrieval recall, answer correctness and faithfulness to the sources on every change.",
      },
      {
        q: "Can RAG work over scanned documents and tables?",
        a: "Yes, with OCR and table-aware parsing in the ingestion step. It is often where most of the accuracy is won or lost.",
      },
    ],
    related: [
      "ai-chatbot-development",
      "ai-agent-development",
      "database-optimization",
    ],
    post: "what-is-rag",
  },
  {
    slug: "ai-agent-development",
    group: "ai",
    name: "AI Agent Development",
    short: "AI agents",
    title: "AI Agent Development Company in India — Rythmn AI",
    h1: "AI agents that take real actions in your systems",
    description:
      "Custom AI agents that call your APIs, update records and complete multi-step tasks — with scoped tool permissions, human approval and a full audit trail.",
    kicker: "AI · Agents",
    icon: "i-spark",
    color: "#F58B00",
    intro: [
      "A chatbot answers questions. An agent gets things done: it reads the request, decides which steps are needed, calls your tools and APIs, checks the result, and either finishes the job or hands it to a person. That is the difference between an assistant that explains your refund policy and one that actually processes the refund.",
      "We build agents for narrow, valuable jobs first — with explicit tool permissions, approval steps for anything risky and a trace of every decision — then widen their scope as they prove themselves.",
    ],
    deliverables: [
      {
        t: "Tool & API integration",
        d: "Agents wired to your CRM, ERP, databases, email and internal APIs through scoped, logged tools.",
      },
      {
        t: "Multi-step workflows",
        d: "Plan, act and verify loops for triage, data entry, reconciliation, research and reporting.",
      },
      {
        t: "Human-in-the-loop controls",
        d: "Approval gates, confidence thresholds and a clean handoff to a person with full context.",
      },
      {
        t: "Guardrails & permissions",
        d: "Least-privilege tool access, spend and rate limits, and defences against prompt injection.",
      },
      {
        t: "Tracing & evaluation",
        d: "Every step recorded and replayable; task success, cost and latency measured over time.",
      },
      {
        t: "Agent operations",
        d: "Monitoring, alerting and cost dashboards so agents stay reliable long after launch.",
      },
    ],
    fit: [
      "A team spends hours a day on repetitive, rules-plus-judgement work",
      "Tasks span several systems that don’t talk to each other",
      "Inputs are messy — emails, PDFs, free text — so fixed rules keep breaking",
      "Every automated action needs an audit trail",
    ],
    process: [
      {
        t: "Task selection",
        d: "Pick one task with clear value and a clear definition of done; map the steps, systems and failure modes.",
      },
      {
        t: "Tools & sandbox",
        d: "Build the tools the agent may use, with permissions, and a sandbox to run it safely on realistic data.",
      },
      {
        t: "Evaluate & harden",
        d: "Run the agent on historical cases, measure success and cost, and add guardrails where it slips.",
      },
      {
        t: "Supervised rollout",
        d: "Start with human approval on every action, then relax it step by step as the numbers justify.",
      },
    ],
    tech: [
      "Anthropic Claude",
      "OpenAI",
      "Tool use",
      "MCP",
      "LangGraph",
      "Temporal",
      "OpenTelemetry",
    ],
    faqs: [
      {
        q: "What is the difference between an AI agent and ordinary automation?",
        a: "Traditional automation follows fixed rules and breaks on anything unexpected. An agent uses a language model to interpret messy inputs and decide the next step — while still acting only through the tools you allow.",
      },
      {
        q: "Is it safe to let an AI agent act on production systems?",
        a: "Only with the right controls. We give agents least-privilege tools, require approval for irreversible actions, log every step and start in supervised mode.",
      },
      {
        q: "What makes a good first agent?",
        a: "High-volume, well-understood work with a clear definition of done: ticket triage, invoice or order processing, lead enrichment, report preparation or data clean-up.",
      },
      {
        q: "How long does it take to build one?",
        a: "We agree a fixed scope and timeline after a free scoping call. A focused, single-task agent is the fastest route to real value, and the foundation for the next one.",
      },
    ],
    related: [
      "ai-chatbot-development",
      "workflow-automation",
      "api-integration-services",
    ],
    post: "how-to-build-an-ai-agent",
  },

  // ---------------------------------------------------------------- Build
  {
    slug: "website-development",
    group: "build",
    name: "Website Development",
    short: "Website development",
    title: "Website Development Company in Jaipur, India — Rythmn AI",
    h1: "Website development company in Jaipur, building for businesses across India",
    description:
      "Fast, SEO-ready business websites and landing pages from a Jaipur-based team — custom design, easy-to-edit CMS, Core Web Vitals and analytics included. Serving clients across India and worldwide.",
    kicker: "Build · Websites & landing pages",
    icon: "i-web",
    color: "#0B6FE8",
    local: true,
    intro: [
      "Your website is the one piece of the internet your business fully owns. We design and build sites that load fast on a mid-range phone, read clearly, rank for what your customers actually search, and turn visits into enquiries — then hand you a CMS your team can run without calling a developer for every change.",
      "We’re based in Jaipur and work with businesses across Rajasthan, the rest of India and abroad — from a first website for a clinic, showroom or studio to a multi-language marketing site for a growing SaaS company. The engineering standard is the same either way.",
    ],
    deliverables: [
      {
        t: "Business & corporate websites",
        d: "Custom-designed sites that explain what you do, build trust and generate enquiries.",
      },
      {
        t: "Landing pages",
        d: "Campaign pages built around a single goal, fast to launch and easy to A/B test.",
      },
      {
        t: "Easy-to-edit CMS",
        d: "Update pages, blog posts and case studies yourself, without touching code.",
      },
      {
        t: "Technical SEO foundation",
        d: "Clean URLs, schema markup, sitemap, meta tags and Google Search Console set up from day one.",
      },
      {
        t: "Speed & Core Web Vitals",
        d: "Optimised images, fonts and code so pages pass Google’s LCP, INP and CLS thresholds.",
      },
      {
        t: "Analytics & lead tracking",
        d: "Form, call and WhatsApp clicks tracked, so you know which pages bring in business.",
      },
    ],
    fit: [
      "You don’t have a website yet, or your current one lets you down",
      "Your site is slow, hard to edit or invisible on Google",
      "You’re running ads and need landing pages that convert",
      "You want a team in your time zone that builds to global standards",
    ],
    process: [
      {
        t: "Discover",
        d: "Goals, audience, competitors and the search terms your customers use — turned into a sitemap and content plan.",
      },
      {
        t: "Design",
        d: "Wireframes, then a clickable design in your brand, reviewed on desktop and mobile before development starts.",
      },
      {
        t: "Build",
        d: "Development, CMS setup, SEO and speed testing on a staging link you can review at any time.",
      },
      {
        t: "Launch & grow",
        d: "Go-live, Search Console and analytics, then optional monthly content, SEO and improvement work.",
      },
    ],
    tech: [
      "Next.js",
      "Astro",
      "WordPress",
      "Headless CMS",
      "Tailwind",
      "Schema.org",
      "Search Console",
      "GA4",
    ],
    faqs: [
      {
        q: "How much does website development cost in Jaipur?",
        a: "It depends on the number of pages, how custom the design is, the CMS and any integrations. A focused business website or landing page is a small fixed-price project; a large multi-language site with custom features costs more. We give a fixed written quote after a free 30-minute call.",
      },
      {
        q: "How long does it take to build a website?",
        a: "A landing page can go live within days. A typical business website takes a few weeks from kickoff to launch, depending mostly on how quickly content and feedback come through.",
      },
      {
        q: "Will my website be SEO-friendly?",
        a: "Yes. Every site ships with a clean structure, schema markup, a sitemap, fast load times and Google Search Console set up. Ongoing content and SEO work can be added after launch.",
      },
      {
        q: "Do you only work with businesses in Jaipur?",
        a: "No. We are based in Jaipur and work with clients across India and worldwide, remotely or in person where it helps.",
      },
      {
        q: "Can I update the website myself?",
        a: "Yes. We set up a CMS so you can edit text, images, blog posts and pages without a developer, and show your team how to use it.",
      },
    ],
    related: [
      "ecommerce-development",
      "web-application-development",
      "application-maintenance-support",
    ],
  },
  {
    slug: "web-application-development",
    group: "build",
    name: "Web Application Development",
    short: "Web apps & portals",
    title: "Custom Web Application Development Company in India — Rythmn AI",
    h1: "Custom web application and business portal development",
    description:
      "Custom web apps, customer portals, partner dashboards and internal tools built with React and TypeScript — replacing spreadsheets, shared inboxes and manual handoffs.",
    kicker: "Build · Web apps & portals",
    icon: "i-app",
    color: "#032A82",
    intro: [
      "Every growing business reaches the point where the spreadsheet, the shared inbox and the WhatsApp group stop scaling. That is usually where a custom web application pays for itself: one system, built around how your team actually works, with the right people seeing the right data.",
      "We build customer portals, partner and vendor dashboards, admin panels and internal tools — with proper roles and permissions, audit trails, reporting and integrations into the systems you already rely on.",
    ],
    deliverables: [
      {
        t: "Customer portals",
        d: "Self-serve accounts for orders, bookings, documents, invoices and support requests.",
      },
      {
        t: "Internal tools & admin panels",
        d: "Operations dashboards that replace spreadsheets, email chains and manual approvals.",
      },
      {
        t: "Partner & vendor portals",
        d: "Onboarding, ordering and reporting for dealers, suppliers, distributors and franchisees.",
      },
      {
        t: "Roles, SSO & audit logs",
        d: "Fine-grained permissions, single sign-on and a record of every sensitive action.",
      },
      {
        t: "Reporting & dashboards",
        d: "Live KPIs and exports that answer the questions management actually asks.",
      },
      {
        t: "Integrations",
        d: "Connected to your ERP, CRM, accounting, payment and messaging tools.",
      },
    ],
    fit: [
      "Critical processes live in spreadsheets and email threads",
      "Off-the-shelf software forces you to change how you work",
      "Customers or partners keep calling for information they could look up",
      "You need a record of who did what, and when",
    ],
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Role-based access",
      "SSO",
    ],
    faqs: [
      {
        q: "Should we build custom software or buy off-the-shelf?",
        a: "Buy when a mainstream product fits your process most of the way. Build when the process is a competitive advantage, spans several tools, or when per-seat licences would cost more than owning the software.",
      },
      {
        q: "Who owns the code?",
        a: "You do. The code, infrastructure and data are yours, handed over with documentation and access.",
      },
      {
        q: "Can you move our data over from spreadsheets or an old system?",
        a: "Yes. Data migration, clean-up and validation are part of most builds.",
      },
      {
        q: "Will it work on mobile?",
        a: "Yes. Everything we build is responsive, and it can be packaged as an installable web app or a native app later if needed.",
      },
    ],
    related: [
      "saas-development",
      "api-backend-development",
      "workflow-automation",
    ],
  },
  {
    slug: "saas-development",
    group: "build",
    name: "SaaS Development",
    short: "SaaS development",
    title: "SaaS Development Company in India — From MVP to Scale | Rythmn AI",
    h1: "SaaS product development, from MVP to scale",
    description:
      "SaaS development for founders and product teams — multi-tenant architecture, authentication, subscription billing, admin tooling and APIs. Launch an MVP fast and scale without a rewrite.",
    kicker: "Build · SaaS products",
    icon: "i-saas",
    color: "#3FA0FF",
    intro: [
      "Building a SaaS product is two jobs at once: the feature your customers pay for, and the plumbing every SaaS needs — sign-up, tenancy, roles, subscription billing, usage limits, emails, an admin panel and an audit trail. Founders who spend months on the plumbing launch late.",
      "We start client platforms on our own SaaS foundation — tenancy, auth, billing, roles, audit logs and admin already in place — so your budget goes into the product itself. The architecture is designed to take you from the first paying customer to thousands of tenants without a rewrite.",
    ],
    deliverables: [
      {
        t: "MVP development",
        d: "A focused first version built around the one workflow customers will pay for, in front of users quickly.",
      },
      {
        t: "Multi-tenant architecture",
        d: "Tenant isolation, per-tenant configuration and data separation done right from the start.",
      },
      {
        t: "Auth, teams & SSO",
        d: "Sign-up, invites, teams, roles, social login and enterprise single sign-on.",
      },
      {
        t: "Subscription billing",
        d: "Plans, trials, usage-based pricing and GST-ready invoicing via Stripe or Razorpay.",
      },
      {
        t: "Admin & support tooling",
        d: "An internal admin to manage tenants, see usage and help customers without touching the database.",
      },
      {
        t: "APIs & integrations",
        d: "Public APIs, webhooks and integrations that let customers build around your product.",
      },
    ],
    fit: [
      "You have a validated idea and need an MVP",
      "Your MVP is creaking and you need a scalable v2",
      "You want to turn an internal tool into a product",
      "You need a technical partner, not just developers",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Stripe",
      "Razorpay",
      "AWS / GCP",
    ],
    faqs: [
      {
        q: "How much does it cost to build a SaaS product?",
        a: "It mostly depends on the scope of the MVP, the number of user roles and the integrations. Our guide to the cost of building a SaaS breaks it down; for a specific number we give a fixed quote after a free scoping call.",
      },
      {
        q: "How long does a SaaS MVP take?",
        a: "A focused MVP is a matter of weeks to a few months, not a year. Starting on our SaaS foundation removes much of the setup time.",
      },
      {
        q: "Do you work with non-technical founders?",
        a: "Yes. We help shape the scope, choose the technology and act as your technical team — and you own all of the code.",
      },
      {
        q: "Can you take over an existing SaaS codebase?",
        a: "Yes. We start with a code and architecture audit, stabilise what is there and keep shipping.",
      },
    ],
    related: [
      "web-application-development",
      "cloud-infrastructure",
      "technical-consulting",
    ],
    post: "cost-of-building-a-saas",
  },
  {
    slug: "ecommerce-development",
    group: "build",
    name: "E-commerce Development",
    short: "E-commerce",
    title: "E-commerce Website Development Company in India — Rythmn AI",
    h1: "E-commerce development that sells — and runs smoothly behind the scenes",
    description:
      "Custom e-commerce websites and apps — Shopify, headless commerce, Razorpay/UPI payments, catalogue, shipping and order operations — built for conversion and day-to-day running.",
    kicker: "Build · E-commerce",
    icon: "i-cart",
    color: "#F58B00",
    intro: [
      "A good online store is two products: the storefront customers see, and the operations your team runs every day — catalogue, inventory, orders, shipping and returns. We build both, so the shop converts and the back office doesn’t drown.",
      "Depending on your size and plans, that means a well-configured Shopify store, a headless storefront on top of a commerce engine, or a custom build for B2B pricing, marketplaces and complex catalogues.",
    ],
    deliverables: [
      {
        t: "Storefront design & build",
        d: "Fast, mobile-first listings, search, product pages and cart.",
      },
      {
        t: "Checkout & payments",
        d: "UPI, cards, wallets, EMI and COD through Razorpay, Stripe or your gateway, with GST-compliant invoices.",
      },
      {
        t: "Catalogue & inventory",
        d: "Variants, bulk import, multi-warehouse stock and sync with your ERP or POS.",
      },
      {
        t: "Order operations",
        d: "Shipping integrations, tracking, returns and notifications by email, SMS and WhatsApp.",
      },
      {
        t: "Headless commerce",
        d: "Shopify or Medusa behind a custom Next.js storefront, for full control over design and speed.",
      },
      {
        t: "Growth features",
        d: "Coupons, loyalty, reviews, abandoned-cart recovery and analytics.",
      },
    ],
    fit: [
      "You sell offline and want to take the business online",
      "Your store is slow or losing people at checkout",
      "You sell B2B with custom pricing, minimum order quantities or credit terms",
      "Orders, stock and shipping are still managed by hand",
    ],
    tech: [
      "Shopify",
      "Medusa",
      "Next.js",
      "Razorpay",
      "Stripe",
      "Shiprocket",
      "WhatsApp Business API",
    ],
    faqs: [
      {
        q: "Should we use Shopify or build a custom store?",
        a: "Shopify is the fastest, lowest-risk way to start for most D2C brands. Headless or custom makes sense when you need unusual pricing, B2B workflows, marketplace features or full control over performance and design.",
      },
      {
        q: "Which payment gateways do you integrate?",
        a: "Razorpay, Stripe, PayU, Cashfree and others — covering UPI, cards, net banking, wallets, EMI and cash on delivery.",
      },
      {
        q: "Can you integrate shipping and logistics?",
        a: "Yes, through aggregators such as Shiprocket or direct courier APIs for rates, labels, tracking and returns.",
      },
      {
        q: "Can you build a mobile app for our store too?",
        a: "Yes. We build iOS and Android apps that share the same catalogue, cart and customer accounts as your website.",
      },
    ],
    related: [
      "website-development",
      "mobile-app-development",
      "api-integration-services",
    ],
  },
  {
    slug: "mobile-app-development",
    group: "build",
    name: "Mobile App Development",
    short: "Mobile apps",
    title:
      "Mobile App Development Company in India — iOS & Android | Rythmn AI",
    h1: "Mobile app development for iOS and Android",
    description:
      "Cross-platform iOS and Android apps built with React Native and Flutter — one codebase, an API shared with your web product, push notifications, offline mode and store releases.",
    kicker: "Build · Mobile apps",
    icon: "i-mobile",
    color: "#0B6FE8",
    intro: [
      "Most businesses don’t need two separate native apps and two separate teams. We build iOS and Android apps from a single React Native or Flutter codebase that shares its API, design system and business logic with your web product — faster to build, cheaper to maintain and consistent everywhere your customers are.",
      "We handle the unglamorous parts too: offline behaviour, push notifications, deep links, crash reporting, and the App Store and Play Store review process.",
    ],
    deliverables: [
      {
        t: "Cross-platform apps",
        d: "One codebase for iOS and Android, with native performance where it matters.",
      },
      {
        t: "Customer & loyalty apps",
        d: "Ordering, bookings, loyalty points, referrals and account management.",
      },
      {
        t: "Field & staff apps",
        d: "Offline-first apps for sales teams, delivery staff and technicians.",
      },
      {
        t: "Push & engagement",
        d: "Segmented push notifications, deep links and in-app messaging.",
      },
      {
        t: "Backend & APIs",
        d: "A shared backend for app and web, so features ship once, not twice.",
      },
      {
        t: "Store releases & upkeep",
        d: "Store listings, review submissions, over-the-air updates and OS upgrades.",
      },
    ],
    fit: [
      "Your customers expect an app, not just a mobile site",
      "Staff in the field need to work without a signal",
      "You want iOS and Android on one budget",
      "Your existing app is crashing, outdated or abandoned",
    ],
    tech: [
      "React Native",
      "Flutter",
      "Expo",
      "Firebase",
      "Push notifications",
      "App Store",
      "Google Play",
    ],
    faqs: [
      {
        q: "React Native or Flutter?",
        a: "Both are excellent. React Native suits teams already using React on the web; Flutter is strong for highly custom interfaces. We recommend one based on your product and team.",
      },
      {
        q: "Do we need a native app, or is a web app enough?",
        a: "If you need push notifications, offline use, device features or a store presence, go with a cross-platform native app. For simpler needs, an installable web app can be enough and costs less.",
      },
      {
        q: "Do you publish the app to the stores?",
        a: "Yes — developer account setup, store listings, review submissions and ongoing releases.",
      },
      {
        q: "How much does a mobile app cost?",
        a: "It depends on the screens, features, integrations and backend. We give a fixed quote after a free scoping call.",
      },
    ],
    related: [
      "ecommerce-development",
      "api-backend-development",
      "saas-development",
    ],
  },

  // ---------------------------------------------------------------- Platform
  {
    slug: "api-backend-development",
    group: "platform",
    name: "API & Backend Development",
    short: "APIs & backend",
    title: "API & Backend Development Services — Node.js, Python | Rythmn AI",
    h1: "API and backend development that stays fast as you grow",
    description:
      "REST and GraphQL APIs, services, queues and background jobs built with Node.js, Python and Go — versioned, documented, secured and designed to scale.",
    kicker: "Platform · APIs & backend",
    icon: "i-api",
    color: "#032A82",
    intro: [
      "The backend is where your product’s rules live: who can do what, what happens when an order is placed, how data stays consistent when three things happen at once. We design backends that are simple to reason about, well tested and ready for the traffic you’re planning for — not just the traffic you have.",
      "Every API we ship is versioned, documented, secured, rate-limited and observable, so your web app, mobile app, partners and AI agents can all build on it with confidence.",
    ],
    deliverables: [
      {
        t: "REST & GraphQL APIs",
        d: "Clean, versioned APIs for your web and mobile apps, partners and integrations.",
      },
      {
        t: "Services & modular monoliths",
        d: "Boundaries that match your domain — starting simple, splitting out only when scale demands it.",
      },
      {
        t: "Queues & background jobs",
        d: "Emails, imports, reports and heavy processing moved off the request path.",
      },
      {
        t: "Auth & security",
        d: "OAuth 2.0, JWT, API keys, rate limiting and OWASP-aligned practices.",
      },
      {
        t: "Documentation",
        d: "OpenAPI or GraphQL schemas, examples and SDKs developers can actually use.",
      },
      {
        t: "Performance & observability",
        d: "Caching, load testing, tracing and metrics — with numbers before and after.",
      },
    ],
    fit: [
      "Your web and mobile apps need one shared, reliable API",
      "Your backend slows down or falls over under load",
      "Partners or customers are asking for a public API",
      "You need to break up a legacy system safely",
    ],
    tech: [
      "Node.js",
      "NestJS",
      "Python",
      "FastAPI",
      "Go",
      "GraphQL",
      "Redis",
      "Kafka",
    ],
    faqs: [
      {
        q: "REST or GraphQL?",
        a: "REST is simple, cache-friendly and ideal for public APIs. GraphQL shines when many clients need different shapes of the same data. Many products use both.",
      },
      {
        q: "Microservices or a monolith?",
        a: "Start with a well-structured modular monolith and split out services when team size or scaling needs genuinely demand it. Premature microservices are one of the most expensive mistakes in backend work.",
      },
      {
        q: "Can you speed up our existing API?",
        a: "Usually. We profile it, fix slow queries, add caching and queues, and load-test before and after.",
      },
      {
        q: "Do you write tests and documentation?",
        a: "Yes. Automated tests run in CI on every change, and APIs ship with OpenAPI or GraphQL documentation.",
      },
    ],
    related: [
      "api-integration-services",
      "database-optimization",
      "devops-kubernetes",
    ],
  },
  {
    slug: "api-integration-services",
    group: "platform",
    name: "API Integration Services",
    short: "Integrations",
    title:
      "Third-Party API Integration Services — CRM, ERP, Payments | Rythmn AI",
    h1: "Third-party API and platform integration services",
    description:
      "Reliable integrations between your software and CRM, ERP, payment, messaging, logistics and analytics platforms — with webhooks, retries, monitoring and clean data mapping.",
    kicker: "Platform · Integrations",
    icon: "i-plug",
    color: "#3FA0FF",
    intro: [
      "Most businesses run on a dozen platforms that don’t talk to each other, so people copy data between them by hand and mistakes creep in. We connect them properly: data flows automatically, stays consistent, and someone gets alerted when a vendor’s API has a bad day.",
      "The difference between an integration that works in a demo and one that works for years is in the details — idempotency, retries with back-off, webhook verification, rate limits, data mapping and monitoring. That is where we spend our time.",
    ],
    deliverables: [
      {
        t: "CRM integrations",
        d: "Salesforce, HubSpot, Zoho CRM, LeadSquared and others, synced both ways.",
      },
      {
        t: "ERP & accounting",
        d: "Tally, Zoho Books, Odoo, SAP and QuickBooks — orders, invoices and stock kept in step.",
      },
      {
        t: "Payments",
        d: "Razorpay, Stripe and PayU, including reconciliation, refunds and payouts.",
      },
      {
        t: "Messaging",
        d: "WhatsApp Business, SMS, email and push notifications for transactional and marketing flows.",
      },
      {
        t: "Logistics & marketplaces",
        d: "Shipping aggregators, courier APIs and marketplace listings and orders.",
      },
      {
        t: "Monitoring & alerting",
        d: "Sync dashboards, dead-letter queues and alerts, so nothing fails silently.",
      },
    ],
    fit: [
      "Staff re-type data from one system into another",
      "Integrations break silently and nobody notices for days",
      "You’re adopting a new CRM or ERP and need data to flow into it",
      "You need a connector that no-code tools can’t handle",
    ],
    tech: [
      "REST",
      "Webhooks",
      "OAuth 2.0",
      "Queues",
      "n8n",
      "Node.js",
      "Python",
    ],
    faqs: [
      {
        q: "Can’t we just use Zapier?",
        a: "For simple, low-volume flows, often yes — and we will tell you so. Custom integrations make sense for high volumes, complex data mapping, strict reliability needs, or when no ready-made connector exists.",
      },
      {
        q: "What happens when a third-party API goes down?",
        a: "Our integrations queue and retry with back-off, avoid duplicates with idempotency keys, and alert a person if something stays stuck.",
      },
      {
        q: "Can you integrate with Tally?",
        a: "Yes, through Tally’s XML and ODBC interfaces or a connector service, depending on your setup.",
      },
      {
        q: "Do you maintain integrations after launch?",
        a: "Yes, under a support retainer — including updates when vendors change their APIs.",
      },
    ],
    related: [
      "api-backend-development",
      "workflow-automation",
      "ecommerce-development",
    ],
  },
  {
    slug: "cloud-infrastructure",
    group: "platform",
    name: "Cloud Infrastructure",
    short: "Cloud (AWS / GCP)",
    title: "Cloud Infrastructure & Deployment Services — AWS & GCP | Rythmn AI",
    h1: "Cloud infrastructure and deployment on AWS and Google Cloud",
    description:
      "AWS and Google Cloud setup, migration and management — infrastructure as code with Terraform, networking, security, backups, monitoring and cost optimisation.",
    kicker: "Platform · Cloud",
    icon: "i-cloud",
    color: "#0B6FE8",
    intro: [
      "Cloud set up in a hurry leaves you with a console full of hand-clicked resources nobody understands, a firewall rule open to the world, and a bill that grows every month for no clear reason. We set up AWS and Google Cloud environments as code — repeatable, reviewed and documented — so you know exactly what you’re running and why.",
      "Whether you’re launching a new product, moving off a single server or shared hosting, or taming an existing account, you end up with production, staging and backups you can trust — and a cost line you can explain to finance.",
    ],
    deliverables: [
      {
        t: "Cloud architecture",
        d: "Environments designed for your availability, security and budget needs.",
      },
      {
        t: "Infrastructure as code",
        d: "Everything defined in Terraform, reviewed like application code and reproducible on demand.",
      },
      {
        t: "Migrations",
        d: "Moves from VPS, shared hosting or on-premise servers with minimal downtime.",
      },
      {
        t: "Security & IAM",
        d: "Least-privilege access, secrets management, encryption and network isolation.",
      },
      {
        t: "Backups & disaster recovery",
        d: "Automated, tested backups and a written recovery plan.",
      },
      {
        t: "Cost optimisation",
        d: "Right-sizing, storage lifecycle rules, commitments, budgets and alerts.",
      },
    ],
    fit: [
      "You’re launching and want production done right from day one",
      "Your app runs on a single server with no tested backups",
      "Your cloud bill keeps growing and nobody knows why",
      "A customer’s security review is asking questions you can’t answer",
    ],
    tech: [
      "AWS",
      "Google Cloud",
      "Terraform",
      "CloudFront",
      "RDS / Cloud SQL",
      "IAM",
      "CloudWatch",
    ],
    faqs: [
      {
        q: "AWS or Google Cloud?",
        a: "Both are excellent. The choice usually comes down to your team’s experience, specific managed services and available credits. We work with both.",
      },
      {
        q: "Can our data be hosted in India?",
        a: "Yes. Both AWS and Google Cloud run regions in India, which helps with latency for Indian users and with data-residency requirements.",
      },
      {
        q: "Can you reduce our cloud costs?",
        a: "Usually. Right-sizing, storage lifecycle rules, committed-use pricing and switching off idle resources often make a significant difference — and we measure before and after.",
      },
      {
        q: "Will we have full access to everything?",
        a: "Yes. The cloud accounts, code and documentation are yours.",
      },
    ],
    related: [
      "devops-kubernetes",
      "database-optimization",
      "application-maintenance-support",
    ],
  },
  {
    slug: "devops-kubernetes",
    group: "platform",
    name: "DevOps & Kubernetes",
    short: "DevOps & Kubernetes",
    title: "DevOps, Docker & Kubernetes Services — CI/CD | Rythmn AI",
    h1: "DevOps, Docker and Kubernetes services",
    description:
      "CI/CD pipelines, Docker containerisation, Kubernetes deployments, autoscaling, observability and safe rollbacks — so your team ships faster with fewer incidents.",
    kicker: "Platform · DevOps",
    icon: "i-devops",
    color: "#032A82",
    intro: [
      "If releasing is a nervous, manual, Friday-evening event, your team ships less and breaks more. DevOps fixes that with automation: every commit tested and built the same way, every deploy repeatable, and every problem visible on a dashboard before a customer notices.",
      "We containerise applications with Docker, build CI/CD pipelines, and run workloads on Kubernetes or a simpler managed platform — whichever your scale actually warrants. Kubernetes is powerful; it isn’t always necessary, and we’ll tell you honestly.",
    ],
    deliverables: [
      {
        t: "CI/CD pipelines",
        d: "GitHub Actions or GitLab CI running tests, builds and preview environments on every change.",
      },
      {
        t: "Docker containerisation",
        d: "Small, secure images that run the same on a laptop, in staging and in production.",
      },
      {
        t: "Kubernetes",
        d: "EKS or GKE clusters with Helm, autoscaling and sensible resource limits.",
      },
      {
        t: "Observability",
        d: "Logs, metrics, traces and alerts with Prometheus, Grafana and OpenTelemetry.",
      },
      {
        t: "Safe deployments",
        d: "Blue-green and canary releases, with one-step rollback.",
      },
      {
        t: "Security in the pipeline",
        d: "Dependency and image scanning, and secrets kept out of code.",
      },
    ],
    fit: [
      "Deploys are manual and nerve-racking",
      "Nobody knows the app is down until a customer calls",
      "You’re outgrowing a single server",
      "You want a preview environment for every feature branch",
    ],
    tech: [
      "Docker",
      "Kubernetes",
      "Helm",
      "GitHub Actions",
      "Argo CD",
      "Prometheus",
      "Grafana",
      "OpenTelemetry",
    ],
    faqs: [
      {
        q: "Do we actually need Kubernetes?",
        a: "Not always. For many products a managed container platform such as Cloud Run or ECS is simpler and cheaper. Kubernetes pays off with many services, complex scaling or multi-cloud needs.",
      },
      {
        q: "Can you set up DevOps for our existing team?",
        a: "Yes. We build the pipelines and platform, then train your team to own and extend them.",
      },
      {
        q: "How do rollbacks work?",
        a: "Every deploy is versioned, so rolling back is a single step, and canary releases catch problems before they reach every user.",
      },
      {
        q: "Do you provide on-call support?",
        a: "On-call coverage can be part of a support retainer, with hours and response times agreed in the SLA.",
      },
    ],
    related: [
      "cloud-infrastructure",
      "api-backend-development",
      "application-maintenance-support",
    ],
  },
  {
    slug: "database-optimization",
    group: "platform",
    name: "Database Design & Optimization",
    short: "Databases",
    title:
      "Database Design & Optimization Services — PostgreSQL, MySQL | Rythmn AI",
    h1: "Database design and performance optimization",
    description:
      "Database schema design, query tuning, indexing, zero-downtime migrations, caching and replication for PostgreSQL, MySQL, MongoDB, Redis and vector databases.",
    kicker: "Platform · Databases",
    icon: "i-db",
    color: "#3FA0FF",
    intro: [
      "When an application gets slow, the database is usually where the time goes: a missing index, a query that fetches ten thousand rows to show ten, a table design that made sense two years ago. Fixing it is often the cheapest performance win available.",
      "We design schemas for new products, and diagnose and fix existing databases — with measurements before and after, and migrations planned so production never has to go down.",
    ],
    deliverables: [
      {
        t: "Schema design",
        d: "Data models that fit your domain today and can grow without painful rewrites.",
      },
      {
        t: "Query & index tuning",
        d: "Slow queries found, explained and fixed, with the gains measured.",
      },
      {
        t: "Zero-downtime migrations",
        d: "Schema and platform changes rolled out safely, with a rollback plan.",
      },
      {
        t: "Caching",
        d: "Redis and application caching for hot data, with sensible invalidation.",
      },
      {
        t: "Replication & scaling",
        d: "Read replicas, partitioning and connection pooling as load grows.",
      },
      {
        t: "Vector databases",
        d: "pgvector and dedicated vector stores for AI search and RAG.",
      },
    ],
    fit: [
      "Pages or reports take seconds to load",
      "Database CPU sits near 100% at peak",
      "You’re planning a large data migration",
      "You’re adding AI search and need a vector store",
    ],
    tech: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "pgvector",
      "BigQuery",
      "PgBouncer",
    ],
    faqs: [
      {
        q: "Can you speed up our database without rewriting the app?",
        a: "Usually, yes. Most gains come from indexes, query rewrites, caching and configuration rather than a rewrite.",
      },
      {
        q: "SQL or NoSQL?",
        a: "For most business applications PostgreSQL is the safest default. Document or key-value stores make sense for specific access patterns.",
      },
      {
        q: "Can you migrate us from one database to another?",
        a: "Yes — for example MySQL to PostgreSQL, or self-hosted to a managed cloud database — with validation and a rollback plan.",
      },
      {
        q: "Do you need production access?",
        a: "We start with read-only access and query statistics. Any change goes through review and a tested migration.",
      },
    ],
    related: [
      "api-backend-development",
      "cloud-infrastructure",
      "rag-development",
    ],
  },

  // ---------------------------------------------------------------- Automate, run, advise
  {
    slug: "workflow-automation",
    group: "run",
    name: "Workflow Automation",
    short: "Automation",
    title: "Business Process & Workflow Automation Services — Rythmn AI",
    h1: "Workflow automation for the work your team shouldn’t be doing by hand",
    description:
      "Business process automation — document processing, approvals, data sync, scheduled reports and AI-powered workflows, with audit trails and alerting.",
    kicker: "Automate · Workflows",
    icon: "i-flow",
    color: "#F58B00",
    intro: [
      "Every business has jobs that are copy, paste, check, forward, repeat: invoices typed into accounting, reports stitched together every Monday, leads moved between tools, approvals chased on WhatsApp. They eat hours, and they are exactly where errors come from.",
      "We turn those jobs into reliable automated workflows — with AI where the inputs are messy (emails, PDFs, scans), approval steps where a person should decide, and an audit trail of everything that ran.",
    ],
    deliverables: [
      {
        t: "Document processing",
        d: "Invoices, purchase orders, KYC documents and forms extracted with AI and validated against your rules.",
      },
      {
        t: "Approval workflows",
        d: "Requests routed to the right person, with reminders, escalation and a full history.",
      },
      {
        t: "Data sync",
        d: "CRM, ERP, spreadsheets and databases kept in step automatically.",
      },
      {
        t: "Scheduled reports",
        d: "The Monday report assembled and delivered before anyone logs in.",
      },
      {
        t: "Notifications & alerts",
        d: "The right people told on email, Slack or WhatsApp when something needs them.",
      },
      {
        t: "AI-powered steps",
        d: "Classification, summarisation and routing for inputs rules can’t handle.",
      },
    ],
    fit: [
      "Someone spends hours a week copying data between tools",
      "Approvals get lost in email and chat",
      "Errors creep in from manual data entry",
      "Reports take a day to assemble",
    ],
    tech: [
      "n8n",
      "Temporal",
      "Python",
      "Node.js",
      "Google Workspace APIs",
      "Anthropic",
      "WhatsApp Business API",
    ],
    faqs: [
      {
        q: "Which processes should we automate first?",
        a: "High-volume, rule-based and error-prone ones. We usually start with a short audit that ranks candidates by the hours they would save.",
      },
      {
        q: "No-code tools or custom automation?",
        a: "We use n8n or similar tools where they fit, and write custom code where reliability, volume or complexity demand it.",
      },
      {
        q: "Can automation handle scanned documents?",
        a: "Yes, by combining OCR with AI extraction, validation rules and human review for low-confidence cases.",
      },
      {
        q: "What happens when an automated step fails?",
        a: "It retries, then alerts a person with the context needed to fix it. Nothing fails silently.",
      },
    ],
    related: [
      "ai-agent-development",
      "api-integration-services",
      "ai-chatbot-development",
    ],
  },
  {
    slug: "application-maintenance-support",
    group: "run",
    name: "Application Maintenance & Support",
    short: "Maintenance & support",
    title: "Application Maintenance & Support Services — Rythmn AI",
    h1: "Application maintenance, enhancement and support",
    description:
      "Take over, stabilise and modernise existing web and mobile applications — code audits, bug fixing, framework upgrades, security patching and SLA-backed ongoing support.",
    kicker: "Run · Maintenance & support",
    icon: "i-support",
    color: "#0B6FE8",
    intro: [
      "Inherited a codebase nobody wants to touch? The original developer has moved on, the framework is three versions behind, and every change breaks something else. We take over applications like that — built by us or by someone else — and make them safe to change again.",
      "We start with an audit, stabilise the critical paths, document what we find, then keep shipping improvements under an SLA — without a rewrite you can’t afford.",
    ],
    deliverables: [
      {
        t: "Code & security audit",
        d: "A clear written picture of the risks, the debt and what to fix first.",
      },
      {
        t: "Stabilisation",
        d: "Critical bugs fixed, tests added around fragile code, monitoring switched on.",
      },
      {
        t: "Upgrades",
        d: "Framework, language and dependency upgrades to supported versions.",
      },
      {
        t: "Security patching",
        d: "Vulnerabilities tracked and patched on a schedule, not after an incident.",
      },
      {
        t: "Feature enhancements",
        d: "A monthly budget for improvements, planned together.",
      },
      {
        t: "SLA-backed support",
        d: "Response and fix times by severity, agreed in writing.",
      },
    ],
    fit: [
      "Your developer or agency is no longer available",
      "Your app runs on outdated, unsupported versions",
      "The same bugs keep coming back",
      "You need guaranteed response times",
    ],
    tech: [
      "Code audit",
      "Automated testing",
      "Sentry",
      "Dependency upgrades",
      "PHP / Laravel",
      "Node.js",
      "Python",
      "React",
    ],
    faqs: [
      {
        q: "Will you take over an app built by another developer?",
        a: "Yes. We start with an audit of the code, infrastructure and access, and give you a clear picture of the risks and a plan before taking over.",
      },
      {
        q: "Do we have to rewrite it?",
        a: "Rarely. Incremental improvement is almost always cheaper and safer than a big-bang rewrite.",
      },
      {
        q: "What does the SLA cover?",
        a: "Response and resolution times by severity, plus monitoring, backups and patching — agreed in writing to fit your business.",
      },
      {
        q: "How is support billed?",
        a: "As a monthly retainer with an agreed enhancement budget. See our pricing page for how engagements work.",
      },
    ],
    related: [
      "devops-kubernetes",
      "technical-consulting",
      "web-application-development",
    ],
  },
  {
    slug: "technical-consulting",
    group: "run",
    name: "Technical Consulting & Architecture",
    short: "Consulting & architecture",
    title: "Technical Consulting & Software Architecture Services — Rythmn AI",
    h1: "Technical consulting and software architecture",
    description:
      "Architecture reviews, technology selection, scalability and security planning, AI readiness assessments and delivery roadmaps — independent advice, whether or not we build it.",
    kicker: "Advise · Consulting",
    icon: "i-arch",
    color: "#032A82",
    intro: [
      "Some of the most expensive mistakes in software are made before a line of code is written: the wrong stack, the wrong architecture, the wrong build-versus-buy call. A few days of senior advice at the start can save months later.",
      "We give straight technical answers — architecture reviews, technology choices, scaling and security plans, AI feasibility — written down with trade-offs and real numbers. It is useful whether or not we are the team that builds it.",
    ],
    deliverables: [
      {
        t: "Architecture review",
        d: "Strengths, risks and bottlenecks in your current system, prioritised.",
      },
      {
        t: "Technology selection",
        d: "Stack, cloud and vendor choices with the trade-offs spelled out.",
      },
      {
        t: "Scalability planning",
        d: "What breaks at 10× and 100× load, and what to do about it now.",
      },
      {
        t: "Security review",
        d: "Threat modelling, access and data-protection review, with practical fixes.",
      },
      {
        t: "AI readiness assessment",
        d: "Where AI would genuinely help, what data it needs, and what it would cost to run.",
      },
      {
        t: "Delivery roadmap",
        d: "A phased plan with estimates, team shape and milestones.",
      },
    ],
    fit: [
      "You’re about to start a large build and want a second opinion",
      "An investor or customer is asking hard technical questions",
      "Your platform is struggling to scale",
      "You want to know where AI would actually pay off",
    ],
    tech: [
      "Architecture review",
      "System design",
      "Threat modelling",
      "Cost modelling",
      "AI feasibility",
    ],
    faqs: [
      {
        q: "Do we have to hire you to build it afterwards?",
        a: "No. The deliverable is yours to use with any team.",
      },
      {
        q: "What do we get at the end?",
        a: "A written report with findings, recommendations, trade-offs and a prioritised roadmap, walked through with your team on a call.",
      },
      {
        q: "Can you do technical due diligence?",
        a: "Yes — for investors or acquirers, covering code quality, architecture, security, team and scalability.",
      },
      {
        q: "How is consulting priced?",
        a: "Usually as a fixed-scope engagement. Tell us what you need and we will send a quote.",
      },
    ],
    related: [
      "saas-development",
      "cloud-infrastructure",
      "application-maintenance-support",
    ],
  },
];

for (const s of services) s.process ||= DEFAULT_PROCESS;

export const serviceBySlug = Object.fromEntries(
  services.map((s) => [s.slug, s]),
);
