# Nexus — Project Context

## Project Overview

**Nexus** is a high-end digital innovation agency website built with **Next.js 14** (App Router). It showcases futuristic, immersive web experiences with a focus on polished animations, 3D visuals, and smooth scrolling interactions. The project is bootstrapped with `create-next-app` and uses a dark theme with a neon-green accent color.

### Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **3D Rendering** | Three.js + @react-three/fiber + @react-three/drei |
| **Smooth Scrolling** | Lenis |
| **Icons** | Lucide React |
| **Font** | Inter (body), Space Grotesk (display) |

## Project Structure

```
src/
├── app/
│   ├── (marketing)/          # Route group for marketing pages
│   │   ├── about/            # About page
│   │   ├── contact/          # Contact page
│   │   ├── work/             # Work/portfolio page
│   │   ├── layout.tsx        # Marketing layout (Header + Footer)
│   │   └── page.tsx          # Homepage
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout (fonts, cursor, scroll, transitions)
├── components/
│   ├── layout/               # Structural components (Header, Footer, Cursor, etc.)
│   ├── sections/             # Page section components (Hero, Services, etc.)
│   └── ui/                   # Reusable UI primitives
├── hooks/
│   └── use-lenis.ts          # Lenis smooth scroll hook
└── lib/
    └── utils.ts              # Utility functions (cn helper for Tailwind class merging)
```

## Building and Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

The development server runs on **http://localhost:3000**.

## Key Architectural Patterns

- **Route Groups:** Uses Next.js route groups (`(marketing)`) to organize layouts without affecting URL paths.
- **Path Aliases:** `@/*` maps to `./src/*` for clean imports.
- **Custom Cursor & Smooth Scroll:** The root layout wraps the app in `CustomCursor`, `SmoothScroll` (Lenis), and `PageTransition` (Framer Motion) for a premium feel.
- **Tailwind Utilities:** Uses `clsx` + `tailwind-merge` via a `cn()` helper for composable, conflict-free class names.
- **Design Tokens:** Custom Tailwind theme defines a dark palette (`background: #0a0a0a`, `foreground: #ededed`, `accent: #ccff00`).

## Development Conventions

- **Strict TypeScript:** `strict: true` is enabled in `tsconfig.json`.
- **React 18:** Uses functional components with hooks.
- **Tailwind-first Styling:** All styling is done via Tailwind utility classes; custom colors/extensions live in `tailwind.config.ts`.
- **Component Organization:** Layout components, page sections, and UI primitives are kept in separate folders for clarity.
