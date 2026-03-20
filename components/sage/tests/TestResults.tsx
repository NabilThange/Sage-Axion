"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface TestResultsProps {
  results: any
  onRetake: () => void
  onNewTest: () => void
}

export function TestResults({ results, onRetake, onNewTest }: TestResultsProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)

  const getScoreColor = (pct: number) => {
    if (pct >= 80) return "#22c55e" // Green
    if (pct >= 60) return "#eab308" // Amber
    return "#ef4444" // Red
  }

  const scoreColor = getScoreColor(results.percentage)

  // Circular progress ring constants
  const R = 85
  const circ = 2 * Math.PI * R
  const dash = circ * (1 - results.percentage / 100)

  return (
    <div className="min-h-screen bg-[#0f0f0f] py-16 px-8 flex justify-center">
      <div className="w-full max-w-[850px] space-y-10">

        {/* ── SCORE HEADER ── */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[40px] p-12 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Decorative background glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#7c3aed]/5 rounded-full blur-3xl -mt-48 pointer-events-none" />

          {/* Large Ring */}
          <div className="relative w-[220px] h-[220px] mx-auto mb-10 flex items-center justify-center">
            <svg width="220" height="220" className="-rotate-90">
              <circle cx="110" cy="110" r={R} stroke="#242424" strokeWidth="12" fill="none" />
              <motion.circle
                cx="110" cy="110" r={R}
                stroke={scoreColor}
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circ}
                initial={{ strokeDashoffset: circ }}
                animate={{ strokeDashoffset: dash }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-6xl font-black text-white">{results.score}/{results.total}</span>
              <span className="text-[12px] text-[#6b7280] uppercase tracking-widest mt-1">Score</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <h2 className="text-3xl font-bold text-white mb-2">
              {results.percentage >= 80 ? "Well done!" : results.percentage >= 60 ? "Keep practicing!" : "Don't give up!"}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="px-4 py-1 rounded-full bg-white/10 text-white font-black text-2xl">
                {results.percentage}%
              </span>
            </div>
          </motion.div>

          {/* AI Insight Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-10 max-w-lg mx-auto p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08]"
          >
            <p className="text-[13px] text-[#9ca3af] leading-relaxed">
              <span className="text-[#a78bfa] font-bold">Sage Analysis:</span> You're showing strong understanding of core concepts. Focus on practicing more complex problems to solidify your knowledge.
            </p>
          </motion.div>
        </motion.div>

        {/* ── QUESTION REVIEW ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-4 mb-2">
            <h3 className="text-xl font-bold text-white tracking-tight">Question Review</h3>
            <span className="text-xs text-[#6b7280]">Click to expand</span>
          </div>

          {results.questions.map((q: any, i: number) => {
            const userAnswer = results.answers[q.id]
            const isCorrect = userAnswer === q.correctAnswer
            const isExpanded = expandedQuestion === i

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className={`bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl overflow-hidden transition-all duration-300
                  ${isExpanded ? "ring-2 ring-white/10" : "hover:border-[#3a3a3a]"}
                `}
              >
                <button
                   onClick={() => setExpandedQuestion(isExpanded ? null : i)}
                   className="w-full flex items-center gap-5 p-5 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm
                    ${isCorrect ? "bg-[#22c55e]/15 text-[#22c55e]" : "bg-[#ef4444]/15 text-[#ef4444]"}
                  `}>
                    {isCorrect ? "✓" : "✗"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium text-white truncate leading-snug">
                       Question {i + 1}: {q.question}
                    </p>
                  </div>
                  <div className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: "auto", opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       className="px-5 pb-6 border-t border-[#222]"
                    >
                      <div className="mt-5 space-y-2">
                        {q.options.map((opt: string, idx: number) => {
                          const isCorrectOpt = idx === q.correctAnswer
                          const isSelectedOpt = idx === userAnswer
                          return (
                            <div
                               key={idx}
                               className={`p-4 rounded-xl border text-[13px] flex items-center justify-between
                                 ${isCorrectOpt ? "bg-[#166534]/15 border-[#166534] text-white" :
                                   isSelectedOpt ? "bg-[#991b1b]/15 border-[#991b1b] text-white" :
                                   "bg-[#111111] border-[#222] text-[#9ca3af]"}
                               `}
                            >
                               <div className="flex items-center gap-3">
                                 <span className="font-bold opacity-50">{String.fromCharCode(65 + idx)}.</span>
                                 {opt}
                               </div>
                               {isCorrectOpt && <span className="text-[10px] bg-[#166534] px-2 py-0.5 rounded text-white font-bold uppercase tracking-widest">Correct</span>}
                               {isSelectedOpt && !isCorrectOpt && <span className="text-[10px] bg-[#991b1b] px-2 py-0.5 rounded text-white font-bold uppercase tracking-widest">Your Answer</span>}
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* ── FOOTER ACTIONS ── */}
        <div className="flex items-center justify-center gap-4 pt-6 pb-20">
          <button
             onClick={onRetake}
             className="px-10 py-4 rounded-full border border-[#3a3a3a] text-white font-bold hover:bg-white/[0.05] transition-all"
          >
            Retake Test
          </button>
          <button
             onClick={onNewTest}
             className="px-10 py-4 rounded-full bg-[#7c3aed] text-white font-bold hover:bg-[#6d28d9] shadow-lg shadow-purple-900/20 transition-all"
          >
            New Test
          </button>
          <Link href="/profile" className="px-10 py-4 rounded-full bg-white text-[#0f0f0f] font-bold hover:bg-white/90 transition-all shadow-lg shadow-white/5">
             View Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
