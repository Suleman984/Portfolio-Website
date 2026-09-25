// data/index.ts — Single source of truth for all portfolio data.
// Wording tracks the CVs in /public/cv; keep the two in step.

export interface Project {
  id: number;
  title: string;
  tag: string;
  desc: string;
  tech: string[];
  highlights: string[];
  liveUrl: string;
  githubUrl: string;
  /**
   * selected — full entry on the Projects page, with `cv` bullets.
   * client   — delivered inside a role; linked from the Experience entry.
   * archive  — one line in the "Also built" index.
   */
  kind: "selected" | "client" | "archive";
  /** Résumé-length bullets, shown on the page. `highlights` go in the case sheet. */
  cv?: string[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  /** Ids of `client` projects delivered in this role. */
  projects?: number[];
}

export const PERSONAL = {
  name: "Muhammad Suleman",
  role: "Software Engineer",
  email: "sulemanefc@gmail.com",
  phone: "+92-336-058-9167",
  location: "Islamabad, Pakistan",
  linkedin: "https://linkedin.com/in/muhammad-suleman-55bb8020a",
  github: "https://github.com/Suleman984",
};

/** The summary is split so the highlighter can mark the phrases in `mark`. */
export const SUMMARY: { text: string; mark?: boolean }[] = [
  { text: "Frontend-focused Software Engineer building production interfaces in " },
  { text: "React, Next.js and TypeScript", mark: true },
  { text: ", with Material UI and clean, component-driven architecture. Works across the stack on " },
  { text: "Node.js and Go services", mark: true },
  { text: " backed by PostgreSQL, MySQL and Redis, with a working knowledge of Python and FastAPI. Has integrated " },
  { text: "third-party APIs and payment gateways", mark: true },
  { text: " into live products, and owns features end to end, from requirements and schema design through to deployment." },
];

export const CVS = [
  { label: "Software Engineer", href: "/cv/muhammad-suleman-software-engineer-cv.pdf" },
  { label: "Full Stack Developer", href: "/cv/muhammad-suleman-fullstack-developer-cv.pdf" },
  { label: "Frontend Developer", href: "/cv/muhammad-suleman-frontend-developer-cv.pdf" },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "RAAHI — AI Emergency & Family Safety Platform",
    tag: "Mobile · Health-Safety",
    desc: "A Pakistan-first personal emergency system: a React Native app built for elderly and vulnerable users with a one-press SOS, paired with a Next.js dashboard for the family member abroad. An SOS opens a tiered escalation wave across push, SMS and voice calls with per-channel delivery confirmation, and a server-side watchdog escalates rather than failing silently.",
    tech: ["TypeScript", "Expo / React Native", "Next.js", "Supabase", "Deno", "Whisper + Claude", "Turborepo"],
    highlights: [
      "Tiered escalation engine with exactly-once wave semantics enforced by a DB constraint, delivery-confirmation webhooks, and a watchdog that detects expired SMS and escalates",
      "Voice triage pipeline: audio → Whisper transcription → schema-constrained Claude classification, server-validated so the model can only raise urgency, never lower it or gate dispatch",
      "Lock-screen SOS guard — power-button ×4 gesture, lock-screen action without unlock, Urdu wake-phrase recognition, and an OEM-specific battery-optimisation setup wizard",
      "Care circle with contact invites, live presence map, daily check-ins with missed-check-in sweeps, and medication reminders",
      "Full English/Urdu i18n, offline HMAC-signed SMS payloads with replay protection, and GDPR-grade account deletion flows",
      "152 commits · 30 Supabase edge functions · 34 sequential migrations · 154 unit tests",
    ],
    liveUrl: "https://raahi-dashboard.vercel.app",
    githubUrl: "https://github.com/Suleman984/RAAHI",
    kind: "selected",
    cv: [
      "Turborepo monorepo pairing an Expo app for elderly users with a Next.js dashboard for family abroad, over a shared Supabase Postgres schema, versioned SQL migrations and CI",
      "Built the alerting pipeline on Supabase Edge Functions: Whisper transcription, Claude triage constrained to a fixed JSON schema, and simultaneous Expo Push with Twilio SMS/voice fallback for low-connectivity areas",
    ],
  },
  {
    id: 2,
    title: "VulnScope — Security Vulnerability Scanner",
    tag: "Security · DevSecOps",
    desc: "A multi-engine security scanner that analyses a codebase for insecure code patterns, vulnerable dependencies, leaked secrets and container misconfigurations. It ships as a CLI, a FastAPI REST API and a web dashboard — plus the surrounding SaaS platform: multi-tenant orgs with RBAC, SSO, billing, signed webhooks and a Celery job queue.",
    tech: ["Python", "FastAPI", "SQLAlchemy + Alembic", "Celery + Redis", "PostgreSQL", "Stripe", "Docker"],
    highlights: [
      "Four independent scan engines — SAST, dependency scanning against the live OSV.dev API, entropy-based secret detection, and Docker/K8s misconfig — with project-type auto-detection and finding deduplication",
      "Full multi-tenancy: organisations, memberships, RBAC, SAML/OIDC SSO, MFA, login lockout and an exportable audit log",
      "Stripe-backed billing with real checkout sessions, billing portal, signature-verified webhooks and usage metering",
      "Webhook delivery subsystem with retries and per-delivery status tracking, plus Slack OAuth and Jira/GitHub Issues sync",
      "SARIF export, keyset cursor pagination, triage workflow with comments, risk scoring, and Prometheus metrics with Sentry",
      "~30k lines of Python · 37 API route modules · 20 migrations · 339 tests",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/Suleman984/vulnScope",
    kind: "selected",
    cv: [
      "Scanner combining four engines: SAST over insecure code patterns, dependency CVE lookup against the OSV.dev database, entropy-based secret detection, and Docker/Kubernetes misconfiguration checks",
      "Shipped one codebase as a Typer CLI, a FastAPI service and a web dashboard, with a watch mode that re-scans on file change and alerts only on findings that are new",
      "Packaged for CI: multi-stage non-root Docker image, a GitHub Actions workflow that fails the build above a severity threshold, and 30+ unit tests under pytest",
    ],
  },
  {
    id: 3,
    title: "Niche Scout — Product Sourcing & Market Research",
    tag: "Data Pipeline · Next.js",
    desc: "Scrapes Chinese wholesale marketplaces for products in a niche, computes each item's true landed cost into Pakistan (FX, freight per kg, duty, sales tax, clearing amortised over MOQ), then verifies on Daraz that the product actually sells locally and at what price before scoring saturation, demand and margin into a 0–100 opportunity score. Verdicts are deterministic in code — the LLM only normalises titles and writes the explanation afterwards.",
    tech: ["Next.js", "TypeScript", "Supabase", "Cheerio", "Playwright", "Anthropic SDK", "ExcelJS", "Zod"],
    highlights: [
      "Resumable state-machine orchestrator that checkpoints its cursor after every product, returns before Vercel's 300s cap, and is resumed by a cron sweep — or run uncapped in a Docker worker",
      "Pluggable per-source fetch strategy (direct / proxy / Playwright) with per-host throttling and anti-bot detection that raises an error instead of silently returning zero results",
      "Availability verification reads back every local listing and keeps only titles matching at 60% word coverage — the difference between a measured price and a guessed one",
      "Deterministic scoring module with exported weights, consumed by a live criteria page so documented thresholds can't drift from the ones the pipeline runs",
      "Learning memory for keyword exclusions, single-URL lookup mode, and per-niche five-sheet Excel export to signed-URL storage",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/Suleman984/niche-scout",
    kind: "selected",
    cv: [
      "Scrapes wholesale marketplaces with Playwright and computes landed cost across FX, freight, duty, tax and clearing before scoring products against measured local demand and market saturation",
      "Kept scoring deterministic and testable in TypeScript, using the model only to explain a computed verdict; a background worker runs crawls with bounded concurrency and exports an Excel workbook per run",
    ],
  },
  {
    id: 4,
    title: "Suppway — Multi-Tenant Commerce & Funnel Engine",
    tag: "Ecommerce SaaS",
    desc: "A multi-store ecommerce platform for gym supplements and equipment, with a themeable storefront, role-based admin dashboard, and a funnel engine for upsells, downsells and order bumps. Stores resolve per-request from a URL prefix that middleware rewrites away, with tenant scoping across every table. Catalog, orders, returns, discounts, loyalty and analytics are implemented; card processing is still in progress.",
    tech: ["Next.js", "TypeScript", "Supabase", "Stripe SDK", "Zod", "Tailwind CSS", "Resend"],
    highlights: [
      "Funnel engine modelling a directed graph of steps with accept/decline branching, condition rules, and a JSONB context pipe carrying cart and attribution data through a tracked session",
      "Full RBAC — a permission catalog, five seeded system roles and cloneable custom roles, enforced through a single gate on every admin surface",
      "Multi-tenancy retrofitted across ~20 tables, with store resolution in middleware and a composite tenant/user staff key",
      "Five-theme system emitting scoped HSL CSS variables server-side — no client JS and no flash of unthemed content",
      "Guest checkout with rate-limited email OTP and auto-linking of orphan guest orders on first account visit",
      "176 source files · ~22k LOC · 14 migrations · 21 admin pages",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/Suleman984/suppway",
    kind: "selected",
    cv: [
      "Funnel engine modelling upsells, downsells and order bumps as a directed graph of steps with accept/decline branching and a JSONB context carrying cart and attribution data",
      "Multi-tenancy retrofitted across ~20 tables with store resolution in middleware, plus a permission catalog and cloneable custom roles enforced through a single admin gate",
    ],
  },
  {
    id: 5,
    title: "Rahva Raamat",
    tag: "E-commerce · Codbeyon",
    desc: "Redesigned and optimised the UI/UX of Rahva Raamat, a large-scale Estonian e-commerce book platform. The work focused on accessibility, page performance and component reusability, collaborating with cross-functional teams to ship new features continuously.",
    tech: ["React", "Next.js", "TypeScript", "SCSS", "Tailwind CSS", "REST APIs", "Storybook"],
    highlights: [
      "Redesigned core shopping flows — product listing, search, cart and checkout — for improved UX",
      "Built a shared component library in Storybook for consistent design across the platform",
      "Improved Lighthouse performance scores by optimising images and reducing layout shifts",
      "Collaborated with back-end teams to integrate new product and user-management APIs",
      "Ensured WCAG accessibility compliance across all redesigned components",
    ],
    liveUrl: "https://www.rahvaraamat.ee/",
    githubUrl: "",
    kind: "client",
  },
  {
    id: 6,
    title: "Low Hanging Leads",
    tag: "Lead Gen · Codbeyon",
    desc: "A production B2B lead generation platform built at Codbeyon. The system automates prospect discovery, scoring and outreach workflows — cutting hours of manual SDR work down to minutes — and handles large data volumes behind a clean, responsive dashboard.",
    tech: ["React", "Next.js", "TypeScript", "REST APIs", "PostgreSQL", "Supabase", "Node.js"],
    highlights: [
      "Built end-to-end from requirements to deployment as part of the Codbeyon engineering team",
      "Developed a real-time lead scoring dashboard with filtering, sorting and export",
      "Integrated third-party data enrichment APIs to auto-fill prospect details",
      "Implemented role-based auth and team workspaces for multi-user access",
      "Optimised API calls with caching to handle high-frequency lead data refreshes",
    ],
    liveUrl: "#",
    githubUrl: "",
    kind: "client",
  },
  {
    id: 7,
    title: "MatchGate — ATS System",
    tag: "ATS Platform",
    desc: "A fully transparent Applicant Tracking System built to replace opaque, noisy CV-review cycles. A custom rules-based matching engine scores candidates 0–100% on skills, experience and role requirements — no LLM black boxes, complete explainability.",
    tech: ["Next.js", "Golang", "PostgreSQL", "Supabase", "JWT"],
    highlights: [
      "Designed a rules-based matching engine scoring candidates 0–100% with a fully auditable trail",
      "Built the Go + PostgreSQL backend with RESTful APIs and JWT authentication",
      "Created a Next.js frontend with an embeddable hiring panel via iframe for client portals",
      "Implemented Supabase storage for CV uploads and candidate document management",
      "Zero dependency on LLMs — all matching logic is deterministic and reproducible",
    ],
    liveUrl: "#",
    githubUrl: "",
    kind: "selected",
    cv: [
      "End-to-end transparent ATS: Go + PostgreSQL backend, Next.js frontend, JWT auth, Supabase storage and an embeddable hiring panel served over iframe",
      "Designed a deterministic rules-based matching engine scoring candidates 0–100% on skills, experience and role fit, explicitly avoiding LLM black-box scoring",
    ],
  },
  {
    id: 8,
    title: "PSX Bot — AI Stock Analysis System",
    tag: "FinTech · Simulation",
    desc: "A monorepo analysis system for the Pakistan Stock Exchange with a FastAPI backend, Next.js dashboard and Expo mobile app. It pulls PSX prices, crawls Pakistani financial news for sentiment, tracks institutional shareholder movements, and feeds all of it into a Claude prompt that returns a BUY/SELL/HOLD decision with reasoning. Trading is simulation-only — there is no broker execution path by design.",
    tech: ["FastAPI", "Python", "Celery + Redis", "Supabase", "Anthropic Claude", "yfinance + pandas", "Next.js", "Expo"],
    highlights: [
      "Multi-signal decision engine combining price history, 24h news sentiment, shareholder pressure, risk limits and past-performance context into one structured prompt",
      "Self-learning loop that re-scores past decisions against realised price movement and injects that track record back into future prompts",
      "Permission system where every risky capability is off by default and leaving simulation mode is gated behind an explicit confirmation",
      "RSS news crawler with sentiment scoring and a shareholder-tracking service, both on Celery schedules",
      "13-page dashboard, Expo app with push notifications and secure token storage, pytest suites and GitHub Actions CI",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/Suleman984/PSX-Bot",
    kind: "selected",
    cv: [
      "Monorepo with a FastAPI backend, Next.js dashboard and Expo app that combines PSX prices, news sentiment and shareholder movements into a structured BUY/SELL/HOLD decision",
      "Self-learning loop re-scores past decisions against realised price movement; simulation-only by design, with every risky capability off by default",
    ],
  },

  {
    id: 9,
    title: "Roast & Rise — Scroll-Driven 3D Site",
    tag: "WebGL · Marketing Site",
    desc: "A single-page scroll narrative for a specialty coffee roastery. One fixed canvas renders procedurally generated coffee beans and a custom additive-point steam shader — no model files and no HDRI download. Scroll position is written to a mutable object read by the render loop, so scrolling never triggers a React re-render.",
    tech: ["Next.js", "TypeScript", "three.js", "React Three Fiber", "GSAP ScrollTrigger", "Lenis", "Tailwind CSS"],
    highlights: [
      "Three-tier capability system resolved once per session that scales bean count, particle count and DPR — falling back to an authored SVG poster with no canvas on low-end or reduced-motion clients",
      "Render loop halts when the tab is hidden or the canvas leaves the scene; WebGL context loss swaps in the poster",
      "Progressive enhancement enforced codebase-wide: every element is in its final state in CSS and JS only sets from-states, so the site is navigable with JavaScript off",
      "Contact Server Action with server-side validation, per-IP rate limiting and a honeypot",
      "CSP, HSTS, COOP, frame-denial and subresource-integrity pinning, with self-hosted fonts so there are zero third-party requests",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/Suleman984/roast-and-rise",
    kind: "archive",
  },
  {
    id: 10,
    title: "Occasio — Event Services Marketplace",
    tag: "Marketplace · In Progress",
    desc: "A two-sided marketplace connecting customers with cake makers, decorators and event agencies in Pakistan. One Next.js app serves three role-guarded surfaces via route groups — customer storefront, vendor CMS and admin console — over Supabase, with row-level security as the actual boundary rather than a UI convention.",
    tech: ["TypeScript", "Next.js 16", "React 19", "Supabase", "Tailwind CSS v4", "Turborepo"],
    highlights: [
      "Three surfaces in one app as route groups, gated by both middleware and Postgres RLS policies",
      "Complete booking state machine — request, accept/reject, mark done, acknowledge, upload payment proof, confirm receipt — with per-booking chat and reviews",
      "Vendor CMS with OTP sign-in, business onboarding, services and packages CRUD, portfolio upload and an availability calendar",
      "A docs system enforced by CI: the build fails when a code reference lacks a registry entry",
      "Still in progress — settlement is manual proof-based review and no payment gateway is integrated yet",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/Suleman984/occasio",
    kind: "archive",
  },
  {
    id: 11,
    title: "PriceControl Pakistan",
    tag: "Civic Data Platform",
    desc: "A crowdsourced price-monitoring system for essential commodities across 20 Pakistani cities. Citizens submit market prices with receipt photos; the app compares them against official reference prices, flags overpricing by severity, and surfaces the gap on a dashboard, a choropleth map and a filterable history table.",
    tech: ["Vanilla JS (ES modules)", "Vite", "Supabase", "Deno Edge Functions", "Chart.js", "Leaflet", "PWA"],
    highlights: [
      "RLS-backed staff/admin auth with a per-permission gate over a staff profiles table",
      "Live dashboard driven by Supabase Realtime subscriptions, plus a national price index and per-city trend and comparison charts",
      "Leaflet map colouring each city by how far its market prices sit above the official reference",
      "A Deno edge function that computes overpriced products server-side and emails the responsible city monitor over SMTP",
      "Full English/Urdu i18n, dark mode, and an offline PWA shell with network-first caching",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/ha602/Price-Control-Pakistan",
    kind: "archive",
  },
  {
    id: 12,
    title: "Diagnostic Center Management System",
    tag: "Healthcare · Solo · Production",
    desc: "A live clinical platform in daily production use, built solo over nine months: POS, patient records, inventory, membership, refunds and configurable reporting for a diagnostic centre, on Next.js 16 and Supabase Postgres with access rules enforced in the database rather than the client.",
    tech: ["Next.js 16", "TypeScript", "Supabase", "PostgreSQL", "Row-Level Security"],
    highlights: [
      "38-table Postgres schema with 25+ database functions and row-level security policies",
      "Two-layer authorisation: per-user permission grants override role defaults, evaluated through SECURITY DEFINER access functions",
      "POS with tiered pricing policies and four payment rails",
      "Refunds with membership-point reversal, and inventory batch and expiry tracking with stock movements",
      "Audit and report-access logging across the platform",
    ],
    liveUrl: "#",
    githubUrl: "",
    kind: "selected",
    cv: [
      "Sole developer, over 9 months of active development, of a live clinical platform: a 38-table Postgres schema, 25+ database functions and row-level security policies that enforce access in the database rather than the client",
      "Designed a two-layer authorisation model in which per-user permission grants override role defaults, evaluated through SECURITY DEFINER access functions so the rules hold whichever client calls them",
      "Built the transactional core — POS with tiered pricing policies and four payment rails, refunds with membership-point reversal, inventory batch and expiry tracking with stock movements, and audit plus report-access logging",
    ],
  },
  {
    id: 13,
    title: "ZenVolt — Commerce Platform with RBAC Admin",
    tag: "Next.js + Go · In Progress",
    desc: "An npm-workspaces monorepo splitting a public storefront and an internal admin portal into separate surfaces on shared routing, with hostname-based subdomain redirects in middleware. The substantial work is the internal side: Supabase-backed employee auth, a database-driven permission model, and an invite → provision → suspend employee lifecycle.",
    tech: ["Next.js 16", "TypeScript", "Supabase", "Go + chi", "Tailwind CSS v4", "TanStack Query", "Vitest + Playwright"],
    highlights: [
      "Employee invitation and lifecycle API with server-side authorisation and phone-ready provisioning",
      "Permission grants stored in Postgres and loaded per session, with migrations covering the authorisation foundation and role seeds",
      "Storefront/admin surface separation enforced in middleware on hostname and pathname",
      "Generic admin module shell — data table, filter bar, detail panel, form sections — driving ten module routes",
      "In progress: the commerce path (catalog, cart, checkout, payments) and the Go API are not built out yet",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/Suleman984/zenVolt",
    kind: "archive",
  },
  {
    id: 14,
    title: "LinkedIn Lead Generator Extension",
    tag: "Chrome Extension",
    desc: "A Chrome extension that reads lead data directly from LinkedIn profiles and search pages, then exports the structured result as a formatted Excel file — eliminating manual copy-paste prospecting.",
    tech: ["JavaScript", "Chrome Extension API (MV3)", "SheetJS", "HTML", "CSS", "DOM Manipulation"],
    highlights: [
      "Manifest V3 extension reading LinkedIn DOM data in real time",
      "Structures scraped data — name, title, company, email, profile URL — into clean rows",
      "SheetJS integration generating and downloading formatted Excel files instantly",
      "Field selection so users choose exactly which data points to extract",
      "Handles paginated results and bulk multi-profile extraction",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/Suleman984/Link2Leads",
    kind: "archive",
  },
  {
    id: 15,
    title: "Hisaab — Urdu/English Shop Ledger",
    tag: "React Native · State Study",
    desc: "An Expo app for small Pakistani shopkeepers to log daily sales, expenses and customer credit (udhar), with reports and a bilingual Roman-Urdu assistant. State lives entirely in one Zustand store using immer, devtools and AsyncStorage persistence, exposed through fine-grained slice hooks and computed selectors — built as a Context-to-Zustand refactor case study.",
    tech: ["React Native", "Expo", "TypeScript", "Zustand + immer", "AsyncStorage", "React Navigation", "date-fns"],
    highlights: [
      "Single-store architecture with an immer/devtools/persist middleware stack and per-slice subscription hooks that avoid whole-tree re-renders",
      "Customer credit ledger with balance-adjustment logic handling receive/pay type flipping",
      "Computed selectors for day stats and period-filtered transaction lists",
      "Offline-first — all transactions and customers auto-persist locally, no network required",
      "Bilingual chat screen with a local intent parser that adds transactions and answers balance and report queries from the store",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/Suleman984/Hisaab",
    kind: "archive",
  },
  {
    id: 16,
    title: "Optimize E-Commerce Through Social Analytics",
    tag: "Final Year Project",
    desc: "A final year project designed to boost e-commerce sales by harnessing social media analytics, machine learning models and automated web scraping. The system collects product sentiment data from social platforms and translates it into actionable recommendations for store owners.",
    tech: ["React", "Node.js", "MongoDB", "Firebase", "Python", "Machine Learning", "Web Scraping"],
    highlights: [
      "Built a real-time social sentiment analysis pipeline using Python and NLP techniques",
      "Developed a React dashboard surfacing product trend data and revenue insights",
      "Automated web scraping of major platforms to feed the ML recommendation engine",
      "Integrated Firebase for real-time sync and MongoDB for structured storage",
      "Achieved measurable improvement in product discoverability scores during testing",
    ],
    liveUrl: "#",
    githubUrl: "",
    kind: "archive",
  },
  {
    id: 17,
    title: "Data Analysis Using Python",
    tag: "Data Science",
    desc: "An end-to-end data analysis project on a retail dataset — from raw data cleaning through exploration, statistical analysis and visualisation — delivering business intelligence insights using Python's core data science stack.",
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter Notebook", "NumPy"],
    highlights: [
      "Cleaned and preprocessed raw shop data — missing values, outliers and type issues",
      "Exploratory analysis uncovering sales trends and seasonal patterns",
      "Visualisations (bar charts, heatmaps, time-series plots) for key business metrics",
      "Insights on top-selling products, peak hours and revenue distribution",
      "Documented the full analysis in a structured notebook with commentary",
    ],
    liveUrl: "#",
    githubUrl: "",
    kind: "archive",
  },
  {
    id: 18,
    title: "Bus Management System",
    tag: "C++ · Systems",
    desc: "A C++ console-based bus reservation system implementing seat booking, cancellation and admin management workflows, using file-based persistence to maintain reservation data across sessions without a database.",
    tech: ["C++", "File I/O", "OOP", "Data Structures", "Algorithms"],
    highlights: [
      "OOP architecture with classes for Bus, Passenger, Booking and Admin",
      "Seat availability engine with real-time conflict detection for concurrent bookings",
      "File-based persistence — all booking records survive application restarts",
      "Admin panel with full CRUD: add/remove routes, view bookings, generate reports",
      "Input validation and error handling throughout all interaction flows",
    ],
    liveUrl: "#",
    githubUrl: "",
    kind: "archive",
  },
  {
    id: 19,
    title: "Screenshot Bot — Page Capture & Uptime Monitor",
    tag: "Node.js · Monitoring",
    desc: "A Node CLI that drives headless Chromium to capture a rotating list of pages on a configurable interval, flags any page that fails to load inside its timeout, and serves a live dashboard over the capture history.",
    tech: ["Node.js", "Playwright"],
    highlights: [
      "Headless Chromium captures on a configurable interval over a rotating page list",
      "Per-page load timeout that flags failures instead of hanging the run",
      "Live dashboard over the full capture history",
    ],
    liveUrl: "#",
    githubUrl: "",
    kind: "selected",
    cv: [
      "Node CLI driving headless Chromium to capture a rotating list of pages on a configurable interval, flagging any page that fails to load inside its timeout, with a live dashboard over the capture history",
    ],
  },
];

const byOrder = (ids: number[]) => ids.map((id) => PROJECTS.find((p) => p.id === id)!);

/** Résumé order, as on the CV. */
export const SELECTED_PROJECTS = byOrder([2, 1, 7, 3, 12, 4, 8, 19]);
export const ARCHIVE_PROJECTS = PROJECTS.filter((p) => p.kind === "archive");

export const EXPERIENCES: Experience[] = [
  {
    role: "Software Engineer",
    company: "Codbeyon",
    location: "Islamabad",
    period: "Jun 2025 – Present",
    bullets: [
      "Ship production web applications across 5+ client products in React, Next.js, TypeScript and Go, owning work from requirements through deployment",
      "Sole developer of a Diagnostic Center Management System in daily production use — Next.js 16 and Supabase Postgres — covering POS, patient records, inventory, membership, refunds and configurable reporting",
      "Integrate third-party APIs into production applications, directly improving functionality and performance",
    ],
    projects: [12, 5, 6],
  },
  {
    role: "Solution Engineer",
    company: "Phebsoft",
    location: "Islamabad",
    period: "Nov 2024 – Mar 2025",
    bullets: [
      "Built and deployed 20+ automated integrations across QuickBooks, Shopify, WooCommerce, Xero, HubSpot and Salesforce using the Versori automation platform",
      "Designed event-driven workflows connecting disparate systems, strengthening cross-platform API and data-contract knowledge later applied to backend and frontend integration work",
    ],
  },
  {
    role: "Web Developer",
    company: "Bitsol Technologies",
    location: "Islamabad",
    period: "Aug 2023 – Sep 2023",
    bullets: [
      "Built scalable front-end applications using React.js, TypeScript, Material UI and Storybook",
      "Improved UI responsiveness and user experience through clean, component-based architecture",
    ],
  },
];

export const STATS = [
  { value: 2, suffix: "+", label: "years shipping in production" },
  { value: 5, suffix: "+", label: "client products at Codbeyon" },
  { value: 20, suffix: "+", label: "integrations deployed" },
  { value: PROJECTS.length, suffix: "", label: "projects built" },
];

export const SKILLS: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Golang", "SQL", "HTML5", "CSS3", "Python (basic)"] },
  { label: "Backend & APIs", items: ["Node.js", "Golang", "Express", "REST", "GraphQL", "JWT authentication", "Event-driven workflows", "Background workers", "FastAPI (basic)"] },
  { label: "Databases", items: ["PostgreSQL", "MySQL", "Redis", "Supabase (Edge Functions & RLS)", "SQLAlchemy/Alembic", "Firebase", "MongoDB"] },
  { label: "Frontend", items: ["React", "Next.js (App Router, Server Actions)", "React Native", "Expo", "Capacitor", "PWA (Serwist)"] },
  { label: "State", items: ["Redux Toolkit", "Zustand", "React Context API"] },
  { label: "Testing & Quality", items: ["Jest", "React Testing Library", "Playwright", "pytest", "ESLint", "TypeScript strict mode"] },
  { label: "DevOps & Tooling", items: ["Docker (multi-stage, non-root)", "GitHub Actions CI", "Turborepo", "pnpm workspaces", "Vercel", "Git", "Postman"] },
  { label: "Auth & Security", items: ["NextAuth", "JWT", "scrypt/bcrypt", "Zod validation", "Role-based access control", "SAST/SCA scanning"] },
  { label: "Payments & Integrations", items: ["Stripe", "JazzCash/EasyPaisa", "Versori", "n8n", "Webhooks", "QuickBooks", "Shopify", "WooCommerce", "Xero", "HubSpot", "Salesforce"] },
  { label: "Styling & UI", items: ["Tailwind CSS", "SCSS/SASS", "Material UI", "Framer Motion", "GSAP", "three.js", "Storybook"] },
  { label: "AI-Assisted Dev", items: ["Cursor", "Claude (tool use & MCP)", "MCP servers", "Custom agent skills"] },
];

export const EDUCATION = {
  degree: "BS Computer Science",
  school: "Institute of Space & Technology, Islamabad",
  period: "Sep 2020 – Feb 2024",
  gpa: "3.1 / 4.0",
};

export const ACHIEVEMENTS = [
  { title: "1st Place — Speed Programming Competition", where: "IST", year: "2022" },
  { title: "2nd Place — University Quiz Competition", where: "IST", year: "2022" },
  { title: "Certified — MERN Stack", where: "SimpliLearn", year: "" },
];
