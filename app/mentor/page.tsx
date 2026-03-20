"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sidebar } from "@/components/sage/Sidebar"
import { SubjectCard } from "@/components/sage/mentor/SubjectCard"
import { TimeProgressWidget } from "@/components/sage/mentor/TimeProgressWidget"
import { ExamCountdownWidget } from "@/components/sage/mentor/ExamCountdownWidget"
import { PomodoroWidget } from "@/components/sage/mentor/PomodoroWidget"
import users from "@/lib/mock/users.json"
import briefingData from "@/lib/mock/mock_briefing.json"

// ----- Toolbar icon components -----
function ToolbarIcon({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <button
      title={title}
      className="w-7 h-7 flex items-center justify-center rounded-md text-[#6b7280] hover:text-white hover:bg-white/[0.07] transition-all"
    >
      {children}
    </button>
  )
}

// Deterministic proficiency based on subject index (stable across renders)
const PROFICIENCY_MAP: Record<string, { proficiency: number; topicsCompleted: number; lastStudied: string }> = {
  IOT:      { proficiency: 72, topicsCompleted: 22, lastStudied: "2 days ago" },
  DS:       { proficiency: 58, topicsCompleted: 17, lastStudied: "1 day ago" },
  OS:       { proficiency: 41, topicsCompleted: 12, lastStudied: "4 days ago" },
  DBMS:     { proficiency: 83, topicsCompleted: 25, lastStudied: "today" },
  CN:       { proficiency: 64, topicsCompleted: 19, lastStudied: "3 days ago" },
  Physics:  { proficiency: 55, topicsCompleted: 16, lastStudied: "2 days ago" },
  Chemistry:{ proficiency: 38, topicsCompleted: 11, lastStudied: "5 days ago" },
  Maths:    { proficiency: 77, topicsCompleted: 23, lastStudied: "yesterday" },
}

function getSubjectData(subjects: string[]) {
  return subjects.map((name) => ({
    name,
    totalTopics: 30,
    ...(PROFICIENCY_MAP[name] ?? {
      proficiency: 60,
      topicsCompleted: 18,
      lastStudied: "3 days ago",
    }),
  }))
}

export default function MentorPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [briefing, setBriefing] = useState<any>(null)
  const [filter, setFilter] = useState<"active" | "past">("active")
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (typeof window === "undefined") return
    const userId = localStorage.getItem("sage_userId")
    if (!userId) { router.push("/login"); return }

    const userData = users[userId as keyof typeof users]
    const briefingInfo = briefingData[userId as keyof typeof briefingData]
    if (userData) { setUser(userData); setBriefing(briefingInfo) }
    else { localStorage.clear(); router.push("/login") }
  }, [router])

  const subjectData = useMemo(
    () => (user ? getSubjectData(user.subjects) : []),
    [user]
  )

  const filteredSubjects = useMemo(() => {
    let list = subjectData
    if (searchQuery) list = list.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    return list
  }, [subjectData, searchQuery])

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#111111]">
        <div className="flex items-center gap-2 text-sm text-white/30">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-spin">
            <path d="M8 1.5V4M8 12V14.5M14.5 8H12M4 8H1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#111111] overflow-hidden">
      {/* Sidebar — untouched */}
      <Sidebar currentPage="mentor" />

      {/* ── Main area ── */}
      <div className="flex-1 flex overflow-hidden min-w-0">

        {/* Left/Main column */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="px-8 py-7 max-w-[900px]">

            {/* Page header */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <h1 className="text-2xl font-bold text-white tracking-tight">Your Subjects</h1>
              <p className="text-sm text-[#6b7280] mt-0.5">Choose a subject to start learning</p>
            </motion.div>

            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="flex items-center justify-between mb-6"
            >
              {/* Left — filter pills */}
              <div className="flex items-center gap-1.5 p-0.5 bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg">
                <button
                  onClick={() => setFilter("active")}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    filter === "active"
                      ? "bg-white/10 text-white"
                      : "text-[#6b7280] hover:text-white"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter("past")}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    filter === "past"
                      ? "bg-white/10 text-white"
                      : "text-[#6b7280] hover:text-white"
                  }`}
                >
                  Past
                </button>
              </div>

              {/* Right — icon actions + New button */}
              <div className="flex items-center gap-1">
                {/* Search toggle */}
                <div className="flex items-center gap-1">
                  {searchOpen && (
                    <motion.input
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 160, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search subjects..."
                      className="h-7 px-2.5 bg-[#1c1c1c] border border-[#2a2a2a] rounded-md text-xs text-white placeholder:text-[#6b7280] focus:outline-none focus:border-[#3a3a3a] mr-1"
                    />
                  )}
                  <ToolbarIcon title="Search">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setSearchQuery("") }}>
                      <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M8.5 8.5L11.5 11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </ToolbarIcon>
                </div>

                <ToolbarIcon title="Filter">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M1.5 3.5H11.5M3.5 6.5H9.5M5.5 9.5H7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </ToolbarIcon>

                <ToolbarIcon title="Sort">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2 4h9M2 6.5h6M2 9h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </ToolbarIcon>

                <ToolbarIcon title="AI assist">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 1V3M6.5 10V12M1 6.5H3M10 6.5H12M3.05 3.05L4.46 4.46M8.54 8.54L9.95 9.95M3.05 9.95L4.46 8.54M8.54 4.46L9.95 3.05" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </ToolbarIcon>

                <div className="w-px h-4 bg-[#2a2a2a] mx-0.5" />

                {/* + New button */}
                <button className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-semibold transition-all">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M5.5 1V10M1 5.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  New
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M3 4L5 6L7 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Subject card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubjects.map((subject, i) => (
                <SubjectCard key={subject.name} subject={subject} index={i} />
              ))}

              {filteredSubjects.length === 0 && (
                <div className="col-span-3 py-12 text-center text-[#6b7280] text-sm">
                  No subjects match "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right sidebar — widgets ── */}
        <aside className="w-[280px] flex-shrink-0 border-l border-[#1f1f1f] bg-[#111111] overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Widget 1 — Time progress */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <TimeProgressWidget />
            </motion.div>

            {/* Widget 2 — Exam countdown */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
            >
              <ExamCountdownWidget
                examDate={user.examDate}
                examName={briefing?.examName ?? "Upcoming Exam"}
              />
            </motion.div>

            {/* Widget 3 — Pomodoro */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.26 }}
            >
              <PomodoroWidget />
            </motion.div>
          </div>
        </aside>
      </div>
    </div>
  )
}
