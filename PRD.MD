# 🌿 SAGE — Product Requirements Document (PRD)
**The AI Tutor That Never Forgets**
`Version 1.0` · `UI & Frontend Only` · `Mock Data Phase`

---

## Meta

| Field | Value |
|---|---|
| Document Type | Product Requirements Document (PRD) |
| Scope | UI, Pages, Components, Mock Data — No Backend |
| Product Name | Sage |
| Version | 1.0 — Mock Data Phase (Supabase replaces mock in v2) |
| Stack | Next.js 14, React, shadcn/ui, Tailwind CSS |
| Status | Draft — Ready for UI Development |

---

## 1. Product Overview

Sage is a personalised AI tutor for college and school students. It knows your syllabus, remembers every topic you studied, tracks your mistakes across sessions, plans your schedule around exam dates, and teaches conversationally. The core differentiator is **persistent memory** — the AI builds a true, growing model of every student over time.

This PRD covers **only the frontend UI layer**. All data is powered by mock JSON during this phase and will be replaced by Supabase in v2. No backend, no API calls, no LLM integrations are in scope here.

---

## 2. Goals & Non-Goals

### Goals
- Define every page, layout, and component in the Sage UI
- Specify mock data structures for all dynamic content
- Describe the design system: colors, typography, spacing, motion
- Provide a complete frontend tech stack specification
- Be the single source of truth for UI development

### Non-Goals
- No backend API design
- No Hindsight/Vectorize integration
- No Groq LLM prompt engineering
- No real authentication (mock auth only)
- No Supabase schema design

---

## 3. Frontend Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 14 (App Router) | Routing, server components, layouts |
| Language | TypeScript | Type safety across all components |
| Styling | Tailwind CSS | Utility-first, dark-mode classes |
| Components | shadcn/ui | Accessible primitives: Dialog, Sheet, Card, Calendar |
| Icons | Lucide React | Consistent icon set throughout |
| Fonts | Geist (Vercel) | Optimised for dark-mode legibility |
| Calendar | react-big-calendar | Google Calendar-style view in Planner |
| Charts | Recharts | Proficiency bars and XP chart on Profile |
| Animations | Framer Motion | Page transitions, card stagger, bar fills |
| State | Zustand | Global state for user + mock data |
| Mock Data | Local JSON in `/lib/mock/` | Replaced by Supabase queries in v2 |

### Project Structure

```
/app
  /(auth)/login           → Login page
  /onboarding             → 8-step onboarding flow
  /planner                → Planner chat + calendar
  /mentor                 → Subject grid
  /mentor/[subject]       → 3-panel tutor view
  /tests                  → Test mode selector + interface
  /profile                → Analytics + test history
  /memory                 → Memory panel full page

/components
  /ui                     → shadcn/ui primitives
  /sage                   → Sage-specific components

/lib
  /mock                   → All mock JSON data files
  /store                  → Zustand global state

/styles                   → Tailwind config + global CSS
```

---

## 4. Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Background primary | `#0D0D0F` | Page background |
| Background surface | `#161618` | Cards, panels, sidebars |
| Background elevated | `#1F1F22` | Modals, dropdowns, hover |
| Accent violet | `#7C6AF5` | CTAs, active states, Sage identity |
| Accent light | `#EAE8FD` | Violet tints on dark surfaces |
| Amber | `#F5A524` | Streak, XP, warnings |
| Green | `#17C964` | Success, correct answers, completed |
| Red | `#F31260` | Errors, wrong answers, urgent |
| Text primary | `#FFFFFF` | Headings, labels |
| Text secondary | `#A1A09A` | Body text, descriptions |
| Text muted | `#555553` | Placeholders, disabled states |
| Border default | `rgba(255,255,255,0.1)` | Card and panel borders |

### Typography

