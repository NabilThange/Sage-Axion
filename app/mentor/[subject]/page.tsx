"use client"

import { Sidebar } from "@/components/sage/Sidebar"
import { SourcesPanel } from "@/components/sage/mentor/SourcesPanel"
import { MentorChatPanel } from "@/components/sage/mentor/MentorChatPanel"
import { StudioPanel } from "@/components/sage/mentor/StudioPanel"

// ── Top bar action button ──
function TopBarBtn({
  icon,
  label,
  variant = "ghost",
}: {
  icon: React.ReactNode
  label: string
  variant?: "ghost" | "outline"
}) {
  return (
    <button
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        variant === "outline"
          ? "border border-[#3a3a3a] text-white hover:bg-white/[0.06]"
          : "text-[#9ca3af] hover:text-white hover:bg-white/[0.06]"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

export default function SubjectMentorPage({
  params,
}: {
  params: { subject: string }
}) {
  const { subject: rawSubject } = params
  const subject = decodeURIComponent(rawSubject).toUpperCase()

  return (
    <div className="flex h-screen bg-[#111111] overflow-hidden">
      {/* Sage left nav — untouched */}
      <Sidebar currentPage="mentor" />

      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* ── Unified Top Bar ── */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-2.5 border-b border-[#1e1e1e] bg-[#111111]">
          {/* Subject title */}
          <span className="text-base font-bold text-white tracking-tight">{subject}</span>

          {/* Action row */}
          <div className="flex items-center gap-1">
            <TopBarBtn
              variant="outline"
              label="Create notebook"
              icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              }
            />
            <TopBarBtn
              label="Analytics"
              icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 9L4 5.5L7 7.5L11 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
            <TopBarBtn
              label="Share"
              icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="9.5" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.1"/>
                  <circle cx="2.5" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.1"/>
                  <circle cx="9.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.1"/>
                  <path d="M4 6.7L8 8.9M8 3.1L4 5.3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                </svg>
              }
            />
            <TopBarBtn
              label="Settings"
              icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="1.8" stroke="currentColor" strokeWidth="1.1"/>
                  <path d="M6 1.5V3M6 9V10.5M1.5 6H3M9 6H10.5M2.93 2.93l.9.9M8.17 8.17l.9.9M2.93 9.07l.9-.9M8.17 3.83l.9-.9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                </svg>
              }
            />

            {/* Avatar */}
            <div className="ml-2 w-7 h-7 rounded-full bg-[#3b82f6] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              N
            </div>
          </div>
        </div>

        {/* ── 3-column workspace ── */}
        <div className="flex flex-1 overflow-hidden">

          {/* Column 1 — Sources (~22%) */}
          <div className="w-[240px] flex-shrink-0 overflow-hidden">
            <SourcesPanel subject={subject} />
          </div>

          {/* Column 2 — Chat (~45%, flexible) */}
          <div className="flex-1 min-w-0 overflow-hidden border-x border-[#1e1e1e]">
            <MentorChatPanel subject={subject} sourceCount={3} />
          </div>

          {/* Column 3 — Studio (~33%) */}
          <div className="w-[300px] flex-shrink-0 overflow-hidden">
            <StudioPanel subject={subject} />
          </div>
        </div>
      </div>
    </div>
  )
}
