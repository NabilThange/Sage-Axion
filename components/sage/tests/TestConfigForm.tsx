"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface TestConfigFormProps {
  mode: "student" | "mentor"
  onSubmit: (config: any) => void
  onBack: () => void
}

const subjects = ["IOT", "DS", "OS", "DBMS", "CN", "Physics", "Chemistry", "Maths"]

export function TestConfigForm({ mode, onSubmit, onBack }: TestConfigFormProps) {
  const [subject, setSubject] = useState("")
  const [questionCount, setQuestionCount] = useState(10)
  const [timeLimit, setTimeLimit] = useState(15)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      mode,
      subject,
      questionCount,
      timeLimit,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[#0D0D0F]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full"
      >
        <div className="bg-[#161618] border border-[#2a2a2c] rounded-[40px] p-10 shadow-3xl">
          <div className="mb-10 flex flex-col items-center">
            <h2 className="text-3xl font-black text-white mb-2">Configure Test</h2>
            <p className="text-[#6b7280] font-medium text-[15px]">
              {mode === "student" ? "Customize your learning session" : "Sage will optimize for your growth"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-white/80">Select Topic / Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full px-5 py-4 bg-[#1a1a1c] border border-[#2a2a2c] rounded-2xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#7c3aed] transition-all"
              >
                <option value="">Select a subject</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-semibold text-white/80">Question Count</label>
                <span className="text-sm font-black text-[#7c3aed] bg-[#7c3aed]/10 px-3 py-1 rounded-full">{questionCount}</span>
              </div>
              <div className="relative pt-2">
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="5"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full h-2 bg-[#2a2a2c] rounded-full appearance-none cursor-pointer accent-[#7c3aed]"
                />
                <div className="flex justify-between text-[11px] text-[#4b5563] mt-3 font-bold px-1">
                  <span>5 ISSUES</span>
                  <span>30 ISSUES</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-semibold text-white/80">Time Allocation</label>
                <span className="text-sm font-black text-[#7c3aed] bg-[#7c3aed]/10 px-3 py-1 rounded-full">{timeLimit} min</span>
              </div>
              <div className="relative pt-2">
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  className="w-full h-2 bg-[#2a2a2c] rounded-full appearance-none cursor-pointer accent-[#7c3aed]"
                />
                <div className="flex justify-between text-[11px] text-[#4b5563] mt-3 font-bold px-1">
                  <span>5 MIN</span>
                  <span>60 MIN</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-4 text-white hover:bg-white/5 font-bold rounded-2xl transition-all"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-4 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-black rounded-2xl shadow-xl shadow-purple-900/10 transition-all"
              >
                Begin Test →
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
