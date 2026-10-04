// Site-wide facts. Anything left empty is simply not rendered (and `node build.mjs`
// lists it as a TODO), so nothing placeholder-ish ever ships to the live site.

export const site = {
  url: "https://rythmnai.com",
  name: "Rythmn AI",
  legalName: "Rythmn AI Digital Private Limited",
  slogan: "Build. Innovate. Grow.",
  email: "hello@rythmnai.com",

  // TODO(owner): contact details — these drive the footer, /contact/ and LocalBusiness schema.
  phone: "", // display format, e.g. '+91 98765 43210'
  whatsapp: "", // digits only with country code, e.g. '919876543210'
  address: {
    street: "", // e.g. 'Office 4B, XYZ Tower, Malviya Nagar'
    locality: "Jaipur",
    region: "Rajasthan",
    postalCode: "", // e.g. '302017'
    country: "IN",
    countryName: "India",
  },
  mapsUrl: "", // Google Business Profile / Maps share link
  hours: "", // e.g. 'Mon–Sat, 10:00–19:00 IST'

  // TODO(owner): company registration facts — strong trust signals for Indian B2B buyers.
  founded: "", // e.g. '2025'
  cin: "", // MCA Corporate Identification Number
  gstin: "",

  social: {
    facebook: "https://www.facebook.com/rythmnai",
    instagram: "https://www.instagram.com/rythmnai",
    linkedin: "https://www.linkedin.com/company/rythmnai/",
  },

  // Optional form backend (Formspree, Web3Forms, Basin…). Empty = the form opens the visitor's email app.
  formEndpoint: "",

  analytics:
    '<script defer data-cfasync="false" src="https://ai.rythmn.in/t/s.js" data-site="8RKoziArvn2F"></script>',
};

// TODO(owner): real people build trust. Rendered on /about/ when non-empty.
// { name: 'Full Name', role: 'Founder & CEO', photo: '/assets/team/name.jpg', bio: 'One or two lines.', linkedin: '' }
export const team = [];

// TODO(owner): only add testimonials you have written permission to publish.
// { quote: '…', name: 'Full Name', role: 'Head of Ops', company: 'Company', service: 'saas-development' }
// `service` (optional) also shows the quote on that service page.
export const testimonials = [];

// TODO(owner): client case studies, published with the client's permission. Rendered on /work/.
// { client: 'Company', industry: 'Retail', title: 'Headline result', services: ['ecommerce-development'],
//   challenge: '…', solution: '…', results: ['…', '…'], stack: ['Next.js', '…'] }
export const caseStudies = [
  {
    client: 'Thaper Dental Clinic',
    industry: 'Healthcare · Jaipur · since 1958',
    url: 'https://thaperdental.com',
    title: 'A four-branch dental clinic, rebuilt for speed, search and WhatsApp bookings.',
    services: ['website-development', 'web-application-development'],
    challenge: 'A trusted Jaipur practice with four branches was represented online by a slow static site: one generic page per treatment, no per-branch presence for Google, and enquiries that could go missing between a form and a phone call.',
    solution: 'A Next.js rebuild with every treatment, branch and the dental-tourism page generated from one catalogue, Dentist and FAQ structured data for each branch, an open-source Payload CMS for the blog, and a contact flow that saves every lead before handing the patient to WhatsApp with their details pre-filled.',
    results: [
      'Lighthouse 100 on desktop and 95 on mobile, enforced in CI on every change',
      'Nine treatment pages, a dental-tourism page and four branch pages, each with its own schema',
      'No lost enquiries: every lead is stored first, then routed to reception on WhatsApp',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Payload CMS', 'PostgreSQL', 'Cloudflare R2'],
  },
  {
    client: 'Nutrition Simplified',
    industry: 'Health & wellness · Dietitian practice',
    url: 'https://divyanutritionsimplified.com',
    title: 'A nutrition practice with its own branded app — meal plans, blood reports and bookings in one place.',
    services: ['saas-development', 'mobile-app-development', 'web-application-development'],
    challenge: 'An independent dietitian was paying for a per-seat wellness platform that carried someone else’s brand, while client notes, blood reports and meal plans still lived across WhatsApp chats and spreadsheets.',
    solution: 'A multi-coach platform the practice owns: a coach dashboard for clients, recipes, meal and workout plans; a branded, installable client app in the practice’s own name and colours; blood-report tracking with optional AI extraction; and a public site with 14 programmes and online booking.',
    results: [
      'Branded client app on the web, iOS and Android — with full parity between them',
      'Blood-report values charted over time against reference ranges',
      'Meal plans that scale calories and macros automatically, built from the practice’s own recipe library',
    ],
    stack: ['Next.js', 'React Native', 'PostgreSQL', 'Drizzle', 'Razorpay', 'OpenAI'],
  },
];

// Engagement models for /pricing/. Set `from` (e.g. '₹1.5 lakh') to publish a starting price.
export const engagements = [
  {
    tag: "Fixed scope",
    name: "Project build",
    from: "",
    fallback: "Fixed written quote after a free scoping call",
    desc: "A defined outcome — a site, an app, a platform, an AI system — with a fixed scope, timeline and price.",
    items: [
      "Written scope and estimate up front",
      "Weekly demos on staging",
      "Handover with docs and access",
      "30 days of post-launch cover",
    ],
    cta: "Scope a project",
  },
  {
    tag: "Most popular",
    name: "Dedicated pod",
    from: "",
    fallback: "Monthly, priced by pod size",
    desc: "A cross-functional team — product, design, engineering, DevOps — reserved for you month to month.",
    items: [
      "Your roadmap, your priorities",
      "Same people, sprint after sprint",
      "Scale the pod up or down monthly",
      "Direct access, no account layer",
    ],
    cta: "Talk about a pod",
    highlight: true,
  },
  {
    tag: "Keep it running",
    name: "Support & retainer",
    from: "",
    fallback: "Monthly retainer, sized to your SLA",
    desc: "We take on an existing application — ours or someone else’s — and keep it healthy, current and moving.",
    items: [
      "Response and fix SLAs",
      "Monitoring, backups and patching",
      "Monthly enhancement budget",
      "Quarterly architecture review",
    ],
    cta: "Ask about support",
  },
];