| Role | Specification |
|---|---|
| Hero | Geist, 48–56px, weight 500 |
| H1 | Geist, 32px, weight 500 |
| H2 | Geist, 24px, weight 500 |
| H3 | Geist, 18px, weight 500 |
| Body | Geist, 15px, weight 400, line-height 1.7 |
| Caption | Geist, 12px, weight 400, color text-secondary |
| Code/Mono | Geist Mono, 13px — used in memory panel |

> **Rule:** Only weights 400 and 500. Never 600 or 700 — too heavy on dark backgrounds.

### Motion & Animation

| Element | Animation |
|---|---|
| Page entry | `fade + translateY(8px) → 0`, 200ms, ease-out |
| Card stagger | Each card delays 80ms more than previous |
| Proficiency bar fill | `0% → value`, 600ms, ease-in-out |
| Wrong answer | shake `±4px`, 3 cycles, 300ms |
| XP float | +XP badge floats up and fades, 600ms |
| Tab switch | Crossfade content, 150ms |

### Spacing & Radius

- Base unit: 4px. All spacing uses multiples: 4, 8, 12, 16, 24, 32, 48, 64px
- Cards: 12px radius · Buttons: 8px radius · Pills/chips: 20px (full round) · Inputs: 8px radius
- Cards use 16px internal padding. Sidebar width: 240px fixed.

---

## 5. Pages & Layouts

### 5.1 Login  `/login`

Full-screen dark centered card. Sage logo + tagline. Name input field. Two demo user pills below input: **Aryan** and **Priya** — clicking pre-fills name. Single CTA: "Enter Sage". On submit, `userId` stored in `localStorage`. If mock data exists → `/planner`. If new user → `/onboarding`.

**Components:**
- `LogoLockup` — logo icon + wordmark
- `DemoUserPill` — clickable pill with avatar initials
- `NameInput` — text field with focus ring
- `PrimaryCTA` — full-width violet button

---

### 5.2 Onboarding  `/onboarding`

8-step wizard. Full-screen per step. One thing per screen. Tap-cards auto-advance. Progress bar shows Step X of 8. Framer Motion slide + fade transitions between steps.

| Step | Screen | UI Pattern |
|---|---|---|
| 1 | Name Confirm | Hero greeting + single large CTA button |
| 2 | Education Level | 4 large tap-cards: Class 10–12, UG, PG, Competitive |
| 3 | Curriculum | Dynamic 4-card grid based on Step 2 |
| 4 | Semester/Year | Tap-cards: Sem 1–8 for engineering, Year 1–4 others |
| 5 | Syllabus Upload | Drag-and-drop PDF zone + pre-loaded template pills |
| 6 | Subject Confirm | Staggered card animation, deselect/add manually |
| 7 | Topics Known | Horizontal pill selects per subject, skip option |
| 8 | Profile Reveal | Animated proficiency bars + weak area badges + CTA |

**Components:**
- `StepProgress` — top bar showing X of 8
- `TapCard` — large selectable card with checkmark animation on tap
- `SyllabusDropzone` — PDF drag-and-drop with animated processing state
- `SubjectCard` — subject name + chapter count + deselect button
- `TopicPill` — horizontal pill chip, toggles selected/unselected
- `ProfileRevealBar` — animated proficiency bar with label
- `WeakAreaBadge` — colored badge showing weak topic

---

### 5.3 Planner  `/planner`

Three-panel layout. Left: sidebar nav. Centre: chat interface with Daily Briefing Card at top and message input at bottom. Right: monthly calendar above, today's schedule below.

```
┌──────────┬──────────────────────────┬───────────────────┐
│ Sidebar  │  PLANNER CHAT            │ Calendar (month)  │
│          │                          │                   │
│ Planner  │  [Daily Briefing Card]   │ Scheduler (today) │
│ Mentor   │                          │                   │
│ Tests    │  [Chat messages...]      │ [Task rows...]    │
│ Profile  │                          │                   │
│ 🧠       │  [Input] [Chips]         │                   │
└──────────┴──────────────────────────┴───────────────────┘
```

