"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sage/Sidebar"
import { ChatPanel } from "@/components/sage/planner/ChatPanel"
import { CalendarWidget } from "@/components/sage/planner/CalendarWidget"
import { SchedulerWidget } from "@/components/sage/planner/SchedulerWidget"
import users from "@/lib/mock/users.json"
import briefingData from "@/lib/mock/mock_briefing.json"

type MaximizedWidget = null | "calendar" | "scheduler"

export default function PlannerPage() {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [briefing, setBriefing] = useState<any>(null)
  const [maximized, setMaximized] = useState<MaximizedWidget>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const storedUserId = localStorage.getItem("sage_userId")
    if (!storedUserId) { router.push("/login"); return }

    setUserId(storedUserId)
    const userData = users[storedUserId as keyof typeof users]
    const briefingInfo = briefingData[storedUserId as keyof typeof briefingData]

    if (userData && briefingInfo) {
      setUser(userData)
      setBriefing(briefingInfo)
    } else {
      localStorage.clear()
      router.push("/login")
    }
  }, [router])

  if (!user || !briefing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a]">
        <div className="flex items-center gap-2 text-sm text-white/30">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-spin">
            <path d="M8 1.5V4M8 12V14.5M14.5 8H12M4 8H1.5M12.36 3.64L10.6 5.4M5.4 10.6L3.64 12.36M12.36 12.36L10.6 10.6M5.4 5.4L3.64 3.64" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Loading...
        </div>
      </div>
    )
  }

  // Extract first name from greeting or fallback
  const firstName = user.name?.split(" ")[0] ?? briefing.greeting?.split(",")[1]?.trim()?.replace("!", "") ?? "Nabil"

  const toggleMaximize = (widget: "calendar" | "scheduler") => {
    setMaximized((prev) => (prev === widget ? null : widget))
  }

  return (
    <div className="flex h-screen bg-[#1a1a1a] overflow-hidden">
      {/* Sidebar — untouched */}
      <Sidebar currentPage="planner" />

      {/* Center — Chat */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-white/[0.05]">
        <ChatPanel userId={userId!} userName={firstName} />
      </div>

      {/* Right panel — Widget column */}
      <div className="w-[330px] flex-shrink-0 flex flex-col bg-[#1e1e1e] border-l border-white/[0.05]">
        {/* Calendar widget */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            maximized === "calendar"
              ? "flex-1"
              : maximized === "scheduler"
                ? "h-0 !p-0"
                : "flex-1"
          }`}
        >
          <CalendarWidget
            isMaximized={maximized === "calendar"}
            onToggleMaximize={() => toggleMaximize("calendar")}
          />
        </div>

        {/* ── Visual break ── */}
        {maximized === null && (
          <div className="flex-shrink-0 flex items-center gap-3 px-4 py-0">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-[9px] font-semibold tracking-[0.18em] text-white/20 uppercase select-none">
              Schedule
            </span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>
        )}

        {/* Scheduler widget */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            maximized === "scheduler"
              ? "flex-1"
              : maximized === "calendar"
                ? "h-0 !p-0"
                : "flex-1"
          }`}
        >
          <SchedulerWidget
            isMaximized={maximized === "scheduler"}
            onToggleMaximize={() => toggleMaximize("scheduler")}
          />
        </div>
      </div>
    </div>
  )
}
