# Friends Malabi Quiz — Progress Log

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Screen Flow](#screen-flow)
4. [Data Layer](#data-layer)
5. [Component Details](#component-details)
6. [Styling System](#styling-system)
7. [Font System](#font-system)
8. [Deployment](#deployment)
9. [Development History](#development-history)
10. [Known Issues & Future Work](#known-issues--future-work)

---

## Project Overview

An interactive taste quiz for **Friends** malabi bar in Beer Sheva (רחוב מצדה 17).
The app lets customers discover which malabi flavor suits them through three modes:

1. **בוחר/ת לפי הטעם** (Quiz) — 3 questions about taste preferences → top 2 matches
2. **תן לגורל להחליט** (Fate) — random malabi selection
3. **זה לא מלבי היום** (Daily) — manually curated daily featured malabi

The design follows a graffiti/street art theme matching the bar's physical aesthetic,
with a cream/espresso/gold color palette and side-only gradient borders.

---

## Architecture

### Tech Stack
| Layer        | Technology                        | Version  |
|-------------|-----------------------------------|----------|
| Framework   | Next.js (App Router, Turbopack)   | 16.1.6   |
| UI          | React                             | 19.2.3   |
| Styling     | Tailwind CSS (v4, CSS-first)      | 4.x      |
| Animation   | Framer Motion                     | 12.34.1  |
| Validation  | Zod                               | 4.3.6    |
| Confetti    | canvas-confetti                   | 1.9.4    |
| Language    | TypeScript                        | 5.x      |
| Deployment  | Vercel (auto-deploy from GitHub)  | —        |

### File Structure
```
malabi-quiz/
├── public/
│   ├── fonts/
│   │   ├── GveretLevin-Regular.ttf    # Display font (local, hand-drawn Hebrew)
│   │   └── OFL.txt                     # Font license (SIL Open Font License)
│   └── images/
│       ├── bg-graffiti.webp            # Desktop background (16:9, graffiti splashes)
│       ├── bg-graffiti-mobile.webp     # Mobile background (stretched to fill)
│       ├── logo.png                    # Friends bar logo (colorful hand-drawn)
│       ├── classic.webp                # Fallback image for malabis without photos
│       ├── apple-pie.webp              # Malabi product photo
│       ├── bamba.webp                  # Malabi product photo
│       ├── banoffee.webp               # Malabi product photo
│       ├── cornflakes.webp             # Malabi product photo
│       ├── knafeh.webp                 # Malabi product photo
│       ├── lemon-pie.webp              # Malabi product photo
│       ├── movie.webp                  # Malabi product photo
│       └── tiramisu.webp               # Malabi product photo
├── src/
│   ├── app/
│   │   ├── globals.css                 # Theme variables, custom classes, backgrounds
│   │   ├── layout.tsx                  # Root layout (fonts, metadata, body classes)
│   │   └── page.tsx                    # App state machine (screen transitions)
│   ├── components/
│   │   ├── Landing.tsx                 # Landing page with 3 quiz modes
│   │   ├── Quiz.tsx                    # Quiz flow controller
│   │   ├── QuestionCard.tsx            # Individual question with answer options
│   │   ├── ProgressBar.tsx             # Step indicator (01—02—03)
│   │   ├── Loading.tsx                 # Transition screen with themed messages
│   │   ├── Result.tsx                  # Result display with malabi cards
│   │   └── ShareButtons.tsx            # UNUSED (replaced by inline icons)
│   ├── data/
│   │   ├── malabis.ts                  # 16 malabi definitions with Zod schema
│   │   ├── questions.ts                # 3 quiz questions
│   │   ├── scoring.ts                  # Answer → malabi weighted scoring
│   │   └── daily.ts                    # Daily featured malabi configuration
│   └── lib/
│       └── calculateResult.ts          # Scoring algorithm + random picker
├── CLAUDE.md                           # AI assistant project context
├── PROGRESS.md                         # This file
├── package.json                        # Dependencies and scripts
├── tsconfig.json                       # TypeScript configuration
└── next.config.ts                      # Next.js configuration
```

---

## Screen Flow

The app is a single-page application with 4 screens managed by React state in `page.tsx`:

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Landing  │────▶│  Quiz    │────▶│ Loading  │────▶│  Result  │
│          │     │ (3 Q's)  │     │ (2.8sec) │     │          │
│ 3 modes: │     │          │     │ "I'll be │     │ 1-2 cards│
│ - Quiz   │     │ Q1→Q2→Q3 │     │  there   │     │ + retry  │
│ - Fate ──┼──┐  │          │     │  for you"│     │ + share  │
│ - Daily ─┼─┐│  └──────────┘     └──────────┘     └──────────┘
└──────────┘ ││                                          │
             ││   ┌──────────────────────────────────────┘
             │└──▶│ Loading (skips quiz)                 │
             └───▶│                                      │
                  └──────────────────────────────────────▶ Landing (restart)
```

### State Machine (page.tsx)
- `screen`: "landing" | "quiz" | "loading" | "result"
- `results`: Malabi[] (1 item for fate/daily, 2 items for quiz)
- `resultMode`: "quiz" | "fate" | "daily" (tracks which mode was selected)

### Transitions
- **Landing → Quiz**: user clicks "בוחר/ת לפי הטעם"
- **Landing → Loading**: user clicks "תן לגורל להחליט" or "זה לא מלבי היום"
  (result is pre-calculated, loading is purely cosmetic)
- **Quiz → Loading**: user completes all 3 questions
- **Loading → Result**: after 2.8 second timer
- **Result → Landing**: user clicks retry button

---

## Data Layer

### Malabis (malabis.ts)
16 malabi flavors, each with:
- `id`: Unique string identifier (e.g., "classic", "dubai-chocolate")
- `name`: Hebrew display name (e.g., "מלבי קלאסי")
- `image`: Path to product photo in /public/images/
- `description`: Short Hebrew description
- `tagline`: One-line flavor summary
- `ingredients`: Array of ingredient layers (ordered top to bottom)
- `flavor`: "classic" | "fruity" | "bakery" | "oriental"
- `sweetness`: "mild" | "sweet" | "contrast"
- `texture`: "smooth" | "crunchy" | "mixed" | "soft-surprise"
- `sourness`: "none" | "mild" | "bold"
- `color`: Hex color for potential UI accents

**Full malabi list:**
1. מלבי קלאסי (classic)
2. מלבי קורנפלקס (cornflakes)
3. מלבי ריבת חלב (dulce)
4. מלבי פאי תפוחים (apple-pie)
5. מלבי טירמיסו (tiramisu)
6. מלבי פאי לימון (lemon-pie)
7. מלבי כנאפה (knafeh)
8. מלבי עוגת גבינה (cheesecake)
9. מלבי שחיתות (sinful)
10. מלבי סינבון (cinnabon)
11. מלבי בנופי (banoffee)
12. מלבי סמורס (smores)
13. מלבי במבה אדומה (bamba)
14. מלבי שוקולד דובאי (dubai-chocolate)
15. מלבי מהסרטים (movie)
16. מלבי קראנצ מאנצ (crunch-munch)

### Questions (questions.ts)
3 questions, each with 2-3 answer options:

**Q1: ניסית מלבי פעם?**
- 1a: כן, בא לי משהו חדש
- 1b: לא, תנו לי קלאסיקה

**Q2: מתוק או עם טוויסט?**
- 2a: מתוק
- 2b: חמצמץ
- 2c: מלוח-מתוק

**Q3: קראנצ'י או חלק?**
- 3a: פריך
- 3b: קרמי
- 3c: שילוב

### Scoring System (scoring.ts)
Each answer maps to multiple malabis with weights:
- **3**: Strong match — this malabi is a top pick for this answer
- **2**: Good match — fits well but not the strongest
- **1**: Slight match — minor connection

Example: Answer "2c" (מלוח-מתוק) gives weight 3 to movie, crunch-munch,
dubai-chocolate and weight 2 to bamba, knafeh.

### Score Calculation (calculateResult.ts)
1. Initialize all 16 malabi scores to 0
2. For each of the 3 answers, add weighted scores from scoring map
3. Add random factor (0 to 1.5) to each score to break ties and add variety
4. Sort by score descending
5. Return top 2 as [primary, secondary]

### Daily Malabi (daily.ts)
Simple configuration file with a hardcoded malabi ID.
Currently set to "dubai-chocolate". Change `DAILY_MALABI_ID` to update.

---

## Component Details

### Landing.tsx
The main landing page with three sections arranged in a flex column with `justify-between`:

**Top section**: Logo + funny intro story
- Logo: `w-[140px] md:w-[180px]` (consistent across all screens)
- Story: Humorous Hebrew text playing on "מה זה לא מאלבי??"

**Middle section**: Heading + 3 mode buttons
- Heading in Gveret Levin font: "אז מה הלא מלבי שלך?"
- 3 buttons with border style, hover fills with espresso color
- Each button has a label and subtitle (e.g., "3 שאלות · 2 המלצות")

**Bottom section**: Social icons + address
- WhatsApp and Facebook icons (taupe → brand color on hover)
- Address: "רחוב מצדה 17 | 053-453-2277"

### Quiz.tsx
Controls the 3-question quiz flow:
- Header with centered logo
- ProgressBar showing current step (01, 02, 03)
- QuestionCard in the center (flex-1 area)
- Navigation buttons: "חזרה" (back) and "הבא" (next) / "גלו את ההמלצות שלי" (last)
- "הבא" button disabled until an answer is selected

### QuestionCard.tsx
Animated question display using Framer Motion AnimatePresence:
- Slide animation: enters from right, exits to left (RTL-aware)
- Question text centered at top
- Answer options as selectable cards with radio-style indicator
- Selected state: espresso background with cream text + gold radio dot
- Unselected state: white background with sand border

### ProgressBar.tsx
Step indicator showing quiz progress:
- Format: "01 — 02 — 03"
- Active step: espresso color, scale 1.0
- Completed steps: gold color, scale 0.85
- Future steps: sand color, scale 0.85
- Lines between steps change color when step is completed

### Loading.tsx
Transition screen shown for 2.8 seconds:
- Full-height container matching other screens
- Animated gold line sweeping left-to-right
- Two messages cycling every 1.2 seconds:
  1. "🎵 I'll be there for you..." (Friends theme song reference)
  2. "מחפשים את הלא מלבי שלך..."

### Result.tsx
Displays quiz results with confetti celebration:
- Confetti animation fires on mount (dual-cannon from sides)
- Logo header (same size as all screens)
- Mode-specific intro text (e.g., "הגורל בחר בשבילך" for fate mode)
- MalabiCard component for each result (1 for fate/daily, 2 for quiz):
  - Product image (400x300, object-cover)
  - Malabi name (heading)
  - Tagline (italic)
  - Description
  - "מה בפנים" section with ingredient list
- Retry button with mode-specific text:
  - Quiz: "הטעמים לא דיברו אליך? נסו שוב"
  - Fate: "לא הלך בגורל? נסו שוב"
  - Daily: "זה הלא מלבי היום שלך? נסו שוב"
- Share section: "שתפו עם Friends" (Gveret Levin font) + WhatsApp/Facebook icons

---

## Styling System

### CSS Custom Properties (globals.css)
```css
--cream: #f6f1ea        /* Main background */
--cream-light: #faf7f2  /* Card backgrounds */
--sand: #e8dfd2         /* Borders, dividers */
--sand-light: #f0ebe3   /* Subtle borders */
--taupe: #a69882        /* Secondary text */
--taupe-dark: #8a7d6b   /* Tertiary text */
--espresso: #3a2f25     /* Primary text, buttons */
--espresso-light: #5a4d3f /* Body text */
--gold: #c4aa7d         /* Accents, active states */
--gold-muted: #d4c4a8   /* Muted accents */
```

### Custom CSS Classes
- `.border-graffiti` — Side-only gradient borders using ::before (left) and ::after (right)
  - Colors: teal → crimson → gold → olive → teal (matching graffiti background)
  - 2px wide, full height
- `.bg-graffiti` — Full-screen graffiti background
  - Mobile: `bg-graffiti-mobile.webp` stretched to 100% width and height
  - Desktop (768px+): `bg-graffiti.webp` with cover sizing
- `.answer-option` / `.answer-option-selected` — Quiz answer button states
- `.line-accent` — Decorative horizontal gradient line (gold, fading at edges)
- `.card-editorial` / `.card-warm` — Card styles (used in result cards)

### Layout Pattern
Every screen follows the same container structure:
```
Wrapper: h-dvh px-5 md:px-0
  └── Container: max-w-lg w-full h-full mx-auto border-graffiti bg-[var(--cream)]/60 backdrop-blur-sm
```
Exception: Result.tsx uses `min-h-dvh` instead of `h-dvh` because content may overflow.

---

## Font System

### Assistant (Google Font)
- Purpose: Body text, buttons, labels, all general UI text
- Weight: Variable (all weights available)
- Subsets: hebrew, latin
- CSS variable: `--font-assistant`
- Applied globally via `@theme inline { --font-sans: var(--font-assistant); }`

### Gveret Levin (Local Font)
- Purpose: Display heading ONLY ("אז מה הלא מלבי שלך?" and "Friends" in share text)
- Source: `public/fonts/GveretLevin-Regular.ttf`
- License: SIL Open Font License (OFL.txt)
- Weight: 400 (Regular only)
- CSS variable: `--font-display`
- Usage in Tailwind: `font-[family-name:var(--font-display)]`
- **Important**: Do NOT overuse this font. It should appear only on the landing heading
  and the "Friends" text in the share section.

---

## Deployment

### GitHub Repository
- URL: https://github.com/AviTzTz/malabi-quiz
- Branch: master (single branch)
- Auto-deploy: Vercel watches master branch

### Vercel
- Team: avis-projects-4b231623
- Framework: Next.js (auto-detected)
- Build: `next build` (Turbopack)
- Free tier: up to 100 deployments/day

### Deploy Process
1. Make changes locally
2. `git add <files> && git commit -m "message"`
3. `git push origin master`
4. Vercel auto-deploys within ~60 seconds

---

## Development History

### Session 1: Initial Build
- Created Next.js 16 project with Tailwind CSS 4
- Built all 4 screens (Landing, Quiz, Loading, Result)
- Implemented scoring system with weighted answer mapping
- Added 16 malabi flavors with full data
- Created graffiti-themed visual design

### Session 2: Polish & Refinements
- Added phone number (053-453-2277) next to address with pipe separator
- Made container full viewport height (`h-dvh`)
- Changed from full border to side-only gradient borders (::before/::after)
- Got design critique and implemented feedback:
  - Improved text contrast in quiz answers
  - Fixed letter-spacing on address text
  - Widened container from max-w-sm to max-w-lg
  - Added mobile padding (px-5) to prevent overflow
- Added WhatsApp + Facebook social links with hover color effects
- Pushed social links and address to bottom with mt-auto
- Added funny intro story text ("מה זה לא מאלבי??")
- Added Gveret Levin handwriting font for display heading
- Unified container styling across all 4 screens
- Made logo size consistent across all screens (w-[140px] md:w-[180px])
- Changed loading messages to "I'll be there for you" theme
- Redesigned Result share section: replaced big buttons with small icons
- Added mode-specific retry messages
- Changed "שתפו את התוצאה" to "שתפו עם Friends"
- Working on landing page button centering (justify-between/evenly)
- First deploy to Vercel via GitHub integration

---

## Known Issues & Future Work

### Missing Images (7 malabis use classic.webp fallback)
The following malabis need dedicated product photos:
- dulce (מלבי ריבת חלב)
- cheesecake (מלבי עוגת גבינה)
- sinful (מלבי שחיתות)
- cinnabon (מלבי סינבון)
- smores (מלבי סמורס)
- dubai-chocolate (מלבי שוקולד דובאי)
- crunch-munch (מלבי קראנצ מאנצ)

### Placeholder Links
- Facebook URL is placeholder: `https://facebook.com/friends`
- Needs real Friends bar Facebook page URL

### Unused Code
- `ShareButtons.tsx` — replaced by inline icons in Result.tsx, can be deleted
- `_write-script.js` and `generate-placeholders.js` — dev utilities, not in git

### Layout Fine-Tuning
- Landing page button section centering needs work on mobile
- Currently using `justify-between` with 3 section groups
- The heading + buttons should be visually centered between the story and icons

### Potential Enhancements
- Add og:image for social sharing preview
- Add analytics tracking (which mode is most popular, which malabis win)
- Consider adding Instagram link alongside WhatsApp/Facebook
- PWA support for mobile home screen installation
- Accessibility audit (screen reader support, keyboard navigation)
- Dark mode consideration (may conflict with graffiti aesthetic)
