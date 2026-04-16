# Property Space & Cost Calculator — Lead Generation App
## Implementation Plan (Multi-Session Reference)

> **Status**: Planning only — no code written yet  
> **Last updated**: 2026-04-16  
> **Reference design**: `references/website.png` (Zovi dark-theme aesthetic)

---

## 1. Project Overview

A **public-facing, single-page React application** that acts as a commercial office space and cost calculator. The primary goal is **lead generation**: give users enough value to trust the tool, then gate the most useful details behind a contact form.

### User Journey

```
1. Land on hero section
      ↓
2. Click "Calculate my space" → smooth-scroll to calculator
      ↓
3. Fill in Step 1: Company basics (3 fields)
      ↓
4. Fill in Step 2: Work pattern (3 fields)
      ↓
5. See instant results — FREE preview (area, desks)
      ↓
6. See blurred cost breakdown + locked scenario panel
      ↓
7. Click "Unlock your full report" → lead capture modal
      ↓
8. Submit form → thank-you state + unblur results
```

### What is Free vs. Locked

| Detail | Free (visible) | Locked (blurred) |
|--------|---------------|------------------|
| Desks needed | ✅ | — |
| Total area estimate (GLA) | ✅ | — |
| Area per person | ✅ | — |
| Benchmark indicator | ✅ | — |
| Monthly rent estimate | — | ✅ |
| Fitout cost estimate | — | ✅ |
| Annual total occupancy cost | — | ✅ |
| Detailed area breakdown (NUA/NLA/GLA) | — | ✅ |
| 3-scenario comparison table | — | ✅ |
| "Next steps" recommendations | — | ✅ |

---

## 2. Tech Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | React | 18.2.x | Functional components, hooks only |
| Build tool | Vite | 5.x | Fast HMR, small bundle |
| Routing | React Router DOM | 6.x | Single route `/`, modal via state |
| UI Library | Ant Design | 5.x | Dark theme override (NOT v6 — v5 has better dark token support) |
| Styling | Ant Design tokens + inline styles | — | No CSS modules; global `index.css` for overrides |
| Animations | CSS transitions + keyframes | — | No animation library (keep bundle small) |
| Icons | `@ant-design/icons` | 5.x | Minimal usage |
| Font | Inter (Google Fonts) | — | Clean modern sans-serif matching reference aesthetic |
| State | React `useState` / `useReducer` | — | No Redux; entirely local state |
| Forms | Ant Design `Form` | — | Validation only on lead capture modal |
| No auth | — | — | Fully public, no login |
| No backend | — | — | Calculation is 100% client-side JS |
| No database | — | — | Lead form submits to a `mailto:` link OR logs to console (placeholder for future webhook) |

### Package.json dependencies (planned)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "antd": "^5.21.0",
    "@ant-design/icons": "^5.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
```

---

## 3. Design System

### 3.1 Color Palette

Derived from `references/website.png` — Zovi's dark brand aesthetic with teal accent.

```javascript
// src/theme/colors.js
export const colors = {
  // Backgrounds
  bg:          '#09090F',   // Page background (near-black, slight blue tint)
  surface:     '#111117',   // Card backgrounds
  elevated:    '#1A1A24',   // Elevated/hover card state
  border:      '#252530',   // Subtle borders
  borderHover: '#3A3A4A',   // Hovered/active borders

  // Brand accent (teal/mint — matches reference)
  teal:        '#00D4A8',   // Primary accent (headings, highlights, CTA)
  tealHover:   '#00F0BF',   // Hover state
  tealMuted:   'rgba(0, 212, 168, 0.12)', // Tint backgrounds

  // Text
  textPrimary:   '#FFFFFF',         // Headings, key data
  textSecondary: '#9191A4',         // Body text, labels
  textMuted:     '#5C5C70',         // Placeholders, disabled

  // Semantic
  success:     '#00D4A8',   // Reuse teal for success
  warning:     '#F5A623',   // Amber warnings
  error:       '#FF4D4F',   // Validation errors

  // Blur/lock overlay
  blurOverlay: 'rgba(9, 9, 15, 0.88)', // Over blurred content
};
```

### 3.2 Typography

```javascript
// Font: Inter — imported in index.html from Google Fonts
// Fallback: system-ui, -apple-system, sans-serif

