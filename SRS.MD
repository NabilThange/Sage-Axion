# 🌿 SAGE — Software Requirements Specification (SRS)
**Frontend & UI Behaviour Specification**
`Version 1.0` · `UI Layer Only` · `Mock Data Phase`

---

## Meta

| Field | Value |
|---|---|
| Document Type | Software Requirements Specification (SRS) |
| Scope | UI behaviour, component states, interactions — No backend |
| Product Name | Sage |
| Version | 1.0 |
| Depends On | sage_prd.md |

> **How to read this document:** The PRD says *what* to build. This SRS says *exactly how each piece must behave* — inputs, outputs, states, edge cases, error handling. Every component and page from the PRD is expanded here into precise functional requirements.

---

## Priority Legend

| Label | Meaning |
|---|---|
| `MUST` | Required for v1 launch. Non-negotiable. |
| `SHOULD` | Strongly recommended. Include unless time-blocked. |
| `COULD` | Nice to have. Include only if time permits. |

---

## 1. Global Requirements

### 1.1 Theme & Appearance
| ID | Requirement | Priority |
|---|---|---|
| G-01 | App MUST render in dark mode only in v1. No light mode toggle. | MUST |
| G-02 | Background MUST be `#0D0D0F`. All surfaces MUST use `#161618`. Elevated surfaces MUST use `#1F1F22`. | MUST |
| G-03 | Accent color for all primary actions MUST be `#7C6AF5` (violet). | MUST |
| G-04 | Font MUST be Geist. Fallback: Inter. Only weights 400 and 500 permitted. | MUST |
| G-05 | All animations MUST be disabled when `prefers-reduced-motion: reduce` is set. | MUST |

### 1.2 Layout
| ID | Requirement | Priority |
|---|---|---|
| G-06 | Sidebar MUST be 240px fixed width on desktop. | MUST |
| G-07 | Sidebar MUST collapse to icon-only (64px) on tablet (768–1279px). | SHOULD |
| G-08 | Sidebar MUST be hidden on mobile (<768px) and replaced by a bottom navigation bar. | SHOULD |
| G-09 | All pages MUST be scrollable within their own panel. No full-page scroll on 3-panel layouts. | MUST |

### 1.3 Mock Auth
| ID | Requirement | Priority |
|---|---|---|
| G-10 | `userId` MUST be stored in `localStorage` under key `sage_userId`. | MUST |
| G-11 | On every page load, app MUST check `localStorage` for `userId`. If missing → redirect to `/login`. | MUST |
| G-12 | All mock data lookups MUST use `userId` as the key into JSON data objects. | MUST |
| G-13 | Logging out MUST clear `localStorage` and redirect to `/login`. | MUST |

---

## 2. Login Page  `/login`

| ID | Requirement | Priority |
|---|---|---|
| L-01 | Page MUST render a single centered card on a full-screen dark background. | MUST |
| L-02 | Sage logo and tagline "The AI Tutor That Never Forgets" MUST appear above the input. | MUST |
| L-03 | Name input MUST have placeholder text "Enter your name". | MUST |
| L-04 | Two demo user pills MUST appear below the input: "Aryan" and "Priya". Clicking either MUST pre-fill the input. | MUST |
| L-05 | CTA button text MUST read "Enter Sage". Button MUST be disabled when input is empty. | MUST |
| L-06 | On submit: if `users.json` contains an entry matching the lowercased name → set `userId` → redirect `/planner`. | MUST |
| L-07 | On submit: if no matching user found → set a new `userId` as `user_[name]_[timestamp]` → redirect `/onboarding`. | MUST |
| L-08 | Input MUST trim whitespace before matching. | MUST |
| L-09 | Pressing Enter key MUST trigger the same action as clicking the CTA. | SHOULD |

---

## 3. Onboarding  `/onboarding`

### 3.1 General Flow
| ID | Requirement | Priority |
|---|---|---|
| O-01 | Onboarding MUST consist of exactly 8 steps rendered one at a time, full-screen. | MUST |
| O-02 | A progress bar at the top MUST show "Step X of 8" and fill proportionally. | MUST |
| O-03 | Transitions between steps MUST animate: slide-left (forward) and slide-right (backward), 200ms. | SHOULD |
| O-04 | A "Back" button MUST appear on steps 2–8 to return to the previous step. | MUST |
| O-05 | Onboarding state MUST be stored in component state (Zustand) and only written to mock storage on Step 8 completion. | MUST |

