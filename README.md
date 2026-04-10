# Muhammad Suleman — Portfolio

A Next.js 14 + TypeScript portfolio with GSAP animations, Three.js particle background, VanillaTilt 3D cards, and a full project modal system.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Main page — assembles all sections
│   ├── globals.css         # CSS variables, base styles, animations
│   └── components.css      # Section-specific styles (nav, hero, projects…)
│
├── components/
│   ├── GSAPInit.tsx        # ALL animations: GSAP, Three.js, cursor, typed roles
│   ├── Loader.tsx          # Page loader with progress bar
│   ├── Cursor.tsx          # Custom cursor dots
│   ├── ThreeBackground.tsx # Three.js canvas element
│   ├── Navbar.tsx          # Fixed navigation bar
│   ├── MobileMenu.tsx      # Full-screen mobile menu overlay
│   ├── ProgressRing.tsx    # Scroll progress ring (bottom-right)
│   ├── Hero.tsx            # Hero section with animated title
│   ├── Ticker.tsx          # Scrolling tech stack ticker
│   ├── Stats.tsx           # Animated counter stats
│   ├── About.tsx           # About section with sticky card
│   ├── Marquee.tsx         # Dual-direction skills marquee
│   ├── Skills.tsx          # Tabbed skills section
│   ├── Services.tsx        # Services/offerings grid
│   ├── Experience.tsx      # Work experience timeline cards
│   ├── Projects.tsx        # Bento grid of 8 projects
│   ├── Achievements.tsx    # Awards & certifications
│   ├── Contact.tsx         # Contact section
│   ├── Footer.tsx          # Footer
│   └── ProjectModal.tsx    # Full-detail project modal
│
├── data/
│   └── index.ts            # ← ALL your content lives here
│                             (projects, experience, skills, personal info)
│
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## ✏️ Updating Your Content

**All content is in one file: `data/index.ts`**

### Update personal info
```ts
export const PERSONAL = {
  name: 'Muhammad Suleman',
  email: 'sulemanefc@gmail.com',
  phone: '+92-336-058-9167',
  linkedin: 'https://linkedin.com/in/YOUR_PROFILE',
  github: 'https://github.com/YOUR_USERNAME',
  // ...
};
```

### Add a new project
```ts
export const PROJECTS: Project[] = [
  {
    id: 9,
    title: 'My New Project',
    tag: 'Web App',
    img: '/images/my-project.png',  // put image in public/images/
    emoji: '🔥',
    imgBg: 'linear-gradient(135deg,#12121f,#1e1235)',
    desc: 'Full description here...',
    tech: ['React', 'Node.js'],
    highlights: ['Built X', 'Achieved Y'],
    liveUrl: 'https://myproject.com',
    githubUrl: 'https://github.com/me/myproject',
  },
  // ...
];
```

### Add a project screenshot
Drop your image in `public/images/` and reference it as `/images/filename.png`.

---

## 🌐 Deploy to Vercel

### Option A — Vercel CLI (fastest)
```bash
npm install -g vercel
vercel
```

### Option B — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Framework preset: **Next.js** (auto-detected)
5. Click **Deploy**

That's it — no environment variables needed.

---

## 🎨 Animations Used

| Feature | Library |
|---------|---------|
| Scroll-triggered reveals | GSAP ScrollTrigger |
| Hero word/char animations | GSAP Timeline |
| 3D particle background | Three.js |
| Card 3D tilt + glare | VanillaTilt |
| Magnetic buttons | GSAP |
| Typed role rotator | Custom JS |
| Click sparkle burst | GSAP |
| Text scramble effect | Custom JS |
| Progress ring | SVG + scroll event |
| Mouse trail | Custom rAF loop |

---

## 📦 Dependencies

```json
"next": "14.2.5",
"react": "^18.3.1",
"gsap": "^3.12.5",
"three": "^0.128.0",
"vanilla-tilt": "^1.8.1"
```

> Note: GSAP, Three.js, and VanillaTilt are loaded from CDN at runtime via `GSAPInit.tsx` to avoid SSR issues. The npm packages are listed for type checking only.
# Portfolio-Website