**Components:**
- `DailyBriefingCard` — streak, name, last subject, upcoming exam, weakest topic. Dismissible.
- `PlannerChatBubble` — AI and user message bubbles with timestamps
- `QuickActionChips` — 4 chips: "Plan my week", "Add exam", "What to study today?", "Quiz me"
- `SchedulerPanel` — today's tasks as clickable rows → navigates to `/mentor/[subject]` with topic pre-loaded
- `MonthlyCalendar` — react-big-calendar, color-coded: red=exam, green=done, blue=planned
- `ScheduleDiffCard` — proposed schedule change with Accept / Reject buttons
- `ChatInput` — text input + send button

---

### 5.4 Mentor Grid  `/mentor`

Full-page grid of subject cards. 3 columns desktop, 2 tablet, 1 mobile. Each card: gradient cover, subject name, chapter count badge, last studied date, proficiency bar at bottom. Hover reveals overlay with stats.

**Components:**
- `SubjectCard` — cover gradient, name, chapter badge, last-studied date, proficiency bar
- `SubjectCardHover` — overlay showing: proficiency %, weak topic count, last score

---

### 5.5 Mentor Subject  `/mentor/[subject]`

Three-panel layout: Sources left, Chat centre, Studio right.

```
┌───────────┬────────────────────────┬──────────────────┐
│ Sources   │ CHAT — Subject > Ch.N  │ STUDIO           │
│           │                        │                  │
│ PDF ✓     │ [Hindsight Strip]      │ [Flashcards]     │
│           │                        │ [Summary]        │
│ [+ Add]   │ [Opening message...]   │ [Mind Map] ···   │
│           │                        │ [Slide Deck] ··· │
│ ─────     │ [Chat messages...]     │ [Quiz →]         │
│ History   │                        │ ──────────────   │
│ strip     │ [Module dropdown]      │ 🍅 Pomodoro      │
│           │ [Input]                │    25:00         │
└───────────┴────────────────────────┴──────────────────┘
```

**Left Panel — Sources:**
- `SourceItem` — syllabus PDF with checkmark
- `AddSourceButton` — opens file upload dialog
- `HindsightStrip` — last studied, weak areas, score trend (from mock data)

**Centre Panel — Chat:**
- `ModuleDropdown` — select chapter/topic
- `ChatMessage` — AI teacher-style bubbles
- `OpeningMessage` — personalised greeting referencing last session
- `TeachingCTA` — "Ready to take a test?" prompt after teaching

**Right Panel — Studio:**
- `FlashcardStack` — flip card: term front, definition back
- `SummaryCard` — topic summary text
- `MindMapPlaceholder` — static UI, not functional in v1
- `SlideDeckPlaceholder` — static UI, not functional in v1
- `QuizLaunchButton` — opens test with subject/topic pre-selected
- `PomodoroTimer` — 25/5/15 min modes, Start / Pause / Reset
- `MoodCheckin` — post-session modal: Great / Mixed / Struggled

---

### 5.6 Tests  `/tests`

Mode selection screen first, then full-screen test interface.

**Mode Selection:**
- `ModeCard` — two large cards: "Student-Designed" and "Mentor-Assigned"
- `TestConfigForm` — subject dropdown, topic dropdown, question count slider (5–20), time limit selector

**Test Interface:**
```
┌──────────────────────────────────────────────────────┐
│  Timer: 14:23       Operating Systems     [Submit]   │
│                                                      │
│  Question 3 of 10                                    │
│                                                      │
│  Which scheduling algorithm gives minimum            │
│  average waiting time for known job set?             │
│                                                      │
│  [A. FCFS]    [B. SJF]                              │
│  [C. Round Robin]   [D. Priority]                   │
│                                                      │
│  [← Prev]  1  2  ●3  4  5  6  7  8  9  10  [Next→] │
└──────────────────────────────────────────────────────┘
```

- `TestHeader` — timer, subject name, Submit button
- `QuestionCard` — question text
- `OptionTile` — 4 MCQ options with hover + selected states
- `PillNav` — numbered pills for all questions, jump navigation
- `TimeWarningOverlay` — 10-second countdown overlay before auto-submit

