# 🌿 SAGE — MVP Specification
**Minimum Viable Product — What to Ship First**
`Version 1.0` · `UI Only` · `Mock Data Phase`

---

## Meta

| Field | Value |
|---|---|
| Document Type | MVP Specification |
| Scope | What to build, what to cut, and in what order |
| Product Name | Sage |
| Version | 1.0 |
| Depends On | sage_prd.md, sage_srs.md |

---

## What is an MVP?

The smallest version of Sage that can be demoed end-to-end to prove the core idea works. Cut everything that doesn't directly show: **personalised AI memory → better studying**.

> **The MVP test:** Can a judge open Sage, go through onboarding, study a topic, take a quiz, and see the Memory Panel prove the AI remembered something — all in under 5 minutes? If yes, MVP ships.

---

## Core Value Hypothesis

> A student who uses Sage feels like the app genuinely knows them — their weak topics, their study history, their upcoming exams — and that this knowledge actively helps them study better.

Everything in the MVP must support this hypothesis. Everything that doesn't, gets cut.

---

## The 5-Screen Demo Flow (MVP Must Support This)

This is the exact sequence a judge or user will run. MVP is only done when all 5 steps work without friction.

| Step | What Happens | Why It Matters |
|---|---|---|
| 1 | Fresh onboarding — tap cards, upload/select syllabus, Profile Reveal | Shows personalisation from minute one |
| 2 | Planner — Daily Briefing Card loads with name, streak, exam countdown | Proves persistent memory across sessions |
| 3 | Mentor — Open IOT, see personalised opening message, study a topic | Shows AI knows the student's history |
| 4 | Take a test — 10 questions, get results with AI insight | Shows AI understands weaknesses |
| 5 | Open Memory Panel — see all 4 memory types populated | The money shot — AI learning made visible |

---

## MVP Scope: Build vs Cut vs Defer

### ✅ MUST BUILD (MVP Core)

These are non-negotiable. If any of these are missing, the MVP fails.

**Auth & Onboarding**
- Login page with name input and 2 demo user pills (Aryan + Priya)
- All 8 onboarding steps working end-to-end
- Profile Reveal screen with animated proficiency bars
- `userId` stored in localStorage, routing to `/planner` on return

**Planner**
- Daily Briefing Card (streak, name, exam countdown, weakest topic) — powered by `mock_briefing.json`
- Chat interface showing pre-seeded mock conversation for Aryan
- Scheduler panel with today's tasks
- Tasks link directly to `/mentor/[subject]?topic=X`

**Mentor**
- Subject grid (`/mentor`) with cards, proficiency bars, last-studied dates
- 3-panel layout for `/mentor/[subject]`
- Personalised opening message from `mock_chats_mentor.json`
- Mock chat with sequential AI responses and typing indicator
- Flashcards working (flip interaction)
- Summary tab working (static text)
- TeachingCTA → navigates to Tests

**Tests**
- Mode selection: Student-Designed and Mentor-Assigned
- TestConfigForm (subject, topic, question count, time limit)
- Full test UI: timer, MCQ tiles, pill navigation
- Auto-submit at 00:00 with 10-second warning overlay
- Results screen: score, Q&A review, AI insight card, CTAs

**Profile**
- Proficiency bars with animated fill + AI insights
- Test history list from `mock_tests.json`
- Link to Memory Panel

**Memory Panel**
- Full 4-type memory display from `mock_memory.json`
- Summary card at top
- Opens as drawer from sidebar 🧠 icon
- Also accessible at `/memory`

**Mock Data (fully seeded)**
- Aryan: 3 weeks of rich data across all mock files
- Priya: fresh user state

---

### 🔶 SHOULD BUILD (Strong Recommends — include if time allows)

These significantly improve the demo and UX but the MVP doesn't collapse without them.

