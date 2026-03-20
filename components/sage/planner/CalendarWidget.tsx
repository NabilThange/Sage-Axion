"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CalendarWidgetProps {
  isMaximized?: boolean
  onToggleMaximize?: () => void
}

const DAYS = ["S", "M", "T", "W", "T", "F", "S"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

export function CalendarWidget({ isMaximized, onToggleMaximize }: CalendarWidgetProps) {
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells: { day: number; type: "prev" | "current" | "next" }[] = []

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, type: "prev" })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, type: "current" })
  }
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, type: "next" })
  }

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

  const isToday = (day: number, type: string) =>
    type === "current" &&
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()

  return (
    <div className="planner-widget flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <span className="text-sm font-medium text-white/80 tracking-wide">Calendar</span>
        <button
          onClick={onToggleMaximize}
          className="w-6 h-6 flex items-center justify-center rounded text-white/40 hover:text-white/80 hover:bg-white/[0.06] transition-all"
          title={isMaximized ? "Collapse" : "Expand"}
        >
          {isMaximized ? (
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M8.5 1H12V4.5M4.5 12H1V8.5M12 8.5V12H8.5M1 4.5V1H4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 8.5V12H4.5M8.5 1H12V4.5M12 8.5V12H8.5M1 4.5V1H4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Calendar body */}
      <div className="flex-1 px-4 py-3 flex flex-col">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-white/90">
            {MONTHS[month]} {year}
          </span>
          <div className="flex gap-1">
            <button
              onClick={prevMonth}
              className="w-5 h-5 flex items-center justify-center rounded text-white/40 hover:text-white/80 hover:bg-white/[0.06] transition-all"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M6.5 2L3.5 5L6.5 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={nextMonth}
              className="w-5 h-5 flex items-center justify-center rounded text-white/40 hover:text-white/80 hover:bg-white/[0.06] transition-all"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map((d, i) => (
            <div key={i} className="text-center text-[10px] font-medium text-white/30 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Date grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${year}-${month}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-7 gap-y-0.5"
          >
            {cells.map((cell, i) => (
              <div key={i} className="flex items-center justify-center py-0.5">
                <span
                  className={`w-6 h-6 flex items-center justify-center text-[11px] rounded-full transition-all cursor-pointer
                    ${isToday(cell.day, cell.type)
                      ? "bg-[#FF6B47] text-white font-semibold"
                      : cell.type === "current"
                        ? "text-white/70 hover:bg-white/10"
                        : "text-white/20"
                    }
                  `}
                >
                  {cell.day}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