**Results Screen:**
- `ScoreBadge` — large: "7/10 — 70%"
- `QuestionReview` — full Q&A list, green ✓ / red ✗ per question
- `AIInsightCard` — one-sentence AI insight from mock data
- `ResultCTA` — "Go to Mentor" button + "Skip" button

---

### 5.7 Profile  `/profile`

Analytics dashboard. Header with streak and XP. Proficiency bars with AI insights. Test history. Link to Memory Panel.

**Components:**
- `ProfileHeader` — avatar, name, education level, 🔥 streak, XP total
- `ProficiencyBar` — subject name, animated bar (violet <60%, amber 60–79%, green 80%+), %, AI insight below
- `TestHistoryRow` — date, subject, score, time taken, View button
- `ViewMemoryButton` — links to `/memory`
- `XPChart` — Recharts bar chart: XP earned per day for last 7 days (mock data)
- `BadgeGrid` — earned badges: "First Quiz", "7-Day Streak", "Weak Topic Conquered"

---

### 5.8 Memory Panel  `/memory`

Accessible as a full page OR as a sidebar drawer from anywhere (triggered by 🧠 icon in sidebar). Shows all 4 Hindsight memory types with a summary card at top.

**Components:**
- `MemorySummaryCard` — AI-generated overview paragraph from mock reflectSummary
- `MemoryTypeSection` — collapsible section for each type: World, Experiences, Observations, Opinions
- `MemoryEntry` — single memory row with timestamp and category badge
- `ConfidenceBadge` — for Opinions: shows confidence score e.g. `0.91`
- `MemoryDrawer` — shadcn/ui Sheet, slides in from left via sidebar brain icon

---

## 6. Sidebar & Navigation

Fixed left sidebar, 240px wide. Dark surface background `#161618`. Always visible desktop. Collapses to icons-only on tablet. Hidden on mobile with bottom nav bar.

| Item | Icon | Route |
|---|---|---|
| Sage logo + wordmark | — | — |
| Planner | Calendar | `/planner` |
| Mentor | Book | `/mentor` |
| Tests | Clipboard | `/tests` |
| Profile | User | `/profile` |
| Memory | Brain 🧠 | Opens drawer |
| Streak | 🔥 + count | Always visible |
| User avatar + name | — | Bottom of sidebar |

---

## 7. Mock Data Specification

All dynamic content lives in `/lib/mock/`. Two pre-seeded users: **Aryan** (3 weeks of rich history) and **Priya** (fresh, minimal data).

### `users.json`
```json
{
  "aryan": {
    "userId": "user_aryan",
    "name": "Aryan Sharma",
    "educationLevel": "Undergraduate",
    "curriculum": "Engineering",
    "semester": 3,
    "subjects": [
      { "id": "iot", "name": "IOT", "chapters": ["Ch.1 Intro", "Ch.2 Sensors", "Ch.3 Transmission", "Ch.4 Applications"] },
      { "id": "ds", "name": "Data Structures", "chapters": ["Arrays", "Linked Lists", "Trees", "Graphs"] },
      { "id": "os", "name": "Operating Systems", "chapters": ["Processes", "Scheduling", "Memory", "File Systems"] },
      { "id": "dbms", "name": "DBMS", "chapters": ["ER Model", "Normalisation", "SQL", "Transactions"] },
      { "id": "cn", "name": "Computer Networks", "chapters": ["OSI Model", "TCP/IP", "Routing", "Application Layer"] }
    ],
    "streakCount": 12,
    "xpTotal": 2340,
    "onboardingComplete": true
  },
  "priya": {
    "userId": "user_priya",
    "name": "Priya Nair",
    "educationLevel": "Class 10-12",
    "curriculum": "CBSE",
    "semester": null,
    "subjects": [
      { "id": "physics", "name": "Physics", "chapters": ["Mechanics", "Optics", "Electricity", "Modern Physics"] },
      { "id": "chemistry", "name": "Chemistry", "chapters": ["Organic", "Inorganic", "Physical"] },
      { "id": "maths", "name": "Mathematics", "chapters": ["Calculus", "Algebra", "Probability"] }
    ],
    "streakCount": 2,
    "xpTotal": 180,
    "onboardingComplete": true
  }
}
```

