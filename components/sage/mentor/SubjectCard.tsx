"use client"

import Link from "next/link"
import { motion } from "framer-motion"

interface SubjectCardProps {
  subject: {
    name: string
    proficiency: number
    lastStudied: string
    topicsCompleted: number
    totalTopics: number
    commentCount?: number
  }
  index?: number
}

// Unique solid gradient per subject
const SUBJECT_THEMES: Record<string, { from: string; to: string; icon: string; iconBg: string }> = {
  IOT:      { from: "#7f1d1d", to: "#b91c1c",  icon: "⚡", iconBg: "#dc2626" },
  DS:       { from: "#14532d", to: "#15803d",  icon: "🌿", iconBg: "#16a34a" },
  OS:       { from: "#1e3a5f", to: "#1d4ed8",  icon: "⚙️", iconBg: "#2563eb" },
  DBMS:     { from: "#78350f", to: "#b45309",  icon: "🗄️", iconBg: "#d97706" },
  CN:       { from: "#312e81", to: "#4338ca",  icon: "🌐", iconBg: "#6366f1" },
  Physics:  { from: "#0c4a6e", to: "#0284c7",  icon: "🔭", iconBg: "#0ea5e9" },
  Chemistry:{ from: "#4a044e", to: "#7e22ce",  icon: "🧪", iconBg: "#9333ea" },
  Maths:    { from: "#134e4a", to: "#0f766e",  icon: "∑",  iconBg: "#14b8a6" },
}

const FALLBACK_THEME = { from: "#1f2937", to: "#374151", icon: "📚", iconBg: "#6b7280" }

function getProficiencyColor(p: number) {
  if (p >= 70) return { bar: "#22c55e", glow: "#22c55e33", text: "#4ade80" }
  if (p >= 50) return { bar: "#f59e0b", glow: "#f59e0b33", text: "#fbbf24" }
  return { bar: "#ef4444", glow: "#ef444433", text: "#f87171" }
}

export function SubjectCard({ subject, index = 0 }: SubjectCardProps) {
  const theme = SUBJECT_THEMES[subject.name] ?? FALLBACK_THEME
  const colors = getProficiencyColor(subject.proficiency)
  const commentCount = subject.commentCount ?? Math.floor(Math.random() * 5) + 1

  return (
    <Link href={`/mentor/${subject.name.toLowerCase()}`}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}
        whileHover={{ y: -3, boxShadow: `0 8px 32px ${colors.glow}` }}
        className="group rounded-xl overflow-hidden border border-[#2a2a2a] hover:border-[#3a3a3a] bg-[#1c1c1c] cursor-pointer transition-all duration-200"
      >
        {/* Zone 1 — Cover */}
        <div
          className="h-[120px] w-full relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)` }}
        >
          {/* Decorative noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px",
            }}
          />
          {/* Large faded subject initial */}
          <span
            className="absolute bottom-2 right-3 text-6xl font-black opacity-[0.12] select-none leading-none"
            style={{ color: "white" }}
          >
            {subject.name.charAt(0)}
          </span>
        </div>

        {/* Zone 2 — Card Header */}
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {/* Page icon */}
              <div
                className="w-5 h-5 rounded flex items-center justify-center text-[11px] flex-shrink-0"
                style={{ backgroundColor: theme.iconBg + "33", border: `1px solid ${theme.iconBg}55` }}
              >
                <span style={{ color: theme.iconBg }}>{theme.icon}</span>
              </div>
              <span className="text-sm font-semibold text-white">{subject.name}</span>
            </div>
            {/* Comment count */}
            <div className="flex items-center gap-1 text-[#6b7280]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M10 1H2C1.45 1 1 1.45 1 2V8C1 8.55 1.45 9 2 9H4L6 11L8 9H10C10.55 9 11 8.55 11 8V2C11 1.45 10.55 1 10 1Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
              </svg>
              <span className="text-[11px]">{commentCount}</span>
            </div>
          </div>
          <p className="text-[11px] text-[#6b7280] mt-1 ml-7">Last studied {subject.lastStudied}</p>
        </div>

        {/* Zone 3 — Proficiency */}
        <div className="px-4 pt-2 pb-3 border-t border-[#222] mt-1">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] text-[#6b7280]">Proficiency</span>
            <span className="text-[12px] font-bold" style={{ color: colors.text }}>
              {subject.proficiency}%
            </span>
          </div>
          <div className="h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: colors.bar }}
              initial={{ width: 0 }}
              animate={{ width: `${subject.proficiency}%` }}
              transition={{ duration: 0.7, delay: index * 0.07 + 0.3, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[11px] text-[#6b7280]">Topics</span>
            <span className="text-[11px] text-[#6b7280]">
              {subject.topicsCompleted}/{subject.totalTopics} completed
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
