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
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  type: 'cur' | 'prev' | 'intern';
  icon: string;
  bullets: string[];
  tags: string[];
}

export interface Skill {
  label: string;
  tip?: string;
}

export const PERSONAL = {
  name: 'Muhammad Suleman',
  role: 'Full Stack Developer',
  email: 'sulemanefc@gmail.com',
  phone: '+92-336-058-9167',
  location: 'Islamabad, Pakistan',
  linkedin: 'https://linkedin.com/in/muhammad-suleman',
  github: 'https://github.com',
  gpa: '3.1 / 4.0',
  university: 'Institute of Space and Technology',
  degree: 'BS Computer Science',
  gradYear: 'Sep 2020 – Feb 2024',
  roles: [
    'Full Stack Developer',
    'React Specialist',
    'Next.js Engineer',
    'Golang Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Optimize E-Commerce Through Social Analytics',
    tag: 'Final Year Project',
    img: 'https://v0-modern-portfolio-website-nine-phi.vercel.app/images/fyp.png',
    emoji: '🛒',
    imgBg: 'linear-gradient(135deg,#12121f,#1e2035)',
    desc: 'A comprehensive final year project designed to boost e-commerce sales by harnessing social media analytics, machine learning models, and automated web scraping. The system collects product sentiment data from social platforms and translates it into actionable recommendations for store owners.',
    tech: ['React', 'Node.js', 'MongoDB', 'Firebase', 'Python', 'Machine Learning', 'Web Scraping', 'REST APIs'],
    highlights: [
      'Built a real-time social sentiment analysis pipeline using Python and NLP techniques',
      'Developed a React dashboard surfacing product trend data and revenue insights',
      'Automated web scraping of major platforms to feed the ML recommendation engine',
      'Integrated Firebase for real-time data sync and MongoDB for structured storage',
      'Achieved measurable improvement in product discoverability scores during testing',
    ],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Rahva Raamat',
    tag: 'E-commerce · Codbeyon',
    img: null,
    emoji: '📚',
    imgBg: 'linear-gradient(135deg,#0d1a2e,#1a2d4a)',
    desc: 'Redesigned and optimised the UI/UX of Rahva Raamat, a large-scale Estonian e-commerce book platform. The project focused on improving accessibility, page performance, and component reusability while collaborating with cross-functional teams to ship new features continuously.',
    tech: ['React', 'Next.js', 'TypeScript', 'SCSS', 'Tailwind CSS', 'REST APIs', 'Storybook'],
    highlights: [
      'Redesigned core shopping flows — product listing, search, cart and checkout — for improved UX',
      'Built a shared component library in Storybook for consistent design across the platform',
      'Improved Lighthouse performance scores by optimising images and reducing layout shifts',
      'Collaborated with back-end teams to integrate new product and user-management APIs',
      'Ensured WCAG accessibility compliance across all redesigned components',
    ],
    liveUrl: 'https://www.rahvaraamat.ee/',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Low Hanging Leads',
    tag: 'Lead Gen · Codbeyon',
    img: 'https://v0-modern-portfolio-website-nine-phi.vercel.app/images/lead.png',
    emoji: '🎯',
    imgBg: 'linear-gradient(135deg,#12121f,#1e351a)',
    desc: 'A production-level B2B lead generation platform built at Codbeyon. The system automates prospect discovery, scoring, and outreach workflows — cutting hours of manual SDR work down to minutes. Handles large data volumes with a clean, responsive dashboard.',
    tech: ['React', 'Next.js', 'TypeScript', 'REST APIs', 'PostgreSQL', 'Supabase', 'Node.js'],
    highlights: [
      'Built end-to-end from requirements to deployment as part of the Codbeyon engineering team',
      'Developed a real-time lead scoring dashboard with filtering, sorting and export features',
      'Integrated third-party data enrichment APIs to auto-fill prospect details',
      'Implemented role-based auth and team workspaces for multi-user access',
      'Optimised API calls with caching to handle high-frequency lead data refreshes',
    ],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'LinkedIn Lead Generator Extension',
    tag: 'Chrome Extension',
    img: null,
    emoji: '🔌',
    imgBg: 'linear-gradient(135deg,#1a0d2e,#2d1a4a)',
    desc: 'A Chrome browser extension that scrapes lead data directly from LinkedIn profiles and search pages, then exports the structured data as a formatted Excel file — eliminating manual copy-paste prospecting entirely.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Chrome Extension API', 'SheetJS', 'DOM Manipulation'],
    highlights: [
      'Built a Chrome Manifest V3 extension that reads LinkedIn DOM data in real-time',
      'Structured scraped data (name, title, company, email, profile URL) into clean rows',
      'Implemented SheetJS to generate and download properly formatted Excel files instantly',
      'Added field selection — users choose exactly which data points to extract',
      'Handles paginated LinkedIn results and bulk multi-profile extraction',
    ],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 5,
    title: 'MatchGate — ATS System',
    tag: 'ATS Platform',
    img: null,
    emoji: '🎯',
    imgBg: 'linear-gradient(135deg,#12121f,#1e1235)',
    desc: 'A fully transparent Applicant Tracking System built to replace opaque, noisy CV-review cycles. Uses a custom rules-based matching engine that scores candidates 0–100% based on skills, experience, and role requirements — no LLM black boxes, complete explainability.',
    tech: ['Next.js', 'Golang', 'PostgreSQL', 'Supabase', 'JWT', 'REST APIs', 'TypeScript'],
    highlights: [
      'Designed a custom rules-based matching engine scoring candidates 0–100% with full transparency',
      'Built Go + PostgreSQL backend with RESTful APIs and JWT authentication',
      'Created a Next.js frontend with embeddable hiring panel via iframe for client portals',
      'Implemented Supabase storage for CV uploads and candidate document management',
      'Zero dependency on LLMs — all matching logic is deterministic and auditable',
    ],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 6,
    title: 'Diagnostic Center Management System',
    tag: 'Healthcare · Full-Stack',
    img: null,
    emoji: '🏥',
    imgBg: 'linear-gradient(135deg,#0d1520,#12121f)',
    desc: 'A full-stack web application centralising all diagnostic center operations into a single unified dashboard — covering POS billing, patient management, test/service catalogue, inventory tracking, and configurable reporting.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'REST APIs', 'Chart.js'],
    highlights: [
      'Built a unified POS billing system handling tests, packages and custom service pricing',
      'Implemented patient record management with searchable history and result tracking',
      'Created an inventory module with low-stock alerts and supplier management',
      'Designed analytics dashboards with filterable reports and exportable data',
      'Ensured persistent state across multi-step workflows and page reloads via Supabase',
    ],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 7,
    title: 'Data Analysis Using Python',
    tag: 'Data Science',
    img: 'https://v0-modern-portfolio-website-nine-phi.vercel.app/images/dataAnalysis.png',
    emoji: '📊',
    imgBg: 'linear-gradient(135deg,#12121f,#1f3520)',
    desc: "An end-to-end data analysis project on a retail shop dataset — from raw data cleaning through exploration, statistical analysis, and rich visualisations — delivering actionable business intelligence insights using Python's core data science stack.",
    tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter Notebook', 'NumPy'],
    highlights: [
      'Cleaned and preprocessed raw shop data — handled missing values, outliers and type issues',
      'Performed exploratory data analysis uncovering sales trends and seasonal patterns',
      'Built visualisations (bar charts, heatmaps, time-series plots) for key business metrics',
      'Generated insights on top-selling products, peak hours and revenue distribution',
      'Documented the entire analysis in a structured Jupyter Notebook with commentary',
    ],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 8,
    title: 'Bus Management System',
    tag: 'C++ System',
    img: 'https://v0-modern-portfolio-website-nine-phi.vercel.app/images/bus.png',
    emoji: '🚌',
    imgBg: 'linear-gradient(135deg,#1a1200,#2d2000)',
    desc: 'A C++ console-based bus reservation system implementing full seat booking, cancellation, and admin management workflows. Uses file-based persistence to maintain all reservation data across sessions without a database.',
    tech: ['C++', 'File I/O', 'OOP', 'Data Structures', 'Algorithms'],
    highlights: [
      'Implemented OOP architecture with classes for Bus, Passenger, Booking and Admin',
      'Built seat availability engine with real-time conflict detection for concurrent bookings',
      'File-based persistence — all booking records survive application restarts',
      'Admin panel with full CRUD: add/remove routes, view all bookings, generate reports',
      'Input validation and error handling throughout all user interaction flows',
    ],
    liveUrl: '#',
    githubUrl: '#',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'Codbeyon',
    period: 'June 2025 – Present',
    type: 'cur',
    icon: '⚡',
    bullets: [
      'Delivering end-to-end solutions for multiple production-level projects, managing full SDLC from requirements to deployment',
      'Developed responsive and scalable web applications using React, Next.js, and TypeScript with optimized UI components',
      'Integrated third-party APIs to improve functionality, performance, and user experience',
      'Leading Rahva Raamat, Low Hanging Leads, and 3+ more active projects',
    ],
    tags: ['React', 'Next.js', 'TypeScript', 'REST APIs', 'Full SDLC'],
  },
  {
    role: 'Solution Engineer',
    company: 'Phebsoft',
    period: 'Nov 2024 – Mar 2025',
    type: 'prev',
    icon: '🔧',
    bullets: [
      'Developed and implemented automated integrations to streamline workflows using Versori Automation Tool',
      'Collaborated with cross-functional teams to optimize system connectivity and performance',
      'Designed scalable software solutions for diverse client requirements',
    ],
    tags: ['Versori', 'Workflow Automation', 'API Integration', 'System Design'],
  },
  {
    role: 'Web Developer Intern',
    company: 'Bitsol Technologies',
    period: 'Aug 2023 – Sep 2023',
    type: 'intern',
    icon: '🌐',
    bullets: [
      'Built scalable front-end applications using React.js, TypeScript, Material UI, and Storybook',
      'Improved responsive UI design and user experience through clean, component-based architecture',
    ],
    tags: ['React.js', 'TypeScript', 'Material UI', 'Storybook', 'Kotlin'],
  },
];