---

### `mock_chats_planner.json`
Array of conversation objects per userId. Each has messages with `role` (user/ai), `content`, and `timestamp`.

Pre-written exchanges included:
- "What should I study this week?" → AI responds with exam-aware, memory-backed plan
- "I have an IOT exam in 4 days" → AI acknowledges, updates calendar, suggests schedule
- "Plan my week" → AI returns a 5-day plan with subject and duration
- "Add OS exam on April 20th" → AI confirms, calendar event appears

```json
{
  "aryan": [
    {
      "id": "chat_001",
      "timestamp": "2026-03-18T09:00:00Z",
      "messages": [
        { "role": "user", "content": "What should I study this week?", "timestamp": "2026-03-18T09:00:00Z" },
        { "role": "ai", "content": "Your IOT exam is in 4 days. Based on your last 3 quizzes, you consistently miss application-level questions — specifically VSWR and antenna gain. I'd suggest 2 focused IOT sessions today and tomorrow targeting those topics, then a revision quiz on Thursday. Want me to add that to your schedule?", "timestamp": "2026-03-18T09:00:05Z" },
        { "role": "user", "content": "Yes, add it.", "timestamp": "2026-03-18T09:00:30Z" },
        { "role": "ai", "content": "Done! I've added: IOT — VSWR & Antenna Gain (45 min) for today and tomorrow, plus a Revision Quiz on Thursday. You'll see them in your schedule on the right.", "timestamp": "2026-03-18T09:00:35Z" }
      ]
    }
  ]
}
```

---

### `mock_chats_mentor.json`
Per userId, per subject. Array of sessions with `topic`, `messages`, `durationMinutes`.

Pre-written AI teaching content for:
- **IOT Ch.3** — VSWR explanation, antenna gain, propagation delay (includes a re-explain signal)
- **DS Trees** — Binary tree traversal, BFS vs DFS
- **OS Scheduling** — FCFS, SJF, Round Robin with examples

```json
{
  "aryan": {
    "iot": [
      {
        "sessionId": "session_iot_001",
        "topic": "Ch.3 Transmission",
        "date": "2026-03-17T20:00:00Z",
        "durationMinutes": 30,
        "openingMessage": "Welcome back, Aryan. Last time you asked me to re-explain VSWR twice. Want to start there or move to Chapter 4?",
        "messages": [
          { "role": "ai", "content": "Let's talk about VSWR — Voltage Standing Wave Ratio. It measures how efficiently an antenna transmits power. A VSWR of 1:1 is perfect — all power is transmitted. A higher ratio means some power is reflected back.", "timestamp": "2026-03-17T20:01:00Z" },
          { "role": "user", "content": "Can you explain that again? I still don't fully get it.", "timestamp": "2026-03-17T20:04:00Z", "isReexplain": true },
          { "role": "ai", "content": "Sure! Think of it like a garden hose. If the nozzle fits perfectly, all water flows out — VSWR 1:1. If there's a mismatch, some water splashes back at you — that's the reflected power. The ratio tells you how much splashback there is.", "timestamp": "2026-03-17T20:04:10Z" }
        ]
      }
    ]
  }
}
```

---

### `mock_tests.json`
Array of completed tests per userId.