### 3.2 Step-by-Step Behaviour

**Step 1 — Name Confirm**
| ID | Requirement | Priority |
|---|---|---|
| O-06 | MUST display "Hey [name]! Let's build your study profile." using the name from login. | MUST |
| O-07 | Single CTA "Let's Go →" MUST advance to Step 2. | MUST |

**Step 2 — Education Level**
| ID | Requirement | Priority |
|---|---|---|
| O-08 | MUST display 4 TapCards: "Class 10–12", "Undergraduate", "Postgraduate", "Competitive Exam". | MUST |
| O-09 | Tapping a card MUST select it (violet border + checkmark, 150ms animation) AND auto-advance to Step 3. | MUST |
| O-10 | Only one card can be selected at a time. | MUST |

**Step 3 — Curriculum**
| ID | Requirement | Priority |
|---|---|---|
| O-11 | Options MUST change based on Step 2 selection: UG → Engineering/Medical/Commerce/Arts/Other; Class 10-12 → CBSE/ICSE/IB/State Board/Other; Competitive → JEE/NEET/UPSC/CAT/Other. | MUST |
| O-12 | Same tap-to-select auto-advance behaviour as Step 2. | MUST |

**Step 4 — Semester/Year**
| ID | Requirement | Priority |
|---|---|---|
| O-13 | If Engineering: show Sem 1–8 as tap cards. If others: show Year 1–4. | MUST |
| O-14 | Same tap-to-select auto-advance behaviour. | MUST |

**Step 5 — Syllabus Upload**
| ID | Requirement | Priority |
|---|---|---|
| O-15 | MUST show a drag-and-drop zone with animated dotted border. | MUST |
| O-16 | Below the zone, MUST show pre-loaded template pills: "BTech CSE Sem 3", "CBSE Class 12 PCM", "JEE Mains". Clicking a pill MUST simulate selecting that syllabus. | MUST |
| O-17 | After file selection or template selection: MUST show animated processing state: "Reading your syllabus... extracting subjects..." for 2 seconds, then auto-advance. | MUST |
| O-18 | In mock mode: file upload does NOT parse the PDF. Instead, selecting a template or uploading any file MUST load the corresponding mock subjects from `users.json`. | MUST |
| O-19 | A "Skip for now" text link MUST appear below — loads default subject set. | SHOULD |

**Step 6 — Subject Confirm**
| ID | Requirement | Priority |
|---|---|---|
| O-20 | MUST display "I found these subjects in your syllabus:" followed by SubjectCards animating in with 80ms stagger delay per card. | MUST |
| O-21 | Each card MUST have a deselect (×) button. Clicking removes it from the list. | MUST |
| O-22 | A text input MUST allow adding a subject manually. | SHOULD |
| O-23 | CTA "These look right →" advances to Step 7. MUST be disabled if zero subjects selected. | MUST |

**Step 7 — Topics Known**
| ID | Requirement | Priority |
|---|---|---|
| O-24 | MUST show one subject at a time with "Subject X of Y" indicator. | MUST |
| O-25 | All chapters/topics for the current subject MUST render as horizontal TopicPills. Tapping toggles selected (filled) vs unselected (outline). | MUST |
| O-26 | A "Skip — I'm starting fresh" button MUST appear at the bottom, advancing without selecting any topics. | MUST |
| O-27 | CTA "Next subject →" (or "Finish →" on last subject) advances to next subject or Step 8. | MUST |

**Step 8 — Profile Reveal**
| ID | Requirement | Priority |
|---|---|---|
| O-28 | MUST display "Your study profile is ready, [name]!" | MUST |
| O-29 | Proficiency bars for each subject MUST animate from 0% to their baseline value, staggered 150ms each, over 600ms each. | MUST |
| O-30 | WeakAreaBadges for subjects with <50% baseline MUST appear after bars complete. | MUST |
| O-31 | CTA "Enter Dashboard →" MUST navigate to `/planner`. | MUST |
| O-32 | On this step, user profile MUST be written to mock storage in Zustand. | MUST |

---

## 4. Planner  `/planner`