export const SKILLS: Record<string, Skill[]> = {
  frontend: [
    { label: 'React.js', tip: 'UI library' },
    { label: 'Next.js', tip: 'Full-stack framework' },
    { label: 'TypeScript', tip: 'Type-safe JS' },
    { label: 'Tailwind CSS', tip: 'Utility-first CSS' },
    { label: 'Framer Motion', tip: 'Animation library' },
    { label: 'Redux Toolkit', tip: 'State management' },
    { label: 'Zustand', tip: 'Lightweight state' },
    { label: 'SCSS', tip: 'CSS preprocessor' },
    { label: 'Material UI', tip: 'Component library' },
    { label: 'Storybook', tip: 'Component docs' },
  ],
  backend: [
    { label: 'Node.js', tip: 'Server runtime' },
    { label: 'Golang', tip: 'Systems & APIs' },
    { label: 'GraphQL', tip: 'Query language for APIs' },
    { label: 'REST APIs', tip: 'HTTP API design' },
    { label: 'JWT Auth', tip: 'Token authentication' },
    { label: 'Versori Automation', tip: 'Workflow tool' },
  ],
  database: [
    { label: 'PostgreSQL', tip: 'Relational DB' },
    { label: 'Supabase', tip: 'Open-source Firebase' },
    { label: 'Firebase', tip: 'Google cloud DB' },
    { label: 'MongoDB', tip: 'Document database' },
  ],
  languages: [
    { label: 'JavaScript' },
    { label: 'TypeScript' },
    { label: 'Golang' },
    { label: 'C++' },
    { label: 'Python' },
    { label: 'HTML & CSS' },
  ],
  tools: [
    { label: 'Git & GitHub' },
    { label: 'VS Code' },
    { label: 'Postman' },
    { label: 'WordPress' },
    { label: 'Jupyter Notebook' },
  ],
};