```json
{
  "aryan": [
    {
      "testId": "test_001",
      "subject": "IOT",
      "topic": "Ch.3 Transmission",
      "mode": "student-designed",
      "date": "2026-03-15T21:00:00Z",
      "durationSeconds": 720,
      "totalQuestions": 10,
      "score": 4,
      "aiInsight": "You understand IOT theory well but consistently miss application-level questions. VSWR and antenna gain are your biggest gaps right now.",
      "questions": [
        {
          "id": "q1",
          "text": "VSWR of 1:1 indicates what condition in an antenna system?",
          "options": ["Total reflection", "Perfect impedance match", "Partial absorption", "Signal loss"],
          "correct": "Perfect impedance match",
          "userAnswer": "Total reflection",
          "isCorrect": false
        },
        {
          "id": "q2",
          "text": "What does antenna gain measure?",
          "options": ["Signal frequency", "Power amplification in a direction", "Cable resistance", "Modulation depth"],
          "correct": "Power amplification in a direction",
          "userAnswer": "Power amplification in a direction",
          "isCorrect": true
        }
      ]
    },
    {
      "testId": "test_002",
      "subject": "Data Structures",
      "topic": "Trees",
      "mode": "mentor-assigned",
      "date": "2026-03-16T20:30:00Z",
      "durationSeconds": 540,
      "totalQuestions": 8,
      "score": 7,
      "aiInsight": "Strong on traversal theory. BFS vs DFS trade-offs in weighted graphs is the one remaining gap.",
      "questions": []
    },
    {
      "testId": "test_003",
      "subject": "Operating Systems",
      "topic": "Scheduling",
      "mode": "student-designed",
      "date": "2026-03-18T19:00:00Z",
      "durationSeconds": 660,
      "totalQuestions": 10,
      "score": 6,
      "aiInsight": "FCFS and Priority are solid. Round Robin edge cases — especially time quantum impact on throughput — are the consistent weak point.",
      "questions": []
    }
  ]
}
```

---

### `mock_schedule.json`
Per userId. Tasks and calendar events.

```json
{
  "aryan": {
    "tasks": [
      { "id": "t1", "date": "2026-03-20", "subject": "IOT", "subjectId": "iot", "topic": "Ch.3 VSWR & Antenna Gain", "estimatedMinutes": 45, "mode": "Lesson", "status": "pending" },
      { "id": "t2", "date": "2026-03-20", "subject": "Data Structures", "subjectId": "ds", "topic": "Graphs", "estimatedMinutes": 30, "mode": "Quiz", "status": "pending" },
      { "id": "t3", "date": "2026-03-19", "subject": "Operating Systems", "subjectId": "os", "topic": "Round Robin", "estimatedMinutes": 40, "mode": "Revision", "status": "done" }
    ],
    "calendarEvents": [
      { "id": "e1", "date": "2026-03-24", "subject": "IOT", "type": "exam", "color": "red", "label": "IOT Exam" },
      { "id": "e2", "date": "2026-04-10", "subject": "Operating Systems", "type": "exam", "color": "red", "label": "OS Exam" }
    ]
  }
}
```

---

### `mock_proficiency.json`
Per userId, per subject.

```json
{
  "aryan": {
    "iot":  { "percentage": 62, "phase": 3, "trend": "up", "aiInsight": "Strong in theory-based questions. Consistently misses application-level IOT problems — VSWR and antenna gain are the gaps.", "weakTopics": ["VSWR", "Antenna Gain", "Propagation Delay"], "lastStudied": "2026-03-17", "testCount": 3 },
    "ds":   { "percentage": 78, "phase": 3, "trend": "up", "aiInsight": "Strong in sorting and basic trees. Graph traversal edge cases are the remaining weak area.", "weakTopics": ["Graph BFS/DFS", "Dijkstra"], "lastStudied": "2026-03-16", "testCount": 2 },
    "os":   { "percentage": 64, "phase": 3, "trend": "up", "aiInsight": "OS scores improving 3 weeks running. Round Robin time quantum problems are the last gap.", "weakTopics": ["Round Robin", "Memory Management"], "lastStudied": "2026-03-18", "testCount": 3 },
    "dbms": { "percentage": 81, "phase": 3, "trend": "stable", "aiInsight": "Solid understanding overall. Transactions and ACID properties are very strong.", "weakTopics": [], "lastStudied": "2026-03-14", "testCount": 2 },
    "cn":   { "percentage": 45, "phase": 2, "phaseLabel": "Early estimate", "trend": "stable", "aiInsight": "Early data only — only 1 test taken. OSI layer knowledge looks fine so far.", "weakTopics": ["Subnetting", "Routing Protocols"], "lastStudied": "2026-03-10", "testCount": 1 }
  }
}
```

