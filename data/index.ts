// data/index.ts — Single source of truth for all portfolio data

export interface Project {
  id: number;
  title: string;
  tag: string;
  img: string | null;
  emoji: string;
  imgBg: string;
  desc: string;
  tech: string[];
  highlights: string[];
  liveUrl: string;
  githubUrl: string;
  /** Featured projects ride the horizontal rail; the rest go in the archive index. */
  featured?: boolean;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  type: "cur" | "prev" | "intern";
  icon: string;
  bullets: string[];
  tags: string[];
}

export interface Skill {
  label: string;
  tip?: string;
}

export const PERSONAL = {
  name: "Muhammad Suleman",
  role: "Full Stack Developer",
  email: "sulemanefc@gmail.com",
  phone: "+92-336-058-9167",
  location: "Islamabad, Pakistan",
  linkedin: "https://linkedin.com/in/muhammad-suleman-55bb8020a",
  github: "https://github.com/Suleman984",
  gpa: "3.1 / 4.0",
  university: "Institute of Space and Technology",
  degree: "BS Computer Science",
  gradYear: "Sep 2020 – Feb 2024",
  roles: [
    "Full Stack Developer",
    "React Specialist",
    "Next.js Engineer",
    "Golang Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
  ],
};

const BG = {
  violet: "linear-gradient(135deg,#171233,#241a4d)",
  indigo: "linear-gradient(135deg,#111633,#1b2350)",
  cyan: "linear-gradient(135deg,#0b1f2b,#123544)",
  slate: "linear-gradient(135deg,#12141f,#1c2033)",
  plum: "linear-gradient(135deg,#1f1030,#301a49)",
  teal: "linear-gradient(135deg,#0c1f22,#123a36)",
  amber: "linear-gradient(135deg,#251a10,#3a2a17)",
  rose: "linear-gradient(135deg,#26121f,#3d1d31)",
};

