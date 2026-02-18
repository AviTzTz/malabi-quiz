# Friends Malabi Quiz — CLAUDE.md

## Project Overview
Interactive "taste quiz" web app for **Friends** malabi bar (באר שבע, רחוב מצדה 17).
Users discover their ideal malabi through 3 modes: taste quiz, random fate, or daily pick.
Built with Next.js 16 App Router, Tailwind CSS 4, Framer Motion, TypeScript.

## Tech Stack
- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **Styling**: Tailwind CSS 4 with CSS custom properties (no tailwind.config — uses `@theme inline`)
- **Animation**: Framer Motion 12
- **Validation**: Zod 4 (all data validated at build time)
- **Fonts**: Assistant (Google, body), Gveret Levin (local, display headings)
- **Deployment**: Vercel (auto-deploy on push to master)
- **Repo**: https://github.com/AviTzTz/malabi-quiz

## Project Structure
```
src/
├── app/
│   ├── globals.css       # CSS variables, border-graffiti, bg-graffiti, answer styles
│   ├── layout.tsx        # Root layout — fonts, metadata, flex body
│   └── page.tsx          # State machine: landing → quiz → loading → result
├── components/
│   ├── Landing.tsx        # Landing page — logo, story, 3 mode buttons, social links
│   ├── Quiz.tsx           # Quiz flow — 3 questions with animated transitions
│   ├── QuestionCard.tsx   # Single question with answer options (AnimatePresence)
│   ├── ProgressBar.tsx    # Step indicator (01, 02, 03)
│   ├── Loading.tsx        # Loading screen — "I'll be there for you" themed
│   ├── Result.tsx         # Result cards — malabi image, ingredients, retry, share
│   └── ShareButtons.tsx   # (UNUSED) — sharing moved to inline icons in Result.tsx
├── data/
│   ├── malabis.ts         # 16 malabis with Zod schema, flavor/sweetness/texture traits
│   ├── questions.ts       # 3 quiz questions with Zod validation
│   ├── scoring.ts         # Weighted scoring map (answer → malabi weights 1-3)
│   └── daily.ts           # Daily featured malabi (manual ID, currently dubai-chocolate)
└── lib/
    └── calculateResult.ts # Score calculator + random malabi picker
```

## Key Design Decisions

### Visual Theme
- Graffiti/street art aesthetic matching the bar's identity
- Side-only gradient borders (`border-graffiti` via ::before/::after pseudo-elements)
- Full-viewport graffiti background (separate mobile/desktop images)
- Cream/sand/espresso/gold color palette defined in CSS custom properties

### Layout Pattern
All screens share: `h-dvh px-5 md:px-0` wrapper → `max-w-lg w-full h-full mx-auto border-graffiti` container.
Result uses `min-h-dvh` instead of `h-dvh` because content scrolls.

### Font Usage
- `--font-display` (Gveret Levin): ONLY for the "אז מה הלא מלבי שלך?" heading and "Friends" in share text
- `--font-assistant`: Everything else. Do NOT overuse the display font.

### Scoring System
Weighted scoring (1-3) per answer → malabi mapping. Small random factor (0-1.5) breaks ties.
Returns top 2 results for quiz mode, 1 for fate/daily modes.

## User Preferences
- Hebrew RTL interface — all text in Hebrew except brand names
- No button hierarchy differences (all 3 mode buttons same size)
- Minimal emoji usage in UI
- Logo must be same size across ALL screens: `w-[140px] md:w-[180px]`
- Social icons: taupe color → brand color on hover (WhatsApp green, Facebook blue)
- Phone: 053-453-2277 | Address: רחוב מצדה 17

## Known Issues / TODOs
- 7 malabis still use `classic.webp` fallback (need dedicated images)
- Facebook link is placeholder (`https://facebook.com/friends`)
- ShareButtons.tsx component is unused (replaced by inline icons in Result.tsx)
- Landing page button centering needs fine-tuning on mobile
- `_write-script.js` and `generate-placeholders.js` are dev utilities, not committed

## Commands
```bash
npm run dev    # Start dev server (Turbopack)
npm run build  # Production build
npm run start  # Serve production build
```