---

### `mock_memory.json`
Per userId. All 4 Hindsight memory types.

```json
{
  "aryan": {
    "reflectSummary": "Aryan is a focused BTech CSE Sem 3 student with an IOT exam in 4 days. He has strong theoretical understanding across subjects but consistently struggles with application-level questions in IOT. His OS scores are on a positive trajectory. He prefers evening study sessions and shorter focused blocks over long marathons.",
    "world": [
      { "fact": "BTech CSE Sem 3. Active subjects: IOT, DS, OS, DBMS, CN.", "category": "Profile", "timestamp": "2026-03-01T10:00:00Z" },
      { "fact": "IOT exam scheduled March 24, 2026.", "category": "Exam", "timestamp": "2026-03-10T18:00:00Z" },
      { "fact": "OS exam scheduled April 10, 2026.", "category": "Exam", "timestamp": "2026-03-12T20:00:00Z" },
      { "fact": "Prefers evening study sessions, 7–10pm.", "category": "Preference", "timestamp": "2026-03-13T21:00:00Z" }
    ],
    "experiences": [
      { "event": "IOT Quiz Ch.3 — scored 4/10.", "subject": "IOT", "detail": "Wrong on VSWR, antenna gain, propagation delay.", "timestamp": "2026-03-15T21:12:00Z" },
      { "event": "Studied DS Trees for 50 mins. Pomodoro check-in: Mixed.", "subject": "DS", "detail": "Understood most of binary trees. BFS vs DFS still fuzzy.", "timestamp": "2026-03-16T20:50:00Z" },
      { "event": "Rejected morning DS session slot.", "subject": "DS", "detail": "Rescheduled to 8pm.", "timestamp": "2026-03-17T08:30:00Z" },
      { "event": "Asked AI to re-explain VSWR twice in Mentor session.", "subject": "IOT", "detail": "Genuine confusion signal. VSWR conceptual gap confirmed.", "timestamp": "2026-03-17T20:04:00Z" }
    ],
    "observations": [
      { "pattern": "User understands IOT theory but consistently fails application-level questions. Pattern seen across 3 quiz sessions.", "confidence": 0.91, "sessions": 3, "timestamp": "2026-03-16T00:00:00Z" },
      { "pattern": "OS scores have improved 3 weeks running (+8%, +12%, +7%). Positive trajectory confirmed.", "confidence": 0.85, "sessions": 3, "timestamp": "2026-03-18T00:00:00Z" },
      { "pattern": "User rejects morning study slots consistently. Strong evening preference established.", "confidence": 0.88, "sessions": 4, "timestamp": "2026-03-17T00:00:00Z" }
    ],
    "opinions": [
      { "belief": "Needs targeted IOT application practice before the exam — theory alone won't close the gap.", "confidence": 0.91, "subject": "IOT", "timestamp": "2026-03-18T00:00:00Z" },
      { "belief": "Short evening sessions (25–30 min) are more effective for this student than long sittings.", "confidence": 0.74, "subject": "General", "timestamp": "2026-03-17T00:00:00Z" },
      { "belief": "DS is not a priority right now — scores are strong and exam is far.", "confidence": 0.68, "subject": "DS", "timestamp": "2026-03-18T00:00:00Z" }
    ]
  }
}
```

---

### `mock_briefing.json`
Daily briefing card data per userId.

```json
{
  "aryan": {
    "streakCount": 12,
    "greetingName": "Aryan",
    "lastSubject": "IOT",
    "daysSinceLastStudy": 3,
    "upcomingExam": { "subject": "IOT", "daysRemaining": 4 },
    "weakestTopic": "VSWR"
  },
  "priya": {
    "streakCount": 2,
    "greetingName": "Priya",
    "lastSubject": "Physics",
    "daysSinceLastStudy": 1,
    "upcomingExam": { "subject": "Chemistry", "daysRemaining": 18 },
    "weakestTopic": "Organic Reactions"
  }
}
```