| Feature | Why Include | Effort |
|---|---|---|
| Calendar panel in Planner | Exam dates on calendar are visually powerful | Low |
| Pomodoro timer | Natural study flow, mood check-in is a great memory write demo | Medium |
| HindsightStrip in Mentor Sources panel | Reinforces that AI knows history | Low |
| Sidebar collapse on tablet | Required for real usability | Medium |
| ScheduleDiffCard (Accept/Reject) | Makes Planner feel more dynamic | Medium |
| XP float animation on correct answers | Gamification feel | Low |
| Skeleton loaders instead of spinners | Polish | Low |
| Recharts XP chart on Profile | Makes Profile feel data-rich | Medium |

---

### ❌ DO NOT BUILD IN MVP (Cut)

These are either placeholders or features that add zero value to the 5-step demo flow.

| Feature | Why Cut |
|---|---|
| Mind Map | Non-functional, placeholder only |
| Slide Deck | Non-functional, placeholder only |
| Infographic | Non-functional, placeholder only |
| Calendar drag-and-drop editing | No impact on demo |
| Add source (upload extra PDFs) | Doesn't change the demo narrative |
| Analytics/historical chart on Profile | Not needed to prove memory works |
| Mobile-responsive layouts | Demo is on desktop; defer to v1.1 |
| Badge toasts | Adds noise without adding proof |
| Real PDF parsing | Mock templates are sufficient |
| Any real API calls | Entire backend deferred to v2 |

---

## Build Order — Recommended Sprint Sequence

### Phase 1 — Foundation (Do this first, everything else depends on it)

1. Next.js 14 project setup with TypeScript + Tailwind + shadcn/ui
2. Install all dependencies: Framer Motion, Zustand, Recharts, Lucide, react-big-calendar
3. Configure Tailwind with Sage color tokens and Geist font
4. Set up `/lib/mock/` directory and create all 9 mock JSON files (fully seeded for Aryan and Priya)
5. Set up Zustand store: `useUserStore` (userId, name, subjects, streak, xp) and `useAppStore` (current route state, timer state)
6. Build sidebar component (all nav items, 🧠 icon, streak display)
7. Build shared layout with sidebar + main content area
8. Mock auth: login page → localStorage → routing logic

**Checkpoint:** Can switch between Aryan and Priya on login, see correct names, reach different pages.

---

### Phase 2 — Onboarding

1. Step wrapper component (progress bar, back button, transitions)
2. Steps 1–4 (tap card selection, auto-advance)
3. Step 5 (syllabus upload UI + template pills + fake processing state)
4. Step 6 (subject confirm with stagger animation)
5. Step 7 (topic pills, per-subject, skip option)
6. Step 8 (profile reveal — animated bars, weak badges, CTA)

**Checkpoint:** Full onboarding flow works from login to Profile Reveal.

---

### Phase 3 — Mentor (Build this before Planner — it's where studying happens)

1. Subject grid page (`/mentor`) with SubjectCards
2. 3-panel layout shell for `/mentor/[subject]`
3. Sources panel with HindsightStrip
4. Module dropdown + opening message from mock data
5. Chat messages (mock sequential responses, typing indicator)
6. Flashcards (flip animation)
7. Summary tab (static text)
8. Mind Map + Slide Deck placeholders (grayed out, "Coming soon")
9. TeachingCTA block at end of mock conversation
10. Pomodoro timer + MoodCheckin modal

**Checkpoint:** Can navigate from subject grid → subject page → read opening message → chat → get TeachingCTA → click to tests.

---

### Phase 4 — Tests

1. Mode selection screen (two ModeCards)
2. TestConfigForm (subject, topic, count, time)
3. Mock test loader (match subject → load from `mock_tests.json`)
4. Test interface: header timer, QuestionCard, OptionTiles, PillNav
5. Prev/Next navigation, answer persistence across navigation
6. 10-second TimeWarningOverlay + auto-submit
7. Submit confirmation dialog
8. Results screen: score badge, Q&A review, AI insight card, CTAs

**Checkpoint:** Full test flow from mode selection → answering → results → back to Mentor or Planner.

---

### Phase 5 — Planner