### 4.1 Daily Briefing Card
| ID | Requirement | Priority |
|---|---|---|
| P-01 | On every app open (or planner navigation), DailyBriefingCard MUST load data from `mock_briefing.json` for the current `userId`. | MUST |
| P-02 | Card MUST display: streak count, greeting with name, last subject studied, days since, upcoming exam + days remaining, weakest topic. | MUST |
| P-03 | Card MUST have a dismiss (×) button. Once dismissed in a session, it MUST NOT reappear until the next app open. Dismissed state stored in component state only (not persisted). | MUST |
| P-04 | Card MUST animate in with fade + translateY on load, 300ms. | SHOULD |

### 4.2 Chat Interface
| ID | Requirement | Priority |
|---|---|---|
| P-05 | Chat messages MUST load from `mock_chats_planner.json` for the current userId on mount. | MUST |
| P-06 | Chat MUST display messages in chronological order, user messages right-aligned, AI messages left-aligned. | MUST |
| P-07 | Each message MUST show a timestamp (relative: "2 days ago" or absolute if >7 days). | SHOULD |
| P-08 | Sending a new message in v1 MUST append the user message to the chat UI immediately. AI response MUST be the next mock message in the sequence, displayed after a 1.2s simulated typing delay with a typing indicator. | MUST |
| P-09 | If the user has exhausted all mock messages, AI MUST respond with a generic fallback: "I'm still learning about you! Keep studying and I'll have more personalised insights soon." | MUST |
| P-10 | Chat MUST auto-scroll to the latest message after each new message appears. | MUST |
| P-11 | Input MUST be disabled while the AI typing indicator is showing. | MUST |

### 4.3 Quick Action Chips
| ID | Requirement | Priority |
|---|---|---|
| P-12 | Four chips MUST appear below the input: "Plan my week", "Add exam", "What to study today?", "Quiz me". | MUST |
| P-13 | Clicking a chip MUST populate the input with that text and submit immediately. | MUST |

### 4.4 Scheduler Panel
| ID | Requirement | Priority |
|---|---|---|
| P-14 | Scheduler MUST load today's tasks from `mock_schedule.json` filtered by today's date. | MUST |
| P-15 | Each task row MUST show: subject, topic, estimated duration, mode badge (Lesson/Quiz/Revision), status indicator. | MUST |
| P-16 | Clicking a task MUST navigate to `/mentor/[subjectId]` with the topic passed as a query param: `/mentor/iot?topic=Ch.3+VSWR`. | MUST |
| P-17 | Completed tasks MUST show a green checkmark and muted styling. | MUST |
| P-18 | A ScheduleDiffCard MUST appear in the chat for the mock exchange about rescheduling, with Accept and Reject buttons. Accept MUST update the task's date in Zustand state. Reject MUST dismiss the card. | SHOULD |

### 4.5 Calendar Panel
| ID | Requirement | Priority |
|---|---|---|
| P-19 | Calendar MUST use react-big-calendar in month view by default. | MUST |
| P-20 | Exam events from `mock_schedule.calendarEvents` MUST render as red event blocks. | MUST |
| P-21 | Completed sessions MUST render as green event blocks. Planned tasks as blue. | MUST |
| P-22 | Clicking a date MUST expand it to show that day's tasks inline below the calendar. | SHOULD |

---

## 5. Mentor Grid  `/mentor`

| ID | Requirement | Priority |
|---|---|---|
| M-01 | Page MUST load all subjects for the current user from `users.json`. | MUST |
| M-02 | SubjectCards MUST render in a 3-column grid on desktop. Each card MUST show: gradient cover, subject name, chapter count badge, last studied date, proficiency bar. | MUST |
| M-03 | Proficiency data MUST come from `mock_proficiency.json`. Bar color MUST follow: violet <60%, amber 60–79%, green ≥80%. | MUST |
| M-04 | On hover, card MUST show an overlay with: proficiency %, weak topics count, last score. Overlay MUST fade in at 150ms. | SHOULD |
| M-05 | Clicking a card MUST navigate to `/mentor/[subjectId]`. | MUST |
| M-06 | If `lastStudied` is null (subject never studied), card MUST show "Not studied yet" in muted text. | MUST |

---

## 6. Mentor Subject  `/mentor/[subject]`

### 6.1 Panel Layout
| ID | Requirement | Priority |
|---|---|---|
| MS-01 | Page MUST render a fixed 3-panel layout: Sources (left, 220px), Chat (centre, flex), Studio (right, 280px). | MUST |
| MS-02 | On tablet, Studio MUST become a tab toggle. On mobile, all 3 panels MUST stack vertically. | SHOULD |