const typography = {
  // Hero headline (massive, split across lines)
  heroXl: { fontSize: '80px', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-2px' },
  // On mobile: 42px
  heroMd: { fontSize: '48px', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1px' },
  // Section headings
  h2:     { fontSize: '36px', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.5px' },
  h3:     { fontSize: '24px', fontWeight: 600, lineHeight: 1.3 },
  // Step labels, card titles
  label:  { fontSize: '13px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px' },
  // Body
  body:   { fontSize: '16px', fontWeight: 400, lineHeight: 1.65 },
  bodyLg: { fontSize: '18px', fontWeight: 400, lineHeight: 1.6 },
  // Stat numbers
  stat:   { fontSize: '52px', fontWeight: 800, lineHeight: 1.0 },
};
```

### 3.3 Ant Design Dark Theme Token Override

```javascript
// src/theme/antdTheme.js
export const antdTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorBgBase:          '#09090F',
    colorBgContainer:     '#111117',
    colorBgElevated:      '#1A1A24',
    colorBorder:          '#252530',
    colorPrimary:         '#00D4A8',
    colorPrimaryHover:    '#00F0BF',
    colorText:            '#FFFFFF',
    colorTextSecondary:   '#9191A4',
    colorTextPlaceholder: '#5C5C70',
    fontFamily:           "'Inter', system-ui, sans-serif",
    fontSize:             16,
    borderRadius:         10,
    lineWidth:            1,
  },
  components: {
    Button: {
      colorPrimary:         '#00D4A8',
      colorPrimaryHover:    '#00F0BF',
      colorPrimaryActive:   '#00B890',
      colorPrimaryText:     '#09090F',    // Dark text on teal button
      primaryShadow:        '0 0 20px rgba(0,212,168,0.3)',
      borderRadiusLG:       10,
      controlHeightLG:      52,
      paddingInlineLG:      32,
      fontSizeLG:           16,
      fontWeightStrong:     600,
    },
    Input: {
      colorBgContainer:     '#1A1A24',
      colorBorder:          '#252530',
      colorBorderHover:     '#00D4A8',
      activeBorderColor:    '#00D4A8',
      activeShadow:         '0 0 0 2px rgba(0,212,168,0.15)',
      controlHeightLG:      52,
    },
    Select: {
      colorBgContainer:     '#1A1A24',
      colorBorder:          '#252530',
      optionSelectedBg:     'rgba(0,212,168,0.12)',
      optionActiveBg:       'rgba(255,255,255,0.04)',
    },
    Slider: {
      colorPrimary:         '#00D4A8',
      colorPrimaryBorder:   '#00D4A8',
      colorFillSecondary:   '#252530',
      trackBg:              '#00D4A8',
      handleColor:          '#00D4A8',
      handleActiveColor:    '#00F0BF',
      dotActiveBorderColor: '#00D4A8',
      railBg:               '#252530',
      railHoverBg:          '#2E2E3E',
    },
    Modal: {
      colorBgElevated:      '#111117',
      colorBorder:          '#252530',
    },
    Form: {
      labelColor:           '#9191A4',
      labelFontSize:        13,
    },
    Checkbox: {
      colorPrimary:         '#00D4A8',
    },
  },
};
```

### 3.4 Spacing

Follow an 8px base unit:

```
4px  → xs (tight gaps, icon padding)
8px  → sm (small gaps)
12px → sm+ (label-input gap)
16px → md (default card padding, input groups)
24px → lg (section gutters)
32px → xl (card padding)
48px → 2xl (section top/bottom padding)
64px → 3xl (large section separation)
96px → hero vertical padding
```

### 3.5 UI Component Patterns

**Primary CTA Button** (teal, dark text, subtle glow):
```
background: #00D4A8
color: #09090F
border-radius: 10px
height: 52px
padding: 0 32px
font-weight: 600
box-shadow: 0 0 24px rgba(0,212,168,0.25)
hover → glow intensifies, slight scale up (1.01)
```

**Ghost/Outline Button** (border only, teal text):
```
background: transparent
border: 1px solid #252530
color: #FFFFFF
hover: border-color #00D4A8, color #00D4A8
```

**Stat Card** (dark glass-like):
```
background: #111117
border: 1px solid #252530
border-radius: 16px
padding: 32px
hover: border-color #3A3A4A, slight elevation
```

**Calculator Step Card**:
```
background: #111117
border: 1px solid #252530
border-radius: 16px
padding: 40px
max-width: 680px
centered on page
```

**Locked/Blurred Result Card**:
```
filter: blur(6px)
user-select: none
pointer-events: none
+ overlay div on top:
  background: rgba(9,9,15,0.85)
  display: flex + centered CTA
  backdrop-filter: blur(2px)
```

---

## 4. Project File Structure

```
property-lead-generation/
├── public/
│   └── favicon.ico
├── src/
│   ├── main.jsx                    ← Vite entry point, wraps app in ConfigProvider
│   ├── App.jsx                     ← Root layout, single page, no routing needed
│   ├── index.css                   ← Global resets, Google Font import, body bg
│   │
│   ├── theme/
│   │   ├── colors.js               ← Exported color constants
│   │   └── antdTheme.js            ← Ant Design dark theme config
│   │
│   ├── data/
│   │   └── benchmarks.js           ← Hardcoded city rent/fitout/FM benchmarks
│   │
│   ├── utils/
│   │   └── calculator.js           ← Pure calculation functions (no React)
│   │
│   ├── sections/                   ← Top-level page sections (not reusable widgets)
│   │   ├── HeroSection.jsx         ← Full-viewport dark hero, headline, CTA
│   │   ├── CalculatorSection.jsx   ← Multi-step calculator (Step 1 → Step 2 → Results)
│   │   ├── HowItWorksSection.jsx   ← 3-step explainer strip
│   │   └── FooterSection.jsx       ← Minimal dark footer
│   │
│   ├── components/                 ← Reusable, composable UI pieces
│   │   ├── calculator/
│   │   │   ├── StepIndicator.jsx   ← "Step 1 of 2" + progress dots
│   │   │   ├── Step1Basics.jsx     ← Company size, city, office type inputs
│   │   │   ├── Step2WorkPattern.jsx ← Office days, collaboration, growth inputs
│   │   │   ├── ResultsPanel.jsx    ← Free + locked results layout
│   │   │   ├── FreeResult.jsx      ← Individual visible stat card
│   │   │   ├── LockedResult.jsx    ← Blurred card with overlay
│   │   │   └── ScenarioTable.jsx   ← 3-column blurred comparison (fully locked)
│   │   │
│   │   ├── lead/
│   │   │   ├── LeadModal.jsx       ← Modal with contact form
│   │   │   ├── LeadForm.jsx        ← Form fields inside the modal
│   │   │   └── ThankYou.jsx        ← Post-submit thank-you screen
│   │   │
│   │   └── ui/
│   │       ├── TealAccent.jsx      ← <span> with teal color, used in headlines
│   │       ├── StatDisplay.jsx     ← Large number + label
│   │       └── SectionLabel.jsx    ← Small uppercase teal tag above headings
│   │
│   └── hooks/
│       └── useCalculator.js        ← Manages step state + calculation result state
│
├── references/
│   └── website.png                 ← Design reference (Zovi)
├── index.html
├── vite.config.js
├── package.json
└── PLAN.md                         ← This file
```

---

## 5. Benchmark Data

Hardcoded city benchmarks (used in calculation). All costs are estimates for illustration — can be updated easily in `src/data/benchmarks.js`.

```javascript
// src/data/benchmarks.js

export const CITIES = [
  // Europe
  { id: 'london',      label: 'London, UK',         rent: 850,  fitout: 2200, fm: 120, currency: '£', sqmLabel: 'sq ft', sqmFactor: 10.764 },
  { id: 'paris',       label: 'Paris, France',       rent: 600,  fitout: 1800, fm: 95,  currency: '€', sqmLabel: 'sqm',   sqmFactor: 1 },
  { id: 'amsterdam',   label: 'Amsterdam, NL',       rent: 450,  fitout: 1600, fm: 90,  currency: '€', sqmLabel: 'sqm',   sqmFactor: 1 },
  { id: 'berlin',      label: 'Berlin, Germany',     rent: 380,  fitout: 1400, fm: 80,  currency: '€', sqmLabel: 'sqm',   sqmFactor: 1 },
  { id: 'madrid',      label: 'Madrid, Spain',       rent: 320,  fitout: 1200, fm: 70,  currency: '€', sqmLabel: 'sqm',   sqmFactor: 1 },
  // APAC
  { id: 'singapore',   label: 'Singapore',           rent: 1100, fitout: 2400, fm: 140, currency: 'S$', sqmLabel: 'sqm',  sqmFactor: 1 },
  { id: 'sydney',      label: 'Sydney, Australia',   rent: 750,  fitout: 2000, fm: 110, currency: 'A$', sqmLabel: 'sqm',  sqmFactor: 1 },
  { id: 'hong_kong',   label: 'Hong Kong',           rent: 1400, fitout: 2600, fm: 160, currency: 'HK$', sqmLabel: 'sqm', sqmFactor: 1 },
  // Middle East
  { id: 'dubai',       label: 'Dubai, UAE',          rent: 500,  fitout: 1600, fm: 85,  currency: 'AED', sqmLabel: 'sqm', sqmFactor: 1 },
  // Americas
  { id: 'new_york',    label: 'New York, US',        rent: 1200, fitout: 2800, fm: 150, currency: '$',  sqmLabel: 'sq ft', sqmFactor: 10.764 },
  { id: 'san_francisco', label: 'San Francisco, US', rent: 1000, fitout: 2600, fm: 140, currency: '$',  sqmLabel: 'sq ft', sqmFactor: 10.764 },
  { id: 'toronto',     label: 'Toronto, Canada',     rent: 600,  fitout: 1800, fm: 95,  currency: 'CA$', sqmLabel: 'sqm', sqmFactor: 1 },
];

// rent = annual cost per sqm (GLA basis)
// fitout = one-time cost per sqm (NUA basis)
// fm = annual facilities management cost per sqm (NLA basis)

export const OFFICE_TYPES = [
  { id: 'open',     label: 'Open Plan',   description: 'Mostly open desking, minimal offices', nuaPerDesk: 8,  supportRatio: 0.25 },
  { id: 'mixed',    label: 'Mixed',       description: 'Balance of open desks and meeting rooms', nuaPerDesk: 10, supportRatio: 0.30 },
  { id: 'cellular', label: 'Cellular',    description: 'Private offices and focus rooms', nuaPerDesk: 14, supportRatio: 0.40 },
];

export const GROWTH_OPTIONS = [
  { id: 'stable',  label: 'Stable (0–5%)',    multiplier: 1.05 },
  { id: 'low',     label: 'Moderate (5–20%)', multiplier: 1.15 },
  { id: 'medium',  label: 'High (20–50%)',    multiplier: 1.30 },
  { id: 'rapid',   label: 'Rapid (50%+)',     multiplier: 1.50 },
];

// Desk sharing ratio by days in office
// key = days per week in office (1-5)
export const DESK_SHARING_RATIO = {
  1: 0.35,   // Very low attendance → heavy sharing
  2: 0.50,
  3: 0.65,
  4: 0.80,
  5: 1.00,   // Full attendance → 1:1
};

// NLA = NUA × nlaFactor (adds circulation, WC, reception)
export const NLA_FACTOR = 1.20;

// GLA = NLA × glaFactor (adds core, lifts, plant)
export const GLA_FACTOR = 1.25;
```

---

## 6. Calculation Logic

All calculations live in `src/utils/calculator.js` — pure functions, zero React dependencies, fully unit-testable.

### 6.1 Input Shape

```javascript
const inputs = {
  employees:    number,    // 1–5000
  cityId:       string,    // e.g. 'london'
  officeTypeId: string,    // 'open' | 'mixed' | 'cellular'
  daysPerWeek:  number,    // 1–5
  collaborationLevel: string, // 'low' | 'medium' | 'high' (affects support space)
  growthId:     string,    // 'stable' | 'low' | 'medium' | 'rapid'
};
```

### 6.2 Calculation Steps

```javascript
// Step 1: Desk sharing ratio
const sharingRatio = DESK_SHARING_RATIO[daysPerWeek]; // e.g. 0.65 for 3 days

// Step 2: Desks needed (before growth)
const baseDesks = Math.ceil(employees * sharingRatio);

// Step 3: Apply growth multiplier
const growthMultiplier = GROWTH_OPTIONS.find(g => g.id === growthId).multiplier;
const desksNeeded = Math.ceil(baseDesks * growthMultiplier);

// Step 4: Collaboration multiplier (adds extra support/collaboration space)
const collabMultipliers = { low: 1.0, medium: 1.15, high: 1.30 };
const collabMultiplier = collabMultipliers[collaborationLevel];

// Step 5: Area calculations
const officeType = OFFICE_TYPES.find(t => t.id === officeTypeId);
const city = CITIES.find(c => c.id === cityId);

// Net Usable Area = desks × sqm per desk
const nuaWorkstation = desksNeeded * officeType.nuaPerDesk;

// Support space (meeting rooms, collab, reception, breakout)
const nuaSupport = nuaWorkstation * officeType.supportRatio * collabMultiplier;

// Total NUA
const nua = Math.ceil(nuaWorkstation + nuaSupport);

// Net Lettable Area (adds circulation, WCs, lobbies)
const nla = Math.ceil(nua * NLA_FACTOR);

// Gross Lettable Area (adds core, lifts, plant rooms)
const gla = Math.ceil(nla * GLA_FACTOR);

// Step 6: Cost calculations
// Monthly rent
const annualRent = gla * city.rent;
const monthlyRent = Math.ceil(annualRent / 12);

// Fitout (one-time capital cost)
const fitoutCost = Math.ceil(nua * city.fitout);

// Annual FM cost
const annualFM = Math.ceil(nla * city.fm);
const monthlyFM = Math.ceil(annualFM / 12);

// Total Monthly Occupancy Cost
const monthlyTotal = monthlyRent + monthlyFM;

// Annual Total Occupancy Cost
const annualTotal = annualRent + annualFM;

// Area per person
const sqmPerPerson = Math.round((gla / employees) * 10) / 10;

// Benchmark indicator (industry average is ~10 sqm NUA per person)
const industryAvgNuaPerPerson = 10;
const actualNuaPerPerson = Math.round((nua / employees) * 10) / 10;
const efficiencyVsAverage = Math.round(((industryAvgNuaPerPerson - actualNuaPerPerson) / industryAvgNuaPerPerson) * 100);
// Positive = more efficient than average, Negative = less efficient

// Step 7: 3-scenario comparison (for locked section)
// Stays in current setup, Move Grade A, Move Grade B
const scenarios = [
  { name: 'Optimise in Place',  rentMultiplier: 1.0,  fitoutMultiplier: 0.6 },
  { name: 'Move — Grade A',     rentMultiplier: 1.2,  fitoutMultiplier: 1.0 },
  { name: 'Move — Grade B',     rentMultiplier: 0.85, fitoutMultiplier: 0.85 },
];
```

### 6.3 Output Shape

```javascript
const result = {
  // FREE (shown immediately)
  desksNeeded:           number,
  gla:                   number,   // sqm
  sqmPerPerson:          number,
  efficiencyVsAverage:   number,   // % (positive = more efficient)
  currency:              string,   // city currency symbol
  cityLabel:             string,

  // LOCKED (blurred until lead captured)
  nua:                   number,
  nla:                   number,
  monthlyRent:           number,
  fitoutCost:            number,
  monthlyFM:             number,
  monthlyTotal:          number,
  annualTotal:           number,
  scenarios:             Scenario[],  // 3 items
};
```

---

## 7. Section-by-Section Specification

### 7.1 HeroSection

**Layout**: Full viewport height (100vh), dark background, centered content.

**Elements (top to bottom)**:

1. **Navbar** (fixed, transparent → subtle glass on scroll)
   - Left: Logo text "PropCalc" or client logo placeholder in teal
   - Right: Ghost button "Talk to an expert →" (no routing — scrolls to contact or opens modal)
   - Height: 64px
   - On scroll >50px: `background: rgba(9,9,15,0.9)`, `backdrop-filter: blur(10px)`, border-bottom

2. **Main headline** (massive, centered):
   ```
   How much office space
   does your company
   <teal>actually need?</teal>
   ```
   - Font size: 80px desktop / 48px tablet / 36px mobile
   - Font weight: 800
   - "actually need?" in teal (#00D4A8)
   - Letter spacing: -2px

3. **Subheadline** (body text, muted):
   ```
   Get an instant estimate in 60 seconds.
   No sign-up required.
   ```
   - Color: #9191A4
   - Font size: 18px
   - Margin top: 24px

4. **CTA button row**:
   - Primary: "Calculate my space →" (teal filled, large)
   - Secondary: "How it works" (ghost)
   - Gap: 16px
   - Margin top: 40px
   - On click primary → smooth scroll to `#calculator`

5. **Trust stats strip** (3 stats, below CTA):
   ```
   250k+ sqm    |    15 cities    |    $2.1B+ modelled
   estimated    |    covered      |    in real estate costs
   ```
   - Displayed as 3 columns with dividers
   - Numbers in white, labels in muted grey
   - Border-top: 1px solid #252530
   - Margin top: 80px
   - Font: stat number 36px bold, label 13px

**Decorative elements**:
- Subtle radial gradient behind headline: `radial-gradient(ellipse 60% 40% at 50% 30%, rgba(0,212,168,0.06) 0%, transparent 70%)`
- Optional: very faint grid lines (1px lines, #1A1A24, 60px apart)

---

### 7.2 HowItWorksSection

**Layout**: Dark section, 3-column grid, full width.

**Content**:
- Section label: "HOW IT WORKS" (small teal uppercase)
- Heading: "Get your estimate in 3 steps"
- 3 cards:
  1. Number: 01 / Icon: form / Title: "Share the basics" / Body: "Tell us how many people, where, and how you work."
  2. Number: 02 / Icon: calculator / Title: "Instant calculation" / Body: "Our model runs 3 workspace scenarios in real time."
  3. Number: 03 / Icon: lock-open / Title: "Unlock your report" / Body: "Leave your details to get the full cost breakdown and speak to an expert."

**Cards**:
- Background: #111117
- Border: 1px solid #252530
- Number: large teal (48px, 800 weight, opacity 0.3 as bg, full opacity on hover)
- Hover: border teal, slight translateY(-2px)

---

### 7.3 CalculatorSection

**ID**: `#calculator`  
**Layout**: Centered card, max-width 680px, with step indicator above.

#### State machine (managed by `useCalculator` hook):

```
'step1' → 'step2' → 'results'
                         ↕
                    (lead modal toggles `isLocked`)
```

#### Step Indicator Component
- "Step 1 of 2" text + 2 dots (filled/outline)
- Animated progress: dot becomes filled with teal on active/complete step

#### Step 1: Company Basics

**Card title**: "Tell us about your company"

Fields:
1. **Number of employees** (required)
   - Ant Design InputNumber
   - Range: 1–10,000
   - Placeholder: "e.g. 150"
   - Helper: "Total headcount, including remote workers"

2. **City / Location** (required)
   - Ant Design Select with search
   - Options: all cities from `benchmarks.js`
   - Placeholder: "Select your city"
   - Helper: "Where your office will be located"

3. **Office type** (required)
   - 3 radio-card options (not standard radio — styled as card buttons)
   - Each card shows: icon + title + 1-line description
   - Options: Open Plan / Mixed / Cellular (from benchmarks.js)
   - Selected state: teal border, tealMuted background

**Next button**: "Next: Work pattern →" (primary, full width, disabled until all 3 filled)

**Transition**: Step card slides out left, Step 2 slides in from right (CSS translateX transition)

---

#### Step 2: Work Pattern

**Card title**: "How does your team work?"

Fields:
1. **Days in office per week** (required)
   - Ant Design Slider, marks at 1–5
   - Custom label below: dynamically changes
     - 1 day → "Remote-first culture"
     - 2 days → "Mostly remote"
     - 3 days → "Hybrid balance"
     - 4 days → "Office-led"
     - 5 days → "Fully in-office"
   - Default: 3

2. **Collaboration level** (required)
   - 3 styled card buttons (same pattern as office type)
   - Low: "Mostly focused work, few meetings"
   - Medium: "Mix of focused and collaborative"
   - High: "High collaboration, many meeting rooms"

3. **Expected growth** (required)
   - Ant Design Select
   - Options from `GROWTH_OPTIONS`
   - Placeholder: "Select growth scenario"

**Button row**:
- Back: "← Back" (ghost, left)
- Calculate: "Calculate my space →" (primary, right)
- On click Calculate → run `calculateResult(inputs)` → transition to results

---

#### Step 3: Results Panel

**Layout**: Wider than the input cards — max-width: 900px

**Sub-layout**:
```
┌─────────────────────────────────────────────────────────────────┐
│  "Here's your estimate, [City]"                                 │
│  Subtext: "Based on [N] people, [daysPerWeek] days/week"       │
│                                                                 │
│  FREE RESULTS GRID (2×2)                                       │
│  ┌─────────────────┐  ┌─────────────────┐                      │
│  │  Desks needed   │  │  Total area     │                      │
│  │  [N]            │  │  [N] sqm GLA    │                      │
│  └─────────────────┘  └─────────────────┘                      │
│  ┌─────────────────┐  ┌─────────────────┐                      │
│  │  Area/person    │  │  Efficiency vs  │                      │
│  │  [N] sqm        │  │  industry avg   │                      │
│  └─────────────────┘  └─────────────────┘                      │
│                                                                 │
│  ─────────────── LOCKED SECTION ────────────────────           │
│  ┌──────────────────────────────────────────────────┐          │
│  │  [BLURRED: Monthly rent, Fitout cost, Total TCO] │          │
│  │  [BLURRED: NUA / NLA / GLA breakdown]            │          │
│  │  ┌────────────────────────────────────────────┐  │          │
│  │  │         🔒 Unlock your full report         │  │          │
│  │  │  Leave your contact and get the complete   │  │          │
│  │  │  cost breakdown + expert recommendations.  │  │          │
│  │  │  [Get my full report →]                    │  │          │
│  │  └────────────────────────────────────────────┘  │          │
│  └──────────────────────────────────────────────────┘          │
│                                                                 │
│  ─────────── 3-SCENARIO COMPARISON (fully blurred) ─────────  │
│  [Table fully blurred, lock icon overlay, same CTA]            │
│                                                                 │
│  ───────────────────────────────────────────────────           │
│  "Want to recalculate?" → [Start over] button (ghost)          │
└─────────────────────────────────────────────────────────────────┘
```

**Free Result Card design**:
- Background: #111117
- Border: 1px solid #252530
- Padding: 28px 32px
- Stat number: 44px, 700 weight, white
- Unit (sqm, desks): 18px, muted grey, margin-left 4px
- Label: 12px, uppercase, 1.5 letter-spacing, muted grey
- Icon: small teal icon top-left

**Efficiency indicator**:
- If more efficient than avg: "↑ 12% more efficient than market average" in teal
- If less efficient: "↓ 8% above market average" in amber
- Small bar graphic showing position

**Locked Section wrapper**:
```css
.locked-wrapper {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}
.locked-content {
  filter: blur(5px);
  user-select: none;
  pointer-events: none;
  opacity: 0.6;
}
.lock-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(9, 9, 15, 0.82);
  backdrop-filter: blur(2px);
  border: 1px solid #252530;
  border-radius: 16px;
  gap: 16px;
}
```

**After lead capture** (`isLocked = false`):
- Blur removed (CSS transition: filter 0.5s ease)
- Lock overlay fades out (opacity: 0 → removed from DOM)
- Teal success toast: "Your full report is now unlocked"

---

### 7.4 LeadModal

**Trigger**: "Get my full report →" button on any lock overlay

**Modal props**:
- Width: 520px
- Centered
- No close button (force decision — close only via X)
- Background: #111117

**Header**:
- Small teal label: "FREE REPORT"
- Headline: "Unlock your full cost breakdown"
- Subtext: "We'll send a personalised summary to your email — no spam, ever."

**Form fields**:
1. **Full name** (required) — Text input
2. **Work email** (required) — Email input, validates format + blocks free domains (gmail, hotmail, yahoo) with warning (not hard block)
3. **Company name** (required) — Text input
4. **Phone number** (optional) — Text input, placeholder "+1 555 000 0000"
5. **Checkbox**: "I'd like to be contacted by a workspace consultant" (default: checked)
6. **Privacy note**: "By submitting you agree to our Privacy Policy. We never sell your data."

**Submit button**: "Send me the report →" (primary, full width)

**On submit**:
- Validate form (Ant Design Form)
- Show loading spinner on button
- Simulate 1.2s delay (fake API call — `setTimeout`)
- Replace modal content with `ThankYou` component
- After 2.5s, close modal
- Set `isLocked = false` in parent state → results unblur

**What actually happens with the lead data**:
- Phase 1 (MVP): `console.log(leadData)` — no backend
- Phase 2: POST to a webhook URL (e.g., n8n, Zapier, Make.com)
- Phase 3: Direct CRM integration (HubSpot / Pipedrive)
- The submit handler is isolated in `src/components/lead/LeadForm.jsx` so the destination is easy to swap

**ThankYou Component**:
- Large teal checkmark icon (animated draw-in with CSS stroke-dashoffset)
- Heading: "You're all set!"
- Body: "Your full report is now unlocked above. A workspace expert will be in touch within 1 business day."
- Small: "Already have questions? [Book a call →]" (link to Calendly or email — placeholder)

---

### 7.5 FooterSection

**Layout**: Dark, minimal, 2-column

**Left**: Logo + tagline "Smart workspace decisions start here."  
**Right**: Links — Privacy Policy / Terms / Contact (all `href="#"` placeholders)  
**Bottom bar**: Copyright line + "Built for workspace consultants"

---

## 8. State Management

### `useCalculator` Hook

All calculator state lives here. Returns values and handlers to `CalculatorSection`.

```javascript
// src/hooks/useCalculator.js

const useCalculator = () => {
  // Step state
  const [step, setStep] = useState('step1');  // 'step1' | 'step2' | 'results'

  // Input state
  const [inputs, setInputs] = useState({
    employees:          null,
    cityId:             null,
    officeTypeId:       null,
    daysPerWeek:        3,
    collaborationLevel: null,
    growthId:           null,
  });

  // Results state
  const [result, setResult] = useState(null);

  // Lead/lock state
  const [isLocked, setIsLocked] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Derived: step1 complete?
  const step1Valid = inputs.employees && inputs.cityId && inputs.officeTypeId;
  // Derived: step2 complete?
  const step2Valid = inputs.daysPerWeek && inputs.collaborationLevel && inputs.growthId;

  const handleStep1Next = () => setStep('step2');
  const handleStep2Back = () => setStep('step1');

  const handleCalculate = () => {
    const calcResult = calculateResult(inputs);  // from utils/calculator.js
    setResult(calcResult);
    setStep('results');
  };

  const handleReset = () => {
    setStep('step1');
    setResult(null);
    setInputs({ employees: null, cityId: null, officeTypeId: null, daysPerWeek: 3, collaborationLevel: null, growthId: null });
    setIsLocked(true);
    setLeadSubmitted(false);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
  const handleLeadSubmit = (leadData) => {
    // Log or send lead
    console.log('[Lead captured]', { ...leadData, inputs, result });
    setLeadSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsLocked(false);
    }, 2500);
  };

  return {
    step, inputs, result, isLocked, isModalOpen, leadSubmitted,
    step1Valid, step2Valid,
    setInputs,
    handleStep1Next, handleStep2Back, handleCalculate, handleReset,
    handleOpenModal, handleCloseModal, handleLeadSubmit,
  };
};
```

---

## 9. Responsive Breakpoints

| Breakpoint | Width | Changes |
|-----------|-------|---------|
| Mobile | < 640px | Hero headline 36px, single-column stats, calculator card full-width, results 1-column grid |
| Tablet | 640px–1024px | Hero headline 48px, 2-column results grid |
| Desktop | > 1024px | Hero headline 80px, full layout as designed |

**Mobile-specific adjustments**:
- Nav: hide secondary links, show hamburger (Ant Design Drawer)
- Hero: remove grid background
- Calculator card: padding 24px (reduced from 40px)
- Results grid: 1×4 (stacked) instead of 2×2
- Scenario table: horizontal scroll

---

## 10. Animations & Micro-interactions

All animations via CSS only (no library):

```css
/* Step transition (card slides) */
.step-enter { transform: translateX(30px); opacity: 0; }
.step-enter-active { transform: translateX(0); opacity: 1; transition: all 0.3s ease; }
.step-exit { transform: translateX(-30px); opacity: 0; transition: all 0.3s ease; }

/* Result card appear (staggered) */
.result-card { 
  opacity: 0; 
  transform: translateY(16px); 
  animation: fadeUp 0.4s ease forwards; 
}
.result-card:nth-child(1) { animation-delay: 0.0s; }
.result-card:nth-child(2) { animation-delay: 0.1s; }
.result-card:nth-child(3) { animation-delay: 0.2s; }
.result-card:nth-child(4) { animation-delay: 0.3s; }

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}

/* Unblur transition */
.locked-content {
  transition: filter 0.6s ease, opacity 0.6s ease;
}
.locked-content.unlocked {
  filter: none;
  opacity: 1;
}

/* Stat number count-up */
/* Implemented via JS (requestAnimationFrame counter in FreeResult component) */
```

**Number count-up** on results appear:
- Each stat number animates from 0 to final value over 1.2s
- Easing: `easeOutExpo`
- Implemented with a small custom hook `useCountUp(targetValue, duration)`

---

## 11. SEO & Meta

Even as a lead gen tool, basic meta matters (if hosted publicly):

```html
<!-- index.html -->
<title>Office Space Calculator — Get an Instant Estimate</title>
<meta name="description" content="Free commercial office space calculator. Estimate your ideal workspace size and costs in 60 seconds. No sign-up needed." />
<meta property="og:title" content="Office Space Calculator" />
<meta property="og:description" content="Instant workspace size and cost estimate for your team." />
<meta name="robots" content="index, follow" />
```

---

## 12. Lead Webhook (Phase 2 Placeholder)

The `LeadForm.jsx` submit handler is structured so it can be switched from `console.log` to a real endpoint with one change:

```javascript
// src/components/lead/LeadForm.jsx

const LEAD_WEBHOOK_URL = import.meta.env.VITE_LEAD_WEBHOOK_URL || null;

const submitLead = async (data) => {
  if (LEAD_WEBHOOK_URL) {
    await fetch(LEAD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } else {
    console.log('[Lead]', data);
  }
};
```

Phase 2 options (no backend needed):
- **n8n** (self-hosted or cloud) → Notion + Slack notification
- **Zapier / Make.com** → Google Sheets + email
- **HubSpot Forms API** → Direct CRM entry
- **Resend / EmailJS** → Email to sales team

---

## 13. Implementation Order (Session Guide)

This is broken into independent sessions. Each session can be started fresh with this PLAN.md as context.

### Session 1 — Project scaffold + design system
- `npm create vite@latest . -- --template react`
- Install dependencies
- Set up `src/theme/colors.js` and `src/theme/antdTheme.js`
- Set up `index.css` (font import, body background, global resets)
- Wrap app in `ConfigProvider` with dark theme
- Verify blank dark page renders

### Session 2 — Hero section
- Build `HeroSection.jsx` with Navbar
- Implement scroll-triggered navbar glass effect
- Implement stat strip
- Verify responsive layout

### Session 3 — Calculator Step 1 + Step 2
- Build `useCalculator` hook (state only, no calculation yet)
- Build `StepIndicator.jsx`
- Build `Step1Basics.jsx` with 3 fields + validation
- Build `Step2WorkPattern.jsx` with 3 fields + validation
- Step transition animation
- Wire up Next/Back/Calculate buttons

### Session 4 — Calculator logic + free results
- Implement `src/data/benchmarks.js`
- Implement `src/utils/calculator.js`
- Build `ResultsPanel.jsx`
- Build `FreeResult.jsx` with count-up animation
- Verify calculation is correct for test inputs

### Session 5 — Locked results + Lead modal
- Build `LockedResult.jsx` + blur/overlay styling
- Build `ScenarioTable.jsx` (blurred version)
- Build `LeadModal.jsx`, `LeadForm.jsx`, `ThankYou.jsx`
- Wire modal open/close/submit
- Implement unlock flow (unblur on submit)

### Session 6 — How it works section + Footer
- Build `HowItWorksSection.jsx`
- Build `FooterSection.jsx`
- Polish overall page layout

### Session 7 — Responsive + polish
- Test all breakpoints (mobile, tablet, desktop)
- Refine animations and transitions
- Check Ant Design dark theme consistency
- Cross-browser check (Chrome, Firefox, Safari)

### Session 8 — Lead webhook integration
- Add `VITE_LEAD_WEBHOOK_URL` to `.env.local`
- Wire `submitLead()` to actual endpoint
- Test lead flow end-to-end

---

## 14. Open Questions / Decisions for Client

1. **Brand name**: "PropCalc", "SpaceCalc", or client's actual brand?
2. **Logo**: Client logo or text-only?
3. **Cities**: Which cities should be in the list? Any to remove?
4. **Benchmark data**: Should rent/fitout numbers be verified or use approximations for now?
5. **Lead destination**: Where should captured leads go? (Email? CRM? Spreadsheet?)
6. **Free domain blocking**: Should we warn or hard-block personal emails (gmail etc.)?
7. **"Book a call" link**: Is there a Calendly or similar to link to?
8. **Privacy policy**: Does one exist? Link needed in footer and lead form.
9. **Analytics**: Should we add Plausible / Google Analytics / PostHog?
10. **Hosting**: Vercel, Netlify, Azure Static Web Apps?

---

## 15. Out of Scope (Explicitly)

The following are NOT in scope for this MVP:

- User authentication or accounts
- Backend API or database
- Saving/loading calculator results
- PDF export (reserved for post-lead-capture email)
- Admin panel to edit benchmarks
- Multiple languages / i18n
- Dark/light mode toggle
- Accessibility audit (WCAG) — basic contrast only
- Unit tests

---

*End of plan. Use this file at the start of each implementation session.*