export const SERVICES = [
  { num: '01', icon: '🎨', title: 'Frontend Development', desc: 'Pixel-perfect, responsive UIs with React and Next.js. Smooth animations, accessibility-first, and lightning-fast performance.', tags: ['React', 'Next.js', 'TypeScript', 'Framer Motion'] },
  { num: '02', icon: '⚙️', title: 'Backend & APIs', desc: 'Scalable server-side systems with Node.js and Golang. RESTful APIs, GraphQL endpoints, JWT auth, and database design that scales.', tags: ['Node.js', 'Golang', 'GraphQL', 'PostgreSQL'] },
  { num: '03', icon: '🤖', title: 'Automation & Workflows', desc: 'Automated integration pipelines that save hours of manual work. API-to-API workflows, data pipelines, and process automation.', tags: ['Versori', 'REST APIs', 'Webhooks'] },
  { num: '04', icon: '📱', title: 'Full-Stack Products', desc: 'End-to-end product delivery from requirements to deployment. I own the full SDLC and deliver production-ready software.', tags: ['Full SDLC', 'Supabase', 'Deployment', 'Firebase'] },
  { num: '05', icon: '📊', title: 'Data & Analytics', desc: 'Dashboards, POS systems, and reporting pipelines. From raw data to actionable insights with clean visualizations.', tags: ['Python', 'Pandas', 'Matplotlib', 'Charts'] },
  { num: '06', icon: '🚀', title: 'Performance & Optimization', desc: 'Code audits, bundle optimization, and UI/UX improvements. Making existing apps faster, more accessible, and maintainable.', tags: ['Web Vitals', 'Refactoring', 'Accessibility', 'SEO'] },
];

export const STATS = [
  { icon: '💼', target: 3, suffix: '+', label: 'Years Experience' },
  { icon: '🚀', target: 8, suffix: '+', label: 'Projects Shipped' },
  { icon: '🏢', target: 3, suffix: '', label: 'Companies Worked' },
  { icon: '☕', target: 1200, suffix: '+', label: 'Cups of Coffee' },
];

export const ACHIEVEMENTS = [
  { icon: '🥇', title: '1st Place — Speed Programming', desc: 'Won the Speed Programming Competition at the Institute of Space and Technology in 2023, competing against the best coders in the university.' },
  { icon: '🥈', title: '2nd Place — University Quiz', desc: 'Secured second place in the University Quiz Competition 2023, demonstrating depth of technical and academic knowledge.' },
  { icon: '📜', title: 'MERN Stack Certification', desc: 'Earned Introduction to MERN Stack certification from SimpliLearn, validating expertise in MongoDB, Express, React, and Node.js.' },
];