### 6.2 Sources Panel
| ID | Requirement | Priority |
|---|---|---|
| MS-03 | Syllabus PDF MUST appear as a SourceItem with checkmark (auto-loaded from onboarding). | MUST |
| MS-04 | HindsightStrip at bottom MUST show: last studied date, weak areas (comma-separated), score trend arrow (↑ ↓ →) from `mock_proficiency.json`. | MUST |
| MS-05 | "Add source" button MUST open a file picker dialog. In v1, any uploaded file MUST appear as a new SourceItem without actual parsing. | SHOULD |

### 6.3 Chat Panel
| ID | Requirement | Priority |
|---|---|---|
| MS-06 | ModuleDropdown MUST populate with the current subject's chapters from `users.json`. | MUST |
| MS-07 | On page load (or navigation with topic query param), chat MUST display the OpeningMessage from `mock_chats_mentor.json` for the current subject. | MUST |
| MS-08 | If navigated from Scheduler with `?topic=X`, ModuleDropdown MUST auto-select topic X and load the corresponding mock session. | MUST |
| MS-09 | Sending messages MUST follow the same mock-response pattern as the Planner chat (1.2s delay, typing indicator, sequential mock messages). | MUST |
| MS-10 | If a mock message has `isReexplain: true`, the UI MUST NOT show any visual indicator — it's stored silently (in v2 this triggers a Hindsight retain call). | MUST |
| MS-11 | After the last mock teaching message, a TeachingCTA MUST appear: "Ready to take a test on what we covered?" with Yes and Skip buttons. | MUST |
| MS-12 | Clicking "Yes" on TeachingCTA MUST navigate to `/tests?subject=[subjectId]&mode=mentor-assigned`. | MUST |

### 6.4 Studio Panel
| ID | Requirement | Priority |
|---|---|---|
| MS-13 | FlashcardStack MUST load cards from `mock_flashcards.json` for current subject + selected topic. | MUST |
| MS-14 | Clicking a flashcard MUST flip it with a CSS 3D transform (Y-axis, 300ms). | MUST |
| MS-15 | "Next" and "Previous" buttons MUST cycle through the card stack. | MUST |
| MS-16 | SummaryCard MUST display a static text summary. In v1 this is a hardcoded string per topic (not AI-generated). | MUST |
| MS-17 | MindMapPlaceholder and SlideDeckPlaceholder MUST render with a "Coming soon" label and muted opacity. They MUST NOT be clickable. | MUST |
| MS-18 | QuizLaunchButton MUST navigate to `/tests?subject=[subjectId]&topic=[currentTopic]`. | MUST |

### 6.5 Pomodoro Timer
| ID | Requirement | Priority |
|---|---|---|
| MS-19 | Timer MUST support 3 modes: Work (25 min), Short Break (5 min), Long Break (15 min). | MUST |
| MS-20 | Start button begins countdown. Pause suspends it. Reset returns to full duration. | MUST |
| MS-21 | Timer display MUST update every second in MM:SS format. | MUST |
| MS-22 | When Work timer reaches 00:00, MUST play a soft chime sound (if audio permitted) and show MoodCheckin modal. | SHOULD |
| MS-23 | MoodCheckin modal MUST show 3 options: "Great 😊", "Mixed 😐", "Struggled 😔". Selecting any MUST dismiss the modal. In v2, selection triggers a Hindsight retain call. | MUST |
| MS-24 | Timer MUST NOT reset when the user switches between panels. Timer state MUST persist in Zustand. | MUST |

---

## 7. Tests  `/tests`

### 7.1 Mode Selection
| ID | Requirement | Priority |
|---|---|---|
| T-01 | Page MUST show two ModeCards: "Student-Designed" and "Mentor-Assigned". | MUST |
| T-02 | If navigated with `?mode=mentor-assigned&subject=X`, page MUST skip mode selection and go directly to the test. | MUST |
| T-03 | Student-Designed mode MUST show TestConfigForm: subject dropdown, topic dropdown, question count slider (5–20, default 10), time limit selector (5/10/15/20/30 min). | MUST |
| T-04 | Subject dropdown MUST populate from current user's subjects. Topic dropdown MUST update based on selected subject. | MUST |
| T-05 | "Start Test" button MUST load the matching test from `mock_tests.json`. If no exact match, MUST load the closest mock test by subject. | MUST |