1. DailyBriefingCard (load from `mock_briefing.json`, dismiss button)
2. Chat interface (load from `mock_chats_planner.json`, mock responses)
3. Quick action chips
4. Scheduler panel (today's tasks, clickable rows → mentor with topic param)
5. Calendar panel (react-big-calendar, exam events, task events)

**Checkpoint:** Aryan opens Planner, sees Daily Briefing Card with his name and IOT exam countdown. Clicks a scheduler task → opens Mentor on the right topic.

---

### Phase 6 — Profile + Memory Panel

1. ProfileHeader (avatar initials, streak, XP)
2. ProficiencyBars (animated, color-coded, AI insights)
3. TestHistoryList (from `mock_tests.json`)
4. XP chart (Recharts, 7-day from mock schedule data)
5. Memory Panel full page (`/memory`)
6. All 4 memory type sections (World, Experiences, Observations, Opinions)
7. MemorySummaryCard
8. ConfidenceBadges on Opinions
9. Memory Drawer wired to sidebar 🧠 icon (shadcn Sheet)

**Checkpoint:** Profile shows animated proficiency bars with AI insights. 🧠 icon opens drawer from anywhere. Memory Panel shows Aryan's full 4-type breakdown.

---

### Phase 7 — Polish & Demo Prep

1. Fix any broken navigation flows
2. Ensure full 5-step demo sequence works without friction
3. Verify Aryan and Priya show completely different data (memory isolation)
4. Add skeleton loaders to replace any raw loading states
5. Final animation pass: page entry, stagger, bar fills
6. Test on a clean browser (no cached state)

---

## Mock Data Seeding Checklist

Before calling MVP complete, verify all mock data is fully populated:

- [ ] `users.json` — Aryan (full) + Priya (minimal) profiles
- [ ] `mock_briefing.json` — Daily briefing for both users
- [ ] `mock_chats_planner.json` — 4+ exchanges for Aryan, 1 for Priya
- [ ] `mock_chats_mentor.json` — IOT Ch.3 + DS Trees + OS Scheduling sessions for Aryan
- [ ] `mock_tests.json` — 3 tests for Aryan (IOT, DS, OS), 1 for Priya
- [ ] `mock_schedule.json` — Today's tasks + exam calendar events for both users
- [ ] `mock_proficiency.json` — All 5 subjects for Aryan, 3 for Priya
- [ ] `mock_memory.json` — All 4 memory types fully populated for Aryan, minimal for Priya
- [ ] `mock_flashcards.json` — 8+ cards for IOT Ch.3 + OS Scheduling at minimum

---

## What "Done" Looks Like

MVP is shippable when:

1. Login → Aryan → Planner shows Daily Briefing Card with his name, streak, IOT exam countdown
2. Clicking any scheduler task opens the correct Mentor page with the right topic pre-loaded
3. Mentor shows personalised opening message referencing Aryan's last session
4. Test flow completes end-to-end with results and AI insight showing
5. 🧠 icon opens Memory Drawer from any page showing all 4 memory types for Aryan
6. Login → Priya → completely different dashboard, different Memory Panel
7. Zero console errors on the 5-step demo flow
8. All MUST requirements from `sage_srs.md` pass

---

## What v2 Adds (After MVP)

These are explicitly deferred. Do not build now.

| Feature | Version |
|---|---|
| Supabase database replacing mock JSON | v2 |
| Groq LLM actual chat responses | v2 |
| Hindsight Cloud memory integration | v2 |
| Real PDF syllabus parsing | v2 |
| Real user authentication (OAuth) | v2 |
| Mobile-responsive layouts | v1.1 |
| Mind Map generation | v2 |
| Slide Deck generation | v2 |
| Collaborative features | v3 |

---

## Risk Log

| Risk | Impact | Mitigation |
|---|---|---|
| react-big-calendar setup is complex | Medium — Planner looks broken | Use a simpler static calendar grid as fallback |
| Framer Motion stagger animations feel janky | Low — just visual | Remove stagger, use simple fade-in as fallback |
| Mock sequential chat feels fake | Medium — kills immersion | Pre-write high quality mock messages, add realistic 1.2s delays |
| Too much time on animations, not enough on flows | High | Build all navigation flows first, add animations in Phase 7 only |

---

*— End of MVP Spec — Sage v1.0 — Ship the core, prove the idea*