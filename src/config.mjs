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
    linkedin: "", // add the company page URL once it exists — icon appears automatically
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
export const caseStudies = [];

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