---

### `mock_flashcards.json`
Per subject, per topic. Minimum 8 cards each.

```json
{
  "iot": {
    "Ch.3 Transmission": [
      { "front": "VSWR", "back": "Voltage Standing Wave Ratio — measures impedance mismatch in antenna systems. 1:1 is perfect." },
      { "front": "Antenna Gain", "back": "Ratio of power radiated in a specific direction vs an isotropic antenna. Measured in dBi." },
      { "front": "Propagation Delay", "back": "Time taken for a signal to travel from sender to receiver across a medium." },
      { "front": "Impedance Matching", "back": "Ensuring source and load impedances are equal to maximise power transfer and minimise reflection." },
      { "front": "Standing Wave", "back": "Wave pattern created by superposition of incident and reflected waves on a transmission line." },
      { "front": "Return Loss", "back": "Measure (in dB) of power reflected at an antenna port. Higher return loss = better match." },
      { "front": "Near Field", "back": "Region close to an antenna where the electromagnetic field is not yet a propagating wave." },
      { "front": "Far Field", "back": "Region far from antenna where the wave pattern is stable and propagating. Used for gain measurements." }
    ]
  },
  "os": {
    "Scheduling": [
      { "front": "FCFS", "back": "First Come First Served — processes run in arrival order. Simple but can cause convoy effect." },
      { "front": "SJF", "back": "Shortest Job First — gives minimum average waiting time but requires knowing burst times upfront." },
      { "front": "Round Robin", "back": "Each process gets a fixed time quantum in circular order. Good for time-sharing systems." },
      { "front": "Time Quantum", "back": "Fixed time slice given to each process in Round Robin. Too small = high overhead, too large = FCFS." },
      { "front": "Convoy Effect", "back": "In FCFS, a long process holds CPU causing short processes to wait — reduces efficiency." },
      { "front": "Preemptive Scheduling", "back": "OS can interrupt a running process to give CPU to a higher-priority process." },
      { "front": "Burst Time", "back": "Total CPU time a process needs to complete. Key input in SJF and other algorithms." },
      { "front": "Throughput", "back": "Number of processes completed per unit time. A key metric for scheduling algorithm performance." }
    ]
  }
}
```

---

## 8. Gamification UI

| Element | Specification |
|---|---|
| 🔥 Streak | Fire emoji + count in sidebar. Updates daily based on `mock_schedule` completed tasks. |
| ⚡ XP | +10 per correct quiz answer, +50 per completed session, +5 per planner interaction. Shown on Profile. |
| Proficiency bar color | Violet below 60%, Amber 60–79%, Green 80%+ |
| Badge toasts | Bottom-right toast, 3s duration. Triggered on: First Quiz, 7-Day Streak, Weak Topic Conquered. |
| XP float | On correct answer: "+10 XP" badge animates upward from question, fades out. 600ms. |

---

## 9. Responsive Breakpoints

| Breakpoint | Layout | Key Changes |
|---|---|---|
| Desktop ≥1280px | Full 3-panel layouts | Sidebar expanded, all panels visible |
| Tablet 768–1279px | 2-panel layouts | Sidebar collapses to icons, right panel becomes a tab |
| Mobile <768px | Single panel | Sidebar hidden, bottom nav bar, panels stack vertically |

---

## 10. Accessibility

- All interactive elements keyboard-navigable with visible focus rings
- Color is never the only indicator — icons and text always accompany
- All images and icons have `alt` text or `aria-label`
- Form inputs have associated `<label>` elements
- Motion respects `prefers-reduced-motion` — all animations disabled if set
- Minimum touch target: 44×44px for all tappable elements
- Contrast: all text meets WCAG AA on dark backgrounds

---

*— End of PRD — Sage v1.0 — UI & Frontend Specification — Mock Data Phase*