# Sage Backend Integration Task List

## Phase 1: Supabase Setup & Database Migration

### 1.1 Supabase Project Setup
- [ ] Create Supabase project
- [ ] Install Supabase client: `pnpm add @supabase/supabase-js`
- [ ] Create `/lib/supabase/client.ts` with Supabase client initialization
- [ ] Add environment variables to `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

### 1.2 Database Schema Creation
Create all tables in Supabase:

- [ ] **users** table
  - id (uuid, primary key)
  - email (text)
  - name (text)
  - education_level (text)
  - curriculum (text)
  - semester (text)
  - streak (integer, default 0)
  - xp (integer, default 0)
  - exam_date (date)
  - created_at (timestamp)
  - updated_at (timestamp)

- [ ] **subjects** table
  - id (uuid, primary key)
  - user_id (uuid, foreign key → users)
  - name (text)
  - code (text)
  - total_modules (integer)
  - last_studied (timestamp)
  - created_at (timestamp)

- [ ] **modules** table
  - id (uuid, primary key)
  - subject_id (uuid, foreign key → subjects)
  - number (integer)
  - name (text)
  - created_at (timestamp)

- [ ] **topics** table
  - id (uuid, primary key)
  - module_id (uuid, foreign key → modules)
  - name (text)
  - subtopics (jsonb array)
  - created_at (timestamp)

- [ ] **proficiency** table
  - id (uuid, primary key)
  - user_id (uuid, foreign key → users)
  - subject_id (uuid, foreign key → subjects)
  - score (integer, 0-100)
  - topics_completed (integer)
  - total_topics (integer)
  - updated_at (timestamp)

- [ ] **tests** table
  - id (uuid, primary key)
  - user_id (uuid, foreign key → users)
  - subject_id (uuid, foreign key → subjects)
  - mode (text: 'student' | 'mentor')
  - questions (jsonb array)
  - answers (jsonb array)
  - score (integer)
  - total_questions (integer)
  - time_taken (integer, seconds)
  - insight (text)
  - created_at (timestamp)

- [ ] **flashcards** table
  - id (uuid, primary key)
  - user_id (uuid, foreign key → users)
  - subject_id (uuid, foreign key → subjects)
  - topic_id (uuid, foreign key → topics)
  - front (text)
  - back (text)
  - mastery_level (integer, 0-5)
  - last_reviewed (timestamp)
  - created_at (timestamp)

- [ ] **schedule** table
  - id (uuid, primary key)
  - user_id (uuid, foreign key → users)
  - title (text)
  - description (text)
  - event_type (text: 'exam' | 'task' | 'study')
  - subject_id (uuid, foreign key → subjects, nullable)
  - start_time (timestamp)
  - end_time (timestamp)
  - completed (boolean, default false)
  - created_at (timestamp)

- [ ] **syllabuses** table
  - id (uuid, primary key)
  - user_id (uuid, foreign key → users)
  - file_name (text)
  - parsed_data (jsonb)
  - created_at (timestamp)

- [ ] **chat_history** table
  - id (uuid, primary key)
  - user_id (uuid, foreign key → users)
  - chat_type (text: 'planner' | 'mentor')
  - subject_id (uuid, foreign key → subjects, nullable)
  - role (text: 'user' | 'assistant')
  - content (text)
  - created_at (timestamp)

### 1.3 Seed Database with Mock Data
- [ ] Create `/lib/supabase/seed.ts` script
- [ ] Migrate data from `users.json` to users table
- [ ] Migrate data from `mock_briefing.json` to schedule table
- [ ] Add hardcoded proficiency data from `PROFICIENCY_MAP` to proficiency table
- [ ] Create seed subjects for Aryan (IOT, DS, OS, DBMS, CN)
- [ ] Create seed subjects for Priya (Physics, Chemistry, Maths)

### 1.4 Replace localStorage with Supabase Auth
- [ ] Set up Supabase Auth in login page
- [ ] Update `/app/(auth)/login/page.tsx` to use Supabase auth
- [ ] Create auth helper functions in `/lib/supabase/auth.ts`
- [ ] Update all pages to check Supabase session instead of localStorage
- [ ] Remove all `localStorage.getItem("sage_userId")` calls

### 1.5 Update Zustand Store
- [ ] Update `userStore.ts` to fetch from Supabase
- [ ] Add actions: `fetchUser()`, `syncUser()`
- [ ] Integrate store across all pages (replace direct Supabase calls)

---

## Phase 2: PDF Pipeline with Bytez

### 2.1 Install Dependencies
- [ ] Install pdf-parse: `pnpm add pdf-parse`
- [ ] Install Bytez SDK (if available) or use fetch for API calls
- [ ] Add environment variable: `BYTEZ_API_KEY`

### 2.2 Create Syllabus Parser API Route
- [ ] Create `/app/api/parse-syllabus/route.ts`
- [ ] Implement file upload handling (multipart/form-data)
- [ ] Extract text from PDF using pdf-parse
- [ ] Send extracted text to Bytez API with structured prompt
- [ ] Parse Bytez response into JSON schema:
  ```json
  {
    "parsed": true,
    "educationLevel": "string",
    "curriculum": "string",
    "semester": number,
    "subjects": [
      {
        "id": "string",
        "name": "string",
        "code": "string",
        "totalModules": number,
        "modules": [
          {
            "id": "string",
            "number": number,
            "name": "string",
            "topics": [
              {
                "id": "string",
                "name": "string",
                "subtopics": ["string"]
              }
            ]
          }
        ]
      }
    ]
  }
  ```
- [ ] Save parsed data to Supabase `syllabuses` table
- [ ] Populate `subjects`, `modules`, `topics` tables from parsed data
- [ ] Return success response with subject count

### 2.3 Update Onboarding Step 5
- [ ] Update `Step5.tsx` to call `/api/parse-syllabus`
- [ ] Show upload progress indicator
- [ ] Handle parsing errors gracefully
- [ ] Display parsed subjects count on success
- [ ] Auto-populate Step 6 subject selection from parsed data

### 2.4 Update Onboarding Step 6
- [ ] Fetch subjects from Supabase (from parsed syllabus)
- [ ] Allow manual subject addition if no syllabus uploaded
- [ ] Save selected subjects to user profile

### 2.5 Update Onboarding Step 7 (Topic Tree)
- [ ] Fetch modules and topics from Supabase for selected subjects
- [ ] Update `TopicTree.tsx` to use real data
- [ ] Save known topics to user proficiency table

---

## Phase 3: Groq AI Integration

### 3.1 Setup Groq Client
- [ ] Install Groq SDK: `pnpm add groq-sdk`
- [ ] Create `/lib/groq/client.ts` with Groq initialization
- [ ] Add environment variable: `GROQ_API_KEY`
- [ ] Set default model: `qwen3-32b`

### 3.2 Planner Chat API
- [ ] Create `/app/api/chat/planner/route.ts`
- [ ] Implement POST handler with message history
- [ ] Call Hindsight `recall()` before Groq call
- [ ] Inject student memory into system prompt
- [ ] Stream Groq response back to client
- [ ] Save chat message to `chat_history` table

### 3.3 Mentor Chat API
- [ ] Create `/app/api/chat/mentor/route.ts`
- [ ] Accept `subjectId` parameter
- [ ] Call Hindsight `recall()` for subject-specific memory
- [ ] Inject subject context + student memory into system prompt
- [ ] Stream Groq response
- [ ] Detect "re-explain" signals and call Hindsight `retain()`
- [ ] Save chat to `chat_history` table

### 3.4 Quiz Generation API
- [ ] Create `/app/api/generate/quiz/route.ts`
- [ ] Accept: `subjectId`, `topicIds[]`, `difficulty`, `count`
- [ ] Call Hindsight `recall()` to get weak areas
- [ ] Generate MCQ questions targeting weak topics
- [ ] Return structured JSON:
  ```json
  {
    "questions": [
      {
        "id": "string",
        "question": "string",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "A",
        "explanation": "string",
        "topic": "string"
      }
    ]
  }
  ```

### 3.5 Flashcard Generation API
- [ ] Create `/app/api/generate/flashcards/route.ts`
- [ ] Accept: `subjectId`, `topicId`
- [ ] Generate 10-15 flashcards for the topic
- [ ] Save to `flashcards` table
- [ ] Return flashcard array

### 3.6 Summary Generation API
- [ ] Create `/app/api/generate/summary/route.ts`
- [ ] Accept: `subjectId`, `topicId`, `chatHistory`
- [ ] Generate concise summary of what was taught
- [ ] Return summary text

### 3.7 Daily Briefing API
- [ ] Create `/app/api/generate/briefing/route.ts`
- [ ] Call Hindsight `recall()` + `reflect()`
- [ ] Generate personalized greeting
- [ ] Return briefing data:
  ```json
  {
    "greeting": "string",
    "todayFocus": "string",
    "weakestTopic": "string",
    "weakestSubject": "string"
  }
  ```

### 3.8 Test Insight API
- [ ] Create `/app/api/generate/insight/route.ts`
- [ ] Accept: test results (score, questions, answers)
- [ ] Generate one-line insight
- [ ] Return insight text

---

## Phase 4: Hindsight Memory Integration

### 4.1 Setup Hindsight Client
- [ ] Install Hindsight SDK (or use fetch for API)
- [ ] Create `/lib/hindsight/client.ts`
- [ ] Add environment variable: `HINDSIGHT_API_KEY`
- [ ] Create helper functions: `recall()`, `retain()`, `reflect()`

### 4.2 Memory Retain API
- [ ] Create `/app/api/memory/retain/route.ts`
- [ ] Accept: `userId`, `memoryType`, `content`, `metadata`
- [ ] Call Hindsight `retain()` API
- [ ] Return success response

### 4.3 Memory Recall API
- [ ] Create `/app/api/memory/recall/route.ts`
- [ ] Accept: `userId`, `context` (optional: subjectId, topicId)
- [ ] Call Hindsight `recall()` API
- [ ] Return memory array

### 4.4 Memory Reflect API
- [ ] Create `/app/api/memory/reflect/route.ts`
- [ ] Accept: `userId`, `reflectionType`
- [ ] Call Hindsight `reflect()` API
- [ ] Return reflection summary

### 4.5 Integrate Retain Calls
- [ ] **PomodoroWidget**: Call `retain()` on mood check-in
- [ ] **MentorChatPanel**: Call `retain()` on re-explain signal
- [ ] **TestResults**: Call `retain()` on test completion
- [ ] **ChatPanel**: Call `retain()` on important student messages

### 4.6 Integrate Recall Calls
- [ ] **MentorChatPanel**: Call `recall()` on component mount
- [ ] **ChatPanel**: Call `recall()` before every message
- [ ] **DailyBriefingCard**: Call `recall()` on app open
- [ ] **SourcesPanel**: Call `recall()` for subject history

### 4.7 Integrate Reflect Calls
- [ ] **TestResults**: Call `reflect()` to generate insight
- [ ] **DailyBriefingCard**: Call `reflect()` for briefing data
- [ ] **Memory page**: Call `reflect()` to display patterns

---

## Phase 5: Update Components to Use APIs

### 5.1 Update ChatPanel (Planner)
- [ ] Replace mock chat with real API calls to `/api/chat/planner`
- [ ] Implement streaming response handling
- [ ] Save messages to Supabase `chat_history`
- [ ] Load chat history on mount

### 5.2 Update MentorChatPanel
- [ ] Create `MentorChatPanel.tsx` component (currently just StudioPanel)
- [ ] Call `/api/chat/mentor` with subjectId
- [ ] Implement streaming response
- [ ] Detect re-explain signals and call `/api/memory/retain`
- [ ] Load subject-specific chat history

### 5.3 Update TestInterface
- [ ] Call `/api/generate/quiz` on test start
- [ ] Display generated questions
- [ ] Track answers and time
- [ ] Submit to `/api/tests/save` on completion

### 5.4 Update TestResults
- [ ] Call `/api/generate/insight` to get AI insight
- [ ] Call `/api/memory/retain` to save test result
- [ ] Update proficiency in Supabase based on score

### 5.5 Update StudioPanel
- [ ] Add tabs: Chat, Flashcards, Summary
- [ ] Call `/api/generate/flashcards` for flashcard tab
- [ ] Call `/api/generate/summary` for summary tab
- [ ] Implement flashcard review UI with mastery tracking

### 5.6 Update SubjectCard (Mentor)
- [ ] Fetch proficiency from Supabase
- [ ] Make card clickable → navigate to `/mentor/[subjectId]`
- [ ] Show real last_studied date

### 5.7 Update DailyBriefingCard
- [ ] Create this component (mentioned but doesn't exist)
- [ ] Call `/api/generate/briefing` on mount
- [ ] Display personalized greeting and focus

### 5.8 Update SchedulerWidget & CalendarWidget
- [ ] Fetch events from Supabase `schedule` table
- [ ] Implement add/edit/delete event functionality
- [ ] Create `/app/api/schedule/route.ts` for CRUD operations

### 5.9 Update ProficiencyBars
- [ ] Fetch from Supabase `proficiency` table
- [ ] Show real-time proficiency scores

### 5.10 Update TestHistory
- [ ] Fetch from Supabase `tests` table
- [ ] Display past tests with scores and dates

### 5.11 Update Memory Page
- [ ] Call `/api/memory/recall` to fetch all memory types
- [ ] Call `/api/memory/reflect` to show patterns
- [ ] Display real memory data instead of hardcoded mock

### 5.12 Update ExamCountdownWidget
- [ ] Fetch exam date from Supabase `schedule` table
- [ ] Calculate days remaining dynamically

### 5.13 Update TimeProgressWidget
- [ ] Track study time in Supabase
- [ ] Show real time spent today

### 5.14 Update PomodoroWidget
- [ ] Implement actual timer functionality
- [ ] Save session to Supabase on completion
- [ ] Call `/api/memory/retain` with mood check-in

---

## Phase 6: Build Missing Pages & Features

### 6.1 Create Mentor Subject Detail Page
- [ ] Create `/app/mentor/[subjectId]/page.tsx`
- [ ] Layout: Left = SourcesPanel, Center = MentorChatPanel, Right = StudioPanel
- [ ] Fetch subject data from Supabase
- [ ] Load subject-specific chat history

### 6.2 Create SourcesPanel Component
- [ ] Create `/components/sage/mentor/SourcesPanel.tsx`
- [ ] Display: last studied, weak areas, score trend
- [ ] Call `/api/memory/recall` for subject history
- [ ] Show module/topic tree for navigation

### 6.3 Create MentorChatPanel Component
- [ ] Create `/components/sage/mentor/MentorChatPanel.tsx`
- [ ] Similar to ChatPanel but subject-specific
- [ ] Call `/api/chat/mentor` with subjectId
- [ ] Detect re-explain signals

### 6.4 Create Memory Drawer
- [ ] Install shadcn Sheet component
- [ ] Create `/components/sage/MemoryDrawer.tsx`
- [ ] Trigger from Sidebar 🧠 icon
- [ ] Show quick memory summary
- [ ] Link to full Memory page

### 6.5 Create DailyBriefingCard Component
- [ ] Create `/components/sage/planner/DailyBriefingCard.tsx`
- [ ] Add to Planner page (top of main area)
- [ ] Call `/api/generate/briefing`
- [ ] Show greeting, streak, today's focus

---

## Phase 7: Polish & Optimization

### 7.1 Error Handling
- [ ] Add try-catch blocks to all API routes
- [ ] Return proper error responses
- [ ] Show user-friendly error messages in UI
- [ ] Add loading states to all async operations

### 7.2 Loading States
- [ ] Add skeleton loaders to all data-fetching components
- [ ] Show spinners during API calls
- [ ] Disable buttons during submission

### 7.3 Caching & Performance
- [ ] Implement React Query for data fetching
- [ ] Cache Supabase queries
- [ ] Optimize Groq streaming responses
- [ ] Add debouncing to search inputs

### 7.4 Real-time Updates
- [ ] Set up Supabase real-time subscriptions for:
  - Chat messages
  - Schedule events
  - Proficiency updates

### 7.5 Testing
- [ ] Test all API routes with Postman/Thunder Client
- [ ] Test PDF upload with real syllabus files
- [ ] Test Groq responses with various prompts
- [ ] Test Hindsight memory retention and recall

### 7.6 Environment Variables Documentation
- [ ] Create `.env.example` file
- [ ] Document all required API keys
- [ ] Add setup instructions to README

---

## Phase 8: Final Integration & Testing

### 8.1 End-to-End Testing
- [ ] Test complete onboarding flow (new user)
- [ ] Test login flow (existing user)
- [ ] Test syllabus upload → subject creation
- [ ] Test chat in planner
- [ ] Test mentor subject detail page
- [ ] Test quiz generation and submission
- [ ] Test flashcard generation
- [ ] Test memory retention and recall
- [ ] Test schedule CRUD operations

### 8.2 Data Migration
- [ ] Migrate any remaining mock data to Supabase
- [ ] Remove all mock JSON files
- [ ] Remove all hardcoded data from components

### 8.3 Cleanup
- [ ] Remove unused components
- [ ] Remove console.logs
- [ ] Remove commented code
- [ ] Update README with new architecture

---

## Summary of API Routes to Build

| Route | Service | Purpose |
|-------|---------|---------|
| POST `/api/parse-syllabus` | Bytez + Supabase | Parse PDF syllabus |
| POST `/api/chat/planner` | Groq + Hindsight | Planner chat |
| POST `/api/chat/mentor` | Groq + Hindsight | Mentor chat |
| POST `/api/generate/quiz` | Groq + Hindsight | Generate test questions |
| POST `/api/generate/flashcards` | Groq | Generate flashcards |
| POST `/api/generate/summary` | Groq | Generate topic summary |
| POST `/api/generate/briefing` | Groq + Hindsight | Daily briefing |
| POST `/api/generate/insight` | Groq | Test result insight |
| POST `/api/memory/retain` | Hindsight | Save memory |
| POST `/api/memory/recall` | Hindsight | Retrieve memory |
| POST `/api/memory/reflect` | Hindsight | Generate reflection |
| GET `/api/user/profile` | Supabase | Get user profile |
| POST `/api/tests/save` | Supabase | Save test result |
| GET `/api/schedule` | Supabase | Get schedule events |
| POST `/api/schedule` | Supabase | Create schedule event |
| PUT `/api/schedule/:id` | Supabase | Update schedule event |
| DELETE `/api/schedule/:id` | Supabase | Delete schedule event |

---

## Estimated Timeline

- **Phase 1**: 2-3 days (Supabase setup + migration)
- **Phase 2**: 1-2 days (PDF pipeline)
- **Phase 3**: 2-3 days (Groq integration)
- **Phase 4**: 2 days (Hindsight integration)
- **Phase 5**: 3-4 days (Update all components)
- **Phase 6**: 2-3 days (Build missing features)
- **Phase 7**: 1-2 days (Polish)
- **Phase 8**: 1-2 days (Testing)

**Total**: ~15-20 days of focused development

---

## Priority Order (if doing incrementally)

1. **Phase 1.1-1.4**: Supabase setup + auth (foundation)
2. **Phase 3.2**: Planner chat (most visible feature)
3. **Phase 2**: PDF pipeline (core onboarding feature)
4. **Phase 3.4**: Quiz generation (high-value feature)
5. **Phase 4**: Hindsight integration (memory layer)
6. **Phase 6.1-6.3**: Mentor subject detail page (missing page)
7. **Phase 5**: Update remaining components
8. **Phase 6.4-6.5**: Polish features (drawer, briefing)
9. **Phase 7-8**: Testing and cleanup
