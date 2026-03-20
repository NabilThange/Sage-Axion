"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface ScheduledEvent {
  id: string
  title: string
  subject: string
  startHour: number
  color: string
  href: string
}

interface SchedulerWidgetProps {
  isMaximized?: boolean
  onToggleMaximize?: () => void
}

const EVENTS: ScheduledEvent[] = [
  {
    id: "1",
    title: "Review Threading",
    subject: "OS",
    startHour: 10,
    color: "#FF6B47",
    href: "/mentor/os?topic=Review%20Threading%20Concepts",
  },
  {
    id: "2",
    title: "Practice SQL Queries",
    subject: "DBMS",
    startHour: 14,
    color: "#F5A524",
    href: "/mentor/dbms?topic=Practice%20SQL%20Queries",
  },
  {
    id: "3",
    title: "IOT Sensors Quiz",
    subject: "IOT",
    startHour: 16,
    color: "#17C964",
    href: "/mentor/iot?topic=IOT%20Sensors%20Quiz",
  },
]

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

function formatHour(h: number) {
  if (h === 12) return "12 PM"
  if (h === 0) return "12 AM"
  return h > 12 ? `${h - 12} PM` : `${h} AM`
}

export function SchedulerWidget({ isMaximized, onToggleMaximize }: SchedulerWidgetProps) {
  const now = new Date()
  const currentHour = now.getHours()

  const getEventForHour = (hour: number) =>
    EVENTS.find((e) => e.startHour === hour)

  return (
    <div className="planner-widget flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <span className="text-sm font-medium text-white/80 tracking-wide">Scheduler</span>
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

      {/* Time slots */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-0">
        {HOURS.map((hour, idx) => {
          const event = getEventForHour(hour)
          const isCurrent =
            currentHour === hour ||
            (currentHour === hour + 0 && now.getMinutes() < 60)

          return (
            <motion.div
              key={hour}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="flex gap-2.5 items-start"
            >
              {/* Time label */}
              <div className="w-10 flex-shrink-0 pt-0.5">
                <span
                  className={`text-[10px] font-medium ${
                    isCurrent ? "text-[#FF6B47]" : "text-white/25"
                  }`}
                >
                  {formatHour(hour)}
                </span>
              </div>

              {/* Slot */}
              <div className="flex-1 pb-1 min-h-[32px] relative">
                {/* Divider line */}
                <div
                  className={`absolute top-[9px] left-0 right-0 h-px ${
                    isCurrent ? "bg-[#FF6B47]/30" : "bg-white/[0.05]"
                  }`}
                />

                {event ? (
                  <Link href={event.href}>
                    <div
                      className="relative z-10 rounded-md px-2.5 py-1.5 mt-0.5 group cursor-pointer transition-all hover:brightness-110"
                      style={{ backgroundColor: event.color + "22", borderLeft: `2px solid ${event.color}` }}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[10px] font-bold px-1 rounded"
                          style={{ backgroundColor: event.color + "44", color: event.color }}
                        >
                          {event.subject}
                        </span>
                        <span className="text-[11px] text-white/80 group-hover:text-white transition-colors truncate">
                          {event.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="h-5" />
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Add task */}
      <div className="px-3 py-3 border-t border-white/[0.06]">
        <button className="w-full flex items-center justify-center gap-1.5 text-xs text-white/40 hover:text-[#FF6B47] transition-colors py-1.5 rounded-md hover:bg-[#FF6B47]/[0.06]">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 1V10M1 5.5H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Add task
        </button>
      </div>
    </div>
  )
}