### 7.2 Test Interface
| ID | Requirement | Priority |
|---|---|---|
| T-06 | Test header MUST show: timer countdown, subject name, "Submit" button. | MUST |
| T-07 | Timer MUST count down every second. Display format: MM:SS. | MUST |
| T-08 | One question MUST be shown at a time with its 4 option tiles. | MUST |
| T-09 | Selecting an option MUST highlight it with violet background. Selecting a different option MUST switch the highlight. | MUST |
| T-10 | PillNav MUST show numbered pills for all questions. Current question pill MUST be violet-filled. Answered questions MUST show a subtle dot indicator. | MUST |
| T-11 | Clicking a pill MUST navigate directly to that question without losing current answer. | MUST |
| T-12 | Prev/Next buttons MUST navigate between adjacent questions. | MUST |
| T-13 | When timer reaches 00:10, TimeWarningOverlay MUST appear: "Time is almost up! Submitting in 10 seconds." with a 10-second countdown. | MUST |
| T-14 | At 00:00, test MUST auto-submit with all currently selected answers (unanswered questions count as wrong). | MUST |
| T-15 | "Submit" button click MUST show a confirmation dialog: "Submit test? X questions unanswered." with Confirm and Cancel. | MUST |

### 7.3 Results Screen
| ID | Requirement | Priority |
|---|---|---|
| T-16 | MUST display score prominently: "X/Y — Z%". Score color: green ≥70%, amber 50–69%, red <50%. | MUST |
| T-17 | MUST display full Q&A review below: each question with correct answer (green ✓) and user's wrong answer if different (red ✗). | MUST |
| T-18 | AIInsightCard MUST display the `aiInsight` string from the matching `mock_tests.json` entry. | MUST |
| T-19 | Two CTAs MUST appear: "Go to Mentor →" (navigates to `/mentor/[subject]`) and "Skip" (navigates to `/planner`). | MUST |
| T-20 | XP animation MUST fire on results load: each correct answer triggers a +10 XP float sequentially with 100ms delay between each. | SHOULD |
| T-21 | Proficiency for the tested subject MUST update in Zustand state immediately (recalculated from new score). | MUST |

---

## 8. Profile  `/profile`

| ID | Requirement | Priority |
|---|---|---|
| PR-01 | ProfileHeader MUST show: avatar (initials-based), name, education level + semester, 🔥 streak count, total XP. | MUST |
| PR-02 | Each ProficiencyBar MUST animate from 0% to its value on page load, staggered 100ms per subject, 600ms each. | MUST |
| PR-03 | Bar color MUST follow: violet <60%, amber 60–79%, green ≥80%. | MUST |
| PR-04 | Below each bar, `aiInsight` string from `mock_proficiency.json` MUST appear in caption style (12px, text-secondary). | MUST |
| PR-05 | If `phaseLabel` exists in `mock_proficiency.json` for a subject, it MUST appear next to the percentage in muted text. | MUST |
| PR-06 | TestHistoryRow MUST display: date (formatted as "Mar 15"), subject, score fraction, time taken (formatted as "12 min"), and a "View" button. | MUST |
| PR-07 | Clicking "View" on a TestHistoryRow MUST open the full results screen for that test (load from `mock_tests.json` by testId). | MUST |
| PR-08 | XPChart MUST render a Recharts bar chart showing XP per day for the last 7 days from `mock_schedule` completed tasks. | SHOULD |
| PR-09 | BadgeGrid MUST show earned badges based on rules: "First Quiz" if testCount ≥ 1, "7-Day Streak" if streakCount ≥ 7, "Weak Topic Conquered" if any subject proficiency increased by ≥15% (mock static for v1). | SHOULD |
| PR-10 | "View My Memory 🧠" button MUST navigate to `/memory`. | MUST |

---

## 9. Memory Panel  `/memory`

| ID | Requirement | Priority |
|---|---|---|
| MEM-01 | Page AND drawer MUST load all memory data from `mock_memory.json` for current userId. | MUST |
| MEM-02 | MemorySummaryCard at top MUST display `reflectSummary` string with a brain icon and violet left border accent. | MUST |
| MEM-03 | Four MemoryTypeSection blocks MUST render: 🌍 World, 🎯 Experiences, 🔍 Observations, 💭 Opinions. | MUST |
| MEM-04 | Each section MUST be collapsible (expand/collapse toggle). All MUST default to expanded. | SHOULD |
| MEM-05 | Each MemoryEntry MUST show: content text, category badge, timestamp (relative). | MUST |
| MEM-06 | Opinions MUST additionally show a ConfidenceBadge with the confidence score (e.g. `0.91`). Badge color: green ≥0.8, amber 0.6–0.79, muted <0.6. | MUST |
| MEM-07 | 🧠 icon in sidebar MUST open the Memory panel as a shadcn/ui Sheet (drawer from left), not navigate to `/memory`. | MUST |
| MEM-08 | The Sheet MUST be closable via: × button, clicking outside, or pressing Escape. | MUST |
| MEM-09 | Memory page (`/memory`) and Memory drawer MUST show identical content. | MUST |

