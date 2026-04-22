# Evoke — Product Requirements Document

## Overview
Evoke is a creative productivity tool that transforms raw ideas into polished designs through AI-powered generation. The MVP is a marketing landing page that showcases the product's capabilities, pricing, and social proof.

## Target Audience
- Creative professionals (designers, content creators)
- Product teams seeking design automation
- Individual creators exploring AI-assisted workflows

## Key Features
1. **Hero Section** — Bold headline with animated canvas particle background
2. **Features** — Core capability cards with scroll-triggered animations
3. **Gallery** — Interactive showcase of AI-generated designs
4. **How It Works** — 3-step process explanation
5. **Interactive Demo** — Live palette/color generator demo
6. **Testimonials** — Customer voice carousel
7. **Pricing** — Tiered pricing with monthly/annual toggle
8. **FAQ** — Accordion-style common questions
9. **CTA Section** — Email signup with real API submission
10. **Footer** — Navigation, social links, newsletter signup

## Technical Stack
- React 18+ with TypeScript (strict mode)
- Vite 5
- Tailwind CSS 4
- Vitest + React Testing Library

## Design Tokens
- **Primary Color**: #EF4444 (red-500)
- **Typography**: system-ui, professional tone
- **Aesthetic**: Balanced — purposeful animations, gradient accents, scroll-triggered reveals

## Acceptance Criteria
- All sections render correctly on mobile (320px+) and desktop
- Email signup forms submit to real API endpoint (`/api/subscribe`)
- No `href="#"` dead links — all links point to real destinations
- WCAG 2.1 AA accessibility compliance
- Dark mode support
- All tests pass
- Production build succeeds
- Initial bundle under 200KB

## Deployment
- Static site deployed to Vercel
- Serverless API route at `/api/subscribe` for email subscriptions
