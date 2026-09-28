// Blog posts at /blog/<slug>/. `body` is trusted HTML; every <h2 id="…"> becomes a table-of-contents entry.

export const posts = [
  {
    slug: "what-is-rag",
    title: "What is RAG? Retrieval-augmented generation, explained",
    description:
      "What retrieval-augmented generation (RAG) is, how it works step by step, how it compares with fine-tuning, and the mistakes that make RAG systems give wrong answers.",
    date: "2026-09-28",
    readMins: 8,
    tags: ["AI", "RAG"],
    services: ["rag-development", "ai-chatbot-development"],
    body: `
<p class="lead">Retrieval-augmented generation — RAG — is the technique behind almost every useful business AI assistant. Instead of relying only on what a language model memorised during training, a RAG system first <em>retrieves</em> the relevant passages from your own documents and data, then asks the model to answer using those passages. The result: answers that are current, specific to your business, and traceable to a source.</p>

<h2 id="problem">The problem RAG solves</h2>
<p>Large language models are remarkable writers and reasoners, but they have three limits that matter for business use:</p>
<ul>
  <li><strong>They don’t know your business.</strong> Your pricing, policies, product specs and customer history were never in their training data.</li>
  <li><strong>Their knowledge is frozen.</strong> A model trained months ago knows nothing about last week’s policy change.</li>
  <li><strong>They fill gaps confidently.</strong> Ask about something they don’t know and they may produce a plausible, wrong answer — a “hallucination”.</li>
</ul>
<p>RAG addresses all three by giving the model the right information at the moment it answers, and instructing it to stick to that information.</p>

<h2 id="how-it-works">How RAG works, step by step</h2>
<p>A RAG system has two halves: an <strong>indexing</strong> pipeline that prepares your content ahead of time, and a <strong>query</strong> pipeline that runs every time someone asks a question.</p>
<h3>Indexing (done ahead of time)</h3>
<ol>
  <li><strong>Ingest.</strong> Pull content from where it lives — PDFs, Word files, a help centre, Confluence or Notion, Google Drive, a database, past support tickets.</li>
  <li><strong>Chunk.</strong> Split long documents into passages small enough to be precise but large enough to keep their meaning — often a few hundred words, split along headings rather than at arbitrary character counts.</li>
  <li><strong>Embed.</strong> Convert each chunk into an <em>embedding</em>: a list of numbers that captures its meaning, so that passages about similar things end up close together.</li>
  <li><strong>Index.</strong> Store the chunks, their embeddings and useful metadata (source, date, product, who is allowed to read it) in a search index or vector database.</li>
</ol>
<h3>Answering (done for every question)</h3>
<ol>
  <li><strong>Retrieve.</strong> Turn the question into an embedding and find the most similar chunks — ideally combined with classic keyword search, which is better at exact terms like part numbers and names.</li>
  <li><strong>Rerank and filter.</strong> Re-score the candidates for relevance and drop anything the user isn’t permitted to see.</li>
  <li><strong>Augment.</strong> Put the best passages into the model’s prompt, together with instructions: answer only from these sources, cite them, and say so if the answer isn’t there.</li>
  <li><strong>Generate.</strong> The model writes the answer, with references back to the passages it used.</li>
</ol>

<h2 id="rag-vs-fine-tuning">RAG vs fine-tuning</h2>
<p>The other common way to “teach” a model about your business is fine-tuning — further training the model on your own examples. They solve different problems:</p>
<div class="tbl"><table>
  <thead><tr><th></th><th>RAG</th><th>Fine-tuning</th></tr></thead>
  <tbody>
    <tr><th>Best for</th><td>Answering from facts and documents</td><td>Teaching a style, format or narrow skill</td></tr>
    <tr><th>Keeping up to date</th><td>Re-index the changed documents</td><td>Retrain the model</td></tr>
    <tr><th>Citing sources</th><td>Built in</td><td>Not possible</td></tr>
    <tr><th>Per-user permissions</th><td>Filter at retrieval time</td><td>Not possible</td></tr>
    <tr><th>Upfront cost</th><td>Lower</td><td>Higher</td></tr>
  </tbody>
</table></div>
<p>For most business use cases, start with RAG. Fine-tuning is worth considering later, for tone or output format — and the two can be combined.</p>

<h2 id="where-it-goes-wrong">Where RAG goes wrong</h2>
<p>A basic RAG demo takes an afternoon. A RAG system people trust takes engineering. The usual failure points are:</p>
<ul>
  <li><strong>Bad chunking.</strong> Splitting a table in half, or separating a heading from the paragraph it describes, destroys meaning before search even starts.</li>
  <li><strong>Vector search alone.</strong> Semantic search is great at meaning and poor at exact matches. Hybrid search — vectors plus keywords — with a reranking step fixes a large share of wrong answers.</li>
  <li><strong>No evaluation.</strong> Without a test set of real questions and known answers, you can’t tell whether a change made things better or worse. Measure retrieval (did we find the right passage?) and generation (did the answer stay faithful to it?) separately.</li>
  <li><strong>Stale content.</strong> If the index isn’t re-synced when documents change, the assistant quietly drifts out of date.</li>
  <li><strong>Ignoring permissions.</strong> An internal assistant that can surface HR documents to every employee is a security incident waiting to happen. Filter by access rights at retrieval time.</li>
  <li><strong>Messy source documents.</strong> Scanned PDFs, complex tables and duplicated or contradictory pages need cleaning and parsing. This is unglamorous work — and often where most accuracy is won.</li>
</ul>

<h2 id="production-stack">What a production RAG stack looks like</h2>
<ul>
  <li><strong>Connectors and parsers</strong> for each content source, with OCR and table handling where needed.</li>
  <li><strong>A search store</strong> — frequently PostgreSQL with the pgvector extension, so vectors sit next to your existing data; or a dedicated store for very large indexes.</li>
  <li><strong>Hybrid retrieval and a reranker</strong> to get the best few passages, not just similar ones.</li>
  <li><strong>A language model</strong> chosen for quality, speed and cost — with the architecture kept model-agnostic.</li>
  <li><strong>Evaluation and monitoring:</strong> an automated test set run on every change, user feedback capture, and dashboards for cost and latency.</li>
</ul>

<h2 id="do-you-need-rag">Do you need RAG?</h2>
<p>You probably do if people in your business — or your customers — regularly need answers that live in documents, tickets or data, and those answers must be accurate and current. Typical first projects are a support assistant over a help centre, an internal copilot over policies and SOPs, or a sales assistant over product documentation.</p>
<p>You probably don’t if the task is purely creative, or if the information fits comfortably in a single prompt.</p>
`,
  },
  {
    slug: "how-to-build-an-ai-agent",
    title: "How to build an AI agent: a practical guide for businesses",
    description:
      "A step-by-step guide to building an AI agent that does real work — choosing the task, designing tools, the agent loop, guardrails, evaluation and a safe rollout.",
    date: "2026-09-28",
    readMins: 9,
    tags: ["AI", "Agents"],
    services: ["ai-agent-development", "workflow-automation"],
    body: `
<p class="lead">An AI agent is software that uses a language model to decide what to do next — and then does it, by calling tools such as your APIs, databases or email. Chatbots answer; agents act. This guide walks through how to build one that is useful and safe, based on how we approach agent projects.</p>

<h2 id="what-is-an-agent">What an agent actually is</h2>
<p>Strip away the hype and an agent is a loop with four parts:</p>
<ul>
  <li><strong>A model</strong> that reads the situation and decides the next step.</li>
  <li><strong>Tools</strong> — functions the model is allowed to call, like <code>look_up_order</code>, <code>issue_refund</code> or <code>send_email</code>.</li>
  <li><strong>Context</strong> — the instructions, the task, and the results of previous steps.</li>
  <li><strong>A stopping rule</strong> — the task is done, a limit is hit, or a person needs to take over.</li>
</ul>
<pre><code>context = [instructions, task]
repeat (up to N steps):
    decision = model(context, available_tools)
    if decision is a final answer: return it
    if decision needs approval: ask a human, add their answer to context
    result = run_tool(decision.tool, decision.arguments)
    context.append(decision, result)
hand off to a human with the full context</code></pre>
<p>Everything else — frameworks, memory, multi-agent setups — is refinement of this loop.</p>

<h2 id="step-1">Step 1: pick one narrow, valuable job</h2>
<p>The most common reason agent projects stall is scope. “An agent that runs our operations” is not a project; “an agent that triages incoming support emails, pulls up the order and drafts a reply” is. Good first tasks share four traits:</p>
<ul>
  <li><strong>High volume</strong> — it happens many times a day, so savings add up.</li>
  <li><strong>A clear definition of done</strong> — you can tell whether the agent got it right.</li>
  <li><strong>Messy inputs</strong> — emails, PDFs, free text — which is where agents beat fixed rules.</li>
  <li><strong>Limited downside</strong> — mistakes are recoverable, or can be caught by a review step.</li>
</ul>
<p>Examples: ticket triage, invoice and purchase-order processing, lead research and enrichment, data clean-up, weekly report preparation.</p>

<h2 id="step-2">Step 2: design the tools</h2>
<p>Tools are the agent’s hands, and their design matters more than the prompt. Good tools are:</p>
<ul>
  <li><strong>Narrow and well named.</strong> <code>get_order_status(order_id)</code> is better than a general <code>run_sql(query)</code>.</li>
  <li><strong>Least-privilege.</strong> The agent gets read access unless it truly needs to write, and write access only to what the task requires.</li>
  <li><strong>Clearly described.</strong> The model decides which tool to call from its description, so write it like documentation for a new colleague — including when <em>not</em> to use it.</li>
  <li><strong>Safe to retry.</strong> Networks fail. A tool that creates a record should not create two if it is called twice.</li>
  <li><strong>Informative on failure.</strong> Return errors the model can act on (“order not found — check the number”), not stack traces.</li>
</ul>
<p>Standards such as the Model Context Protocol (MCP) make it easier to expose the same tools to different models and applications.</p>

<h2 id="step-3">Step 3: write the instructions and the loop</h2>
<p>The system instructions should explain the job the way you would brief a capable new hire: the goal, the steps you would expect, the policies to respect, what “done” looks like, and when to stop and ask a human. Include a couple of worked examples of tricky cases.</p>
<p>Then build the loop with hard limits: a maximum number of steps, a time budget and a cost budget per task. An agent that can loop forever will, eventually.</p>

<h2 id="step-4">Step 4: add guardrails and human approval</h2>
<ul>
  <li><strong>Approval gates</strong> for anything irreversible or expensive — refunds, emails to customers, deletions — at least until the agent has earned trust.</li>
  <li><strong>Input hygiene.</strong> Content the agent reads (emails, web pages, documents) can contain instructions of its own, known as prompt injection. Treat it as data, never as commands, and keep sensitive tools out of reach of tasks that process untrusted content.</li>
  <li><strong>Validation.</strong> Check tool arguments against business rules in code: a refund can’t exceed the order value, whatever the model decides.</li>
  <li><strong>Tracing.</strong> Log every step, tool call and result, so any outcome can be explained and replayed.</li>
</ul>

<h2 id="step-5">Step 5: evaluate on real cases</h2>
<p>Before an agent touches live work, run it on historical cases where you already know the right outcome. Measure task success rate, the kinds of mistakes it makes, the number of steps taken, cost per task and time per task. Turn every failure into a test case, so fixes don’t quietly break something else. Re-run the suite whenever you change the prompt, the tools or the model.</p>

<h2 id="step-6">Step 6: roll out in supervised mode</h2>
<ol>
  <li><strong>Shadow mode</strong> — the agent proposes, humans do the work and compare.</li>
  <li><strong>Approve-all</strong> — the agent does the work, a human approves every action.</li>
  <li><strong>Approve-risky</strong> — routine actions run automatically, risky ones still need approval.</li>
  <li><strong>Autonomous with monitoring</strong> — for the parts of the task where the numbers justify it.</li>
</ol>
<p>Move between stages based on measured results, not on how impressive the demo was.</p>

<h2 id="mistakes">Common mistakes</h2>
<ul>
  <li>Starting with a multi-agent architecture when a single agent with good tools would do.</li>
  <li>Giving the agent one powerful, general tool instead of several narrow ones.</li>
  <li>Skipping evaluation because “it worked in the demo”.</li>
  <li>No limits on steps or spend.</li>
  <li>No plan for handing off to a person — the moment users lose trust in an agent is the moment it gets stuck with no way out.</li>
</ul>
`,
  },
  {
    slug: "cost-of-building-a-saas",
    title: "How much does it cost to build a SaaS product in 2026?",
    description:
      "What drives the cost of building a SaaS product, indicative ranges for an MVP through to a scaling platform, the running costs founders forget, and how to spend less without cutting corners.",
    date: "2026-09-28",
    readMins: 8,
    tags: ["SaaS", "Costs"],
    services: ["saas-development", "technical-consulting"],
    body: `
<p class="lead">“How much will it cost?” is the first question every founder asks, and “it depends” is the least helpful answer. This guide breaks down what actually drives the cost of building a SaaS product, gives indicative ranges for each stage, and covers the running costs that are easy to forget.</p>

<h2 id="short-answer">The short answer</h2>
<p>The cost of a SaaS product is driven far more by <strong>scope</strong> than by technology. Two products built on the same stack can differ in cost by ten times, because one has a single user role and one core workflow while the other has five roles, three integrations and a reporting suite. The most effective way to control cost is to be ruthless about what goes into the first version.</p>

<h2 id="what-drives-cost">What drives the cost</h2>
<ul>
  <li><strong>The core workflow.</strong> The one thing customers pay for. The more steps, states and edge cases it has, the more it costs.</li>
  <li><strong>User roles and permissions.</strong> Each role (admin, manager, member, customer, partner) multiplies screens, rules and testing.</li>
  <li><strong>SaaS plumbing.</strong> Sign-up, teams, multi-tenancy, subscription billing, usage limits, emails, an admin panel and audit logs. Every SaaS needs these; building them from scratch is a significant share of an MVP budget.</li>
  <li><strong>Integrations.</strong> Each third-party system — payments, CRM, accounting, messaging — adds build time and ongoing maintenance.</li>
  <li><strong>Design.</strong> A polished, custom design system costs more than a well-applied component library. Both can look professional.</li>
  <li><strong>AI features.</strong> Adding an assistant or automation is increasingly common; it adds build, evaluation and per-use running costs.</li>
  <li><strong>Compliance and security.</strong> Enterprise customers may require SSO, audit trails, data residency and security reviews.</li>
  <li><strong>Platforms.</strong> Web only, or web plus iOS and Android apps.</li>
</ul>

<h2 id="ranges">Indicative cost by stage</h2>
<p>These are indicative ranges for an experienced Indian product team building for Indian or global customers. They are not a quote — your scope sets the real number — but they show the order of magnitude at each stage.</p>
<div class="tbl"><table>
  <thead><tr><th>Stage</th><th>What you get</th><th>Indicative range</th></tr></thead>
  <tbody>
    <tr><th>Clickable prototype</th><td>Validated flows and screens to test with users or investors — no working backend</td><td>₹1–3 lakh</td></tr>
    <tr><th>MVP</th><td>One core workflow, sign-up and teams, billing, a basic admin — enough to charge real customers</td><td>₹6–20 lakh</td></tr>
    <tr><th>Version 1</th><td>Multiple roles, key integrations, reporting, onboarding and polish</td><td>₹20–60 lakh</td></tr>
    <tr><th>Scaling platform</th><td>Enterprise features, public API, mobile apps, advanced analytics, a dedicated team</td><td>₹60 lakh and up, usually as an ongoing team</td></tr>
  </tbody>
</table></div>
<p>Timelines follow the same shape: a prototype takes weeks, an MVP usually a few months, and a version 1 several months more.</p>

<h2 id="running-costs">Running costs founders forget</h2>
<ul>
  <li><strong>Hosting and infrastructure.</strong> Modest at launch, growing with customers. Good architecture keeps this proportional to revenue.</li>
  <li><strong>Third-party services.</strong> Email delivery, SMS and WhatsApp messages, error tracking, analytics, file storage — each small, together noticeable.</li>
  <li><strong>AI usage.</strong> Model calls are billed per use. Budget per active customer, and design features so costs can be capped.</li>
  <li><strong>Payment fees.</strong> Payment gateways take a percentage of every transaction.</li>
  <li><strong>Maintenance and support.</strong> Security patches, dependency upgrades, bug fixes and small improvements. Plan for an ongoing monthly budget from day one — software that isn’t maintained decays.</li>
  <li><strong>Continued development.</strong> Once customers arrive, so do feature requests. Successful SaaS products never stop being built.</li>
</ul>

<h2 id="spend-less">How to spend less without cutting corners</h2>
<ol>
  <li><strong>Cut scope, not quality.</strong> Launch one workflow done well rather than five done badly. You can’t know which features matter until customers use the product.</li>
  <li><strong>Don’t rebuild the plumbing.</strong> Authentication, billing and tenancy are solved problems. Use proven services or a tested SaaS foundation, and spend your budget on what makes your product different.</li>
  <li><strong>Prototype before you build.</strong> A few weeks testing a clickable prototype with real users is the cheapest way to avoid building the wrong thing.</li>
  <li><strong>Choose boring technology.</strong> Mainstream frameworks and databases are cheaper to hire for, maintain and scale.</li>
  <li><strong>Web first.</strong> Unless your product is inherently mobile, a responsive web app is the fastest route to customers; native apps can follow.</li>
  <li><strong>Insist on ownership.</strong> Make sure you own the code, cloud accounts and data from day one. Getting them back later is expensive.</li>
</ol>

<h2 id="fixed-or-hourly">Fixed price or time and materials?</h2>
<p>A <strong>fixed price</strong> works well for a clearly defined MVP: you know the cost up front, and the scope is agreed in writing. <strong>Time and materials</strong>, or a dedicated team billed monthly, suits products that are evolving quickly, where locking scope would slow you down. Many products start with a fixed-price MVP and move to a monthly team after launch.</p>
`,
  },
];

export const postBySlug = Object.fromEntries(posts.map((p) => [p.slug, p]));
