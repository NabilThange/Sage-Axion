"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ExamCountdownWidgetProps {
  examDate: string   // ISO string, e.g. "2026-04-15"
  examName: string
}

interface TimeLeft {
  days: number
  hours: number
  mins: number
  secs: number
}

function calcTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const secs = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, mins, secs }
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white tabular-nums leading-none"
        style={{ fontFamily: "monospace" }}
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="text-[9px] text-[#6b7280] uppercase tracking-widest mt-1">{label}</span>
    </div>
  )
}

export function ExamCountdownWidget({ examDate, examName }: ExamCountdownWidgetProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft(examDate))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(examDate)), 1000)
    return () => clearInterval(id)
  }, [examDate])

  const isOver = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.mins === 0 && timeLeft.secs === 0

  return (
    <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl p-4">
      <p className="text-[10px] font-semibold tracking-[0.15em] text-[#6b7280] uppercase mb-4">
        Exam Countdown
      </p>

      {isOver ? (
        <p className="text-center text-sm text-[#6b7280] py-2">Exam date has passed</p>
      ) : (
        <div className="flex items-center justify-center gap-4">
          <Digit value={timeLeft.days}  label="Days" />
          <span className="text-2xl text-[#3a3a3a] font-light mb-4">:</span>
          <Digit value={timeLeft.hours} label="Hrs" />
          <span className="text-2xl text-[#3a3a3a] font-light mb-4">:</span>
          <Digit value={timeLeft.mins}  label="Min" />
          <span className="text-2xl text-[#3a3a3a] font-light mb-4">:</span>
          <Digit value={timeLeft.secs}  label="Sec" />
        </div>
      )}

      <p className="text-center text-[11px] text-[#6b7280] mt-3">{examName}</p>
    </div>
  )
}