export const PROJECTS: Project[] = [
  // ── Featured — these ride the horizontal rail ─────────────────────
  {
    id: 1,
    title: "RAAHI — AI Emergency & Family Safety Platform",
    tag: "Mobile · Health-Safety",
    img: null,
    emoji: "🚨",
    imgBg: BG.rose,
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
    featured: true,
  },
  {
    id: 2,
    title: "VulnScope — Security Vulnerability Scanner",
    tag: "Security · DevSecOps",
    img: null,
    emoji: "🛡️",
    imgBg: BG.violet,
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
    featured: true,
  },
  {
    id: 3,
    title: "Niche Scout — Product Sourcing & Market Research",
    tag: "Data Pipeline · Next.js",
    img: null,
    emoji: "🧭",
    imgBg: BG.teal,
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
    featured: true,
  },
  {
    id: 4,
    title: "Suppway — Multi-Tenant Commerce & Funnel Engine",
    tag: "Ecommerce SaaS",
    img: null,
    emoji: "🏋️",
    imgBg: BG.indigo,
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
    featured: true,
  },
  {
    id: 5,
    title: "Rahva Raamat",
    tag: "E-commerce · Codbeyon",
    img: null,
    emoji: "📚",
    imgBg: BG.cyan,
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
    featured: true,
  },
  {
    id: 6,
    title: "Low Hanging Leads",
    tag: "Lead Gen · Codbeyon",
    img: null,
    emoji: "🎯",
    imgBg: BG.slate,
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
    featured: true,
  },
  {
    id: 7,
    title: "MatchGate — ATS System",
    tag: "ATS Platform",
    img: null,
    emoji: "🔍",
    imgBg: BG.plum,
    desc: "A fully transparent Applicant Tracking System built to replace opaque, noisy CV-review cycles. A custom rules-based matching engine scores candidates 0–100% on skills, experience and role requirements — no LLM black boxes, complete explainability.",
    tech: ["Next.js", "Golang", "PostgreSQL", "Supabase", "JWT", "REST APIs", "TypeScript"],
    highlights: [
      "Designed a rules-based matching engine scoring candidates 0–100% with a fully auditable trail",
      "Built the Go + PostgreSQL backend with RESTful APIs and JWT authentication",
      "Created a Next.js frontend with an embeddable hiring panel via iframe for client portals",
      "Implemented Supabase storage for CV uploads and candidate document management",
      "Zero dependency on LLMs — all matching logic is deterministic and reproducible",
    ],
    liveUrl: "#",
    githubUrl: "",
    featured: true,
  },
  {
    id: 8,
    title: "PSX Bot — AI Stock Analysis System",
    tag: "FinTech · Simulation",
    img: null,
    emoji: "📈",
    imgBg: BG.amber,
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
    featured: true,
  },

  // ── Archive — compact index under the rail ────────────────────────
  {
    id: 9,
    title: "Roast & Rise — Scroll-Driven 3D Site",
    tag: "WebGL · Marketing Site",
    img: null,
    emoji: "☕",
    imgBg: BG.amber,
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
  },
  {
    id: 10,
    title: "Occasio — Event Services Marketplace",
    tag: "Marketplace · In Progress",
    img: null,
    emoji: "🎪",
    imgBg: BG.plum,
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
  },
  {
    id: 11,
    title: "PriceControl Pakistan",
    tag: "Civic Data Platform",
    img: null,
    emoji: "🏷️",
    imgBg: BG.teal,
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
  },
  {
    id: 12,
    title: "Diagnostic Center Management System",
    tag: "Healthcare · Full-Stack",
    img: null,
    emoji: "🏥",
    imgBg: BG.cyan,
    desc: "A full-stack web application centralising diagnostic centre operations into a single dashboard — POS billing, patient management, test and service catalogue, inventory tracking, and configurable reporting.",
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "REST APIs", "Chart.js"],
    highlights: [
      "Unified POS billing handling tests, packages and custom service pricing",
      "Patient record management with searchable history and result tracking",
      "Inventory module with low-stock alerts and supplier management",
      "Analytics dashboards with filterable reports and exportable data",
      "Persistent state across multi-step workflows and page reloads",
    ],
    liveUrl: "#",
    githubUrl: "",
  },
  {
    id: 13,
    title: "ZenVolt — Commerce Platform with RBAC Admin",
    tag: "Next.js + Go · In Progress",
    img: null,
    emoji: "⚡",
    imgBg: BG.indigo,
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
  },
  {
    id: 14,
    title: "LinkedIn Lead Generator Extension",
    tag: "Chrome Extension",
    img: null,
    emoji: "🔌",
    imgBg: BG.slate,
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
  },
  {
    id: 15,
    title: "Hisaab — Urdu/English Shop Ledger",
    tag: "React Native · State Study",
    img: null,
    emoji: "🧾",
    imgBg: BG.rose,
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
  },
  {
    id: 16,
    title: "Optimize E-Commerce Through Social Analytics",
    tag: "Final Year Project",
    img: null,
    emoji: "🛒",
    imgBg: BG.violet,
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
  },
  {
    id: 17,
    title: "Data Analysis Using Python",
    tag: "Data Science",
    img: null,
    emoji: "📊",
    imgBg: BG.teal,
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
  },
  {
    id: 18,
    title: "Bus Management System",
    tag: "C++ · Systems",
    img: null,
    emoji: "🚌",
    imgBg: BG.amber,
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
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
export const ARCHIVE_PROJECTS = PROJECTS.filter((p) => !p.featured);

export const EXPERIENCES: Experience[] = [
  {
    role: "Software Engineer",
    company: "Codbeyon",
    period: "June 2025 – Present",
    type: "cur",
    icon: "⚡",
    bullets: [
      "Delivering end-to-end solutions for multiple production-level projects, managing full SDLC from requirements to deployment",
      "Developed responsive and scalable web applications using React, Next.js, and TypeScript with optimized UI components",
      "Integrated third-party APIs to improve functionality, performance, and user experience",
      "Leading Rahva Raamat, Low Hanging Leads, and 3+ more active projects",
    ],
    tags: ["React", "Next.js", "TypeScript", "REST APIs", "Full SDLC"],
  },
  {
    role: "Solution Engineer",
    company: "Phebsoft",
    period: "Nov 2024 – Mar 2025",
    type: "prev",
    icon: "🔧",
    bullets: [
      "Developed and implemented automated integrations to streamline workflows using Versori Automation Tool",
      "Collaborated with cross-functional teams to optimize system connectivity and performance",
      "Designed scalable software solutions for diverse client requirements",
    ],
    tags: [
      "Versori",
      "Workflow Automation",
      "API Integration",
      "System Design",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Bitsol Technologies",
    period: "Aug 2023 – Sep 2023",
    type: "intern",
    icon: "🌐",
    bullets: [
      "Built scalable front-end applications using React.js, TypeScript, Material UI, and Storybook",
      "Improved responsive UI design and user experience through clean, component-based architecture",
    ],
    tags: ["React.js", "TypeScript", "Material UI", "Storybook", "Kotlin"],
  },
];

export const SKILLS: Record<string, Skill[]> = {
  frontend: [
    { label: "React.js", tip: "UI library" },
    { label: "Next.js", tip: "Full-stack framework" },
    { label: "TypeScript", tip: "Type-safe JS" },
    { label: "React Native", tip: "Cross-platform mobile" },
    { label: "Tailwind CSS", tip: "Utility-first CSS" },
    { label: "Motion", tip: "Animation library" },
    { label: "Redux Toolkit", tip: "State management" },
    { label: "Zustand", tip: "Lightweight state" },
    { label: "SCSS", tip: "CSS preprocessor" },
    { label: "Material UI", tip: "Component library" },
    { label: "Storybook", tip: "Component docs" },
  ],
  backend: [
    { label: "Node.js", tip: "Server runtime" },
    { label: "Golang", tip: "Systems & APIs" },
    { label: "FastAPI", tip: "Python web framework" },
    { label: "Celery + Redis", tip: "Background job queues" },
    { label: "GraphQL", tip: "Query language for APIs" },
    { label: "REST APIs", tip: "HTTP API design" },
    { label: "JWT Auth", tip: "Token authentication" },
    { label: "Versori Automation", tip: "Workflow tool" },
  ],
  database: [
    { label: "PostgreSQL", tip: "Relational DB" },
    { label: "Supabase", tip: "Postgres + Auth + RLS" },
    { label: "Row-Level Security", tip: "DB-enforced authorisation" },
    { label: "Firebase", tip: "Google cloud DB" },
    { label: "MongoDB", tip: "Document database" },
  ],
  languages: [
    { label: "JavaScript" },
    { label: "TypeScript" },
    { label: "Golang" },
    { label: "C++" },
    { label: "Python" },
    { label: "HTML & CSS" },
  ],
  tools: [
    { label: "Git & GitHub" },
    { label: "Docker" },
    { label: "Playwright" },
    { label: "Vercel" },
    { label: "Postman" },
    { label: "Jupyter Notebook" },
  ],
};

export const SERVICES = [
  {
    num: "01",
    icon: "🎨",
    title: "Frontend Development",
    desc: "Pixel-perfect, responsive UIs with React and Next.js. Smooth animations, accessibility-first, and lightning-fast performance.",
    tags: ["React", "Next.js", "TypeScript", "Motion"],
  },
  {
    num: "02",
    icon: "⚙️",
    title: "Backend & APIs",
    desc: "Scalable server-side systems with Node.js, Golang and FastAPI. RESTful APIs, GraphQL endpoints, JWT auth, and database design that scales.",
    tags: ["Node.js", "Golang", "FastAPI", "PostgreSQL"],
  },
  {
    num: "03",
    icon: "🤖",
    title: "Automation & Data Pipelines",
    desc: "Scrapers, integration pipelines and job queues that save hours of manual work — with resumable state and honest failure modes.",
    tags: ["Celery", "Playwright", "Cheerio", "Webhooks"],
  },
  {
    num: "04",
    icon: "📱",
    title: "Full-Stack Products",
    desc: "End-to-end product delivery from requirements to deployment. I own the full SDLC and deliver production-ready software.",
    tags: ["Full SDLC", "Supabase", "Deployment", "Firebase"],
  },
  {
    num: "05",
    icon: "🛡️",
    title: "Auth, RBAC & Multi-Tenancy",
    desc: "Role-based access control, row-level security and tenant isolation enforced at the database, not just in the UI.",
    tags: ["RLS", "RBAC", "SSO", "JWT"],
  },
  {
    num: "06",
    icon: "🚀",
    title: "Performance & Optimization",
    desc: "Code audits, bundle optimization, and UI/UX improvements. Making existing apps faster, more accessible, and maintainable.",
    tags: ["Web Vitals", "Refactoring", "Accessibility", "SEO"],
  },
];

export const STATS = [
  { icon: "💼", target: 2, suffix: "+", label: "Years Experience" },
  { icon: "🚀", target: PROJECTS.length, suffix: "", label: "Projects Built" },
  { icon: "🏢", target: 3, suffix: "", label: "Companies Worked" },
];

export const ACHIEVEMENTS = [
  {
    icon: "🥇",
    title: "1st Place — Speed Programming",
    desc: "Won the Speed Programming Competition at the Institute of Space and Technology in 2023, competing against the best coders in the university.",
  },
  {
    icon: "🥈",
    title: "2nd Place — University Quiz",
    desc: "Secured second place in the University Quiz Competition 2023, demonstrating depth of technical and academic knowledge.",
  },
  {
    icon: "📜",
    title: "MERN Stack Certification",
    desc: "Earned Introduction to MERN Stack certification from SimpliLearn, validating expertise in MongoDB, Express, React, and Node.js.",
  },
];
