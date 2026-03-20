"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Mode = "pomodoro" | "short" | "long"

const MODES: { key: Mode; label: string; seconds: number }[] = [
  { key: "pomodoro", label: "Pomodoro",    seconds: 25 * 60 },
  { key: "short",    label: "Short Break", seconds: 5 * 60 },
  { key: "long",     label: "Long Break",  seconds: 15 * 60 },
]

function fmt(secs: number) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export function PomodoroWidget() {
  const [mode, setMode] = useState<Mode>("pomodoro")
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const total = MODES.find((m) => m.key === mode)!.seconds
  const progress = 1 - timeLeft / total

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) { setRunning(false); return 0 }
          return t - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  const switchMode = (m: Mode) => {
    setRunning(false)
    setMode(m)
    setTimeLeft(MODES.find((x) => x.key === m)!.seconds)
  }

  const reset = () => {
    setRunning(false)
    setTimeLeft(total)
  }

  // Circular progress ring
  const R = 54
  const circ = 2 * Math.PI * R
  const dash = circ * (1 - progress)

  return (
    <div
      className="rounded-xl overflow-hidden border border-[#3a2a4a]"
      style={{ background: "linear-gradient(145deg, #4c1d95 0%, #7c3aed 40%, #db2777 75%, #f97316 100%)" }}
    >
      {/* Mode tabs */}
      <div className="flex items-center gap-1 p-3 pb-0">
        {MODES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
              mode === key
                ? "bg-white text-[#1a1a1a]"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Timer display */}
      <div className="flex flex-col items-center py-5 gap-1">
        {/* SVG ring */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg width="112" height="112" className="-rotate-90 absolute inset-0">
            <circle
              cx="56" cy="56" r={R}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="4"
              fill="none"
            />
            <motion.circle
              cx="56" cy="56" r={R}
              stroke="white"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={dash}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <AnimatePresence mode="wait">
            <motion.span
              key={timeLeft}
              initial={{ opacity: 0.6, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[28px] font-bold text-white tabular-nums z-10"
              style={{ fontFamily: "monospace" }}
            >
              {fmt(timeLeft)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 pb-4">
        {/* Reset */}
        <button
          onClick={reset}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
          title="Reset"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1.5 7A5.5 5.5 0 1 0 7 1.5M1.5 1.5V5.5H5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Start / Pause */}
        <button
          onClick={() => setRunning((r) => !r)}
          className="px-6 py-2 rounded-full bg-white text-[#1a1a1a] text-sm font-semibold hover:bg-white/90 transition-all"
        >
          {running ? "Pause" : "Start"}
        </button>

        {/* Settings */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
          title="Settings"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.93 2.93l1.06 1.06M10.01 10.01l1.06 1.06M2.93 11.07l1.06-1.06M10.01 3.99l1.06-1.06" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