---

## 10. Sidebar

| ID | Requirement | Priority |
|---|---|---|
| S-01 | Active route MUST be highlighted in sidebar with violet background pill on the nav item. | MUST |
| S-02 | Streak counter MUST always be visible in sidebar regardless of collapsed state. | MUST |
| S-03 | Brain (🧠) icon MUST always be visible at the bottom of the sidebar. | MUST |
| S-04 | User name and avatar initials MUST appear at the bottom of the sidebar. Clicking MUST navigate to `/profile`. | MUST |
| S-05 | On desktop, sidebar items MUST show icon + label. On tablet (collapsed), MUST show icon only with tooltip on hover. | SHOULD |

---

## 11. Error & Empty States

| ID | Requirement | Priority |
|---|---|---|
| E-01 | If `mock_chats_planner.json` has no messages for a userId, chat MUST show: "No conversations yet. Try asking me what to study today!" | MUST |
| E-02 | If `mock_tests.json` has no tests for a userId, TestHistory MUST show: "No tests taken yet. Head to Tests to get started." | MUST |
| E-03 | If `mock_flashcards.json` has no cards for a subject/topic combination, FlashcardStack MUST show: "No flashcards available for this topic yet." | MUST |
| E-04 | If subject proficiency has `testCount: 0`, proficiency bar MUST render with dashed border and "No tests yet" label instead of a percentage. | SHOULD |
| E-05 | All loading states MUST show a skeleton shimmer (not a spinner). Skeleton MUST match the shape of the content it replaces. | SHOULD |

---

## 12. Component State Specifications

### TapCard
| State | Visual |
|---|---|
| Default | Dark surface bg, border `rgba(255,255,255,0.1)`, text white |
| Hover | Border violet `#7C6AF5`, bg slightly elevated |
| Selected | Violet border 2px, checkmark appears top-right, bg `#EAE8FD/10` |
| Disabled | 50% opacity, no pointer events |

### OptionTile (Quiz)
| State | Visual |
|---|---|
| Default | Dark surface bg, white text, border default |
| Hover | Border violet, cursor pointer |
| Selected | Violet bg, white text, no border |
| Correct (results) | Green bg `#17C964`, white text, ✓ icon |
| Wrong (results) | Red bg `#F31260`, white text, ✗ icon |
| Correct-but-not-chosen (results) | Green outline border, green text |

### PomodoroTimer
| State | Visual |
|---|---|
| Idle | Full duration, grey text, Start button violet |
| Running | Countdown active, ring progress indicator animates |
| Paused | Frozen count, Pause button changes to Resume |
| Break | Amber accent color swap for ring and button |
| Complete | 00:00, MoodCheckin modal fires |

---

## 13. Navigation & Routing Rules

| From | Action | To |
|---|---|---|
| `/login` | Submit valid name (existing user) | `/planner` |
| `/login` | Submit new name | `/onboarding` |
| `/onboarding` Step 8 CTA | Complete onboarding | `/planner` |
| Sidebar: Planner | Click | `/planner` |
| Sidebar: Mentor | Click | `/mentor` |
| Sidebar: Tests | Click | `/tests` |
| Sidebar: Profile | Click | `/profile` |
| Sidebar: 🧠 | Click | Opens Memory Drawer (stays on current page) |
| SchedulerPanel task | Click | `/mentor/[subjectId]?topic=[topic]` |
| TeachingCTA "Yes" | Click | `/tests?subject=[subjectId]&mode=mentor-assigned` |
| QuizLaunchButton | Click | `/tests?subject=[subjectId]&topic=[topic]` |
| Results "Go to Mentor" | Click | `/mentor/[subjectId]` |
| Profile "View My Memory" | Click | `/memory` |
| TestHistoryRow "View" | Click | `/tests/results/[testId]` |

---

*— End of SRS — Sage v1.0 — UI Behaviour Specification*