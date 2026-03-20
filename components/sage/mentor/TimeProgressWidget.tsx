"use client"

import { motion } from "framer-motion"

function getTimeProgress() {
  const now = new Date()
  const year = now.getFullYear()
  const startOfYear = new Date(year, 0, 1)
  const endOfYear = new Date(year + 1, 0, 1)

  // Year progress
  const yearPct = ((now.getTime() - startOfYear.getTime()) / (endOfYear.getTime() - startOfYear.getTime())) * 100

  // Month progress
  const startOfMonth = new Date(year, now.getMonth(), 1)
  const endOfMonth = new Date(year, now.getMonth() + 1, 1)
  const monthPct = ((now.getTime() - startOfMonth.getTime()) / (endOfMonth.getTime() - startOfMonth.getTime())) * 100

  // Week progress (Mon–Sun)
  const dayOfWeek = (now.getDay() + 6) % 7 // 0=Mon
  const weekPct = ((dayOfWeek * 24 * 60 + now.getHours() * 60 + now.getMinutes()) / (7 * 24 * 60)) * 100

  // Day progress
  const dayPct = ((now.getHours() * 60 + now.getMinutes()) / (24 * 60)) * 100

  // Life — assume avg 80 years, user is ~20
  const lifePct = (20 / 80) * 100

  return [
    { label: "Life",  pct: lifePct },
    { label: "Year",  pct: yearPct },
    { label: "Month", pct: monthPct },
    { label: "Week",  pct: weekPct },
    { label: "Day",   pct: dayPct },
  ]
}

export function TimeProgressWidget() {
  const bars = getTimeProgress()

  return (
    <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-4 space-y-2.5">
      <p className="text-[10px] font-semibold tracking-[0.15em] text-[#6b7280] uppercase mb-3">
        Time Progress
      </p>
      {bars.map((bar, i) => (
        <div key={bar.label} className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${bar.pct}%` }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
            />
          </div>
          <div className="flex items-center gap-2 w-[80px] justify-between flex-shrink-0">
            <span className="text-[11px] text-[#6b7280]">{bar.label}:</span>
            <span className="text-[11px] text-white font-medium tabular-nums">
              {bar.pct.toFixed(2)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
