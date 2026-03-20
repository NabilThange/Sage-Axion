"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TestInterfaceProps {
  config: any
  onComplete: (results: any) => void
}

const mockQuestions = [
  {
    id: 1,
    question: "What is the primary function of an operating system?",
    options: [
      "Manage hardware resources and provide common services for computer programs.",
      "Create high-quality documents and spreadsheets for office use.",
      "Browse the internet securely and provide access to web applications.",
      "Execute high-performance games with advanced graphics rendering."
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "Which data structure follows the Last-In, First-Out (LIFO) principle?",
    options: [
      "Queue — elements are added at the back and removed from the front.",
      "Stack — elements are added and removed from the same end.",
      "Array — elements are stored in contiguous memory locations.",
      "Binary Tree — elements are organized in a hierarchical structure."
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What does the acronym IOT stand for in the context of modern technology?",
    options: [
      "Internet of Things — a network of physical objects embedded with sensors.",
      "Input Output Technology — the interface between a computer and its peripherals.",
      "Integrated Online Tools — a suite of cloud-based productivity applications.",
      "Internal Operating Terminal — a specialized console for system maintenance."
    ],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: "Which of the following is a primary benefit of using a Relational Database?",
    options: [
      "Ability to store data in a hierarchical file structure.",
      "Efficient handling of unstructured data like images and videos.",
      "Maintaining data integrity through predefined schemas and relationships.",
      "Lower latency for real-time streaming data processing."
    ],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "In computer networking, what is the purpose of the DNS (Domain Name System)?",
    options: [
      "To encrypt data transmitted over the internet using SSL/TLS.",
      "To translate human-readable domain names into IP addresses.",
      "To manage the flow of data packets between different networks.",
      "To assign unique MAC addresses to network interface cards."
    ],
    correctAnswer: 1,
  },
]

export function TestInterface({ config, onComplete }: TestInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(config.timeLimit * 60)
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }))
  }

  const handleSubmit = () => {
    const score = mockQuestions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctAnswer ? 1 : 0)
    }, 0)

    onComplete({
      score,
      total: mockQuestions.length,
      percentage: Math.round((score / mockQuestions.length) * 100),
      answers,
      questions: mockQuestions,
      timeTaken: config.timeLimit * 60 - timeLeft,
    })
  }

  const answeredCount = Object.keys(answers).length
  const progressPercent = (answeredCount / mockQuestions.length) * 100
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isUrgent = timeLeft <= 60

  // Circular progress ring constants
  const R = 70
  const circ = 2 * Math.PI * R
  const dash = circ * (1 - answeredCount / mockQuestions.length)

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      {/* ── TOP BAR ── */}
      <div className="w-full px-8 pt-6 pb-4 flex flex-col gap-2 relative z-10">
        <div className="flex items-center justify-between mb-1">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#6b7280] uppercase tracking-wider font-semibold">
              Question {currentQuestion + 1} of {mockQuestions.length}
            </span>
          </div>
          <div className="text-[12px] text-[#6b7280] font-medium transition-all">
            {answeredCount} answered
          </div>
          <div className={`px-5 py-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center gap-3 transition-all ${isUrgent ? "border-red/40 animate-pulse" : ""}`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={isUrgent ? "text-red" : "text-[#6b7280]"}>
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M7 3.5V7L9.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className={`text-xl font-bold font-mono tracking-tight transition-colors ${isUrgent ? "text-red" : "text-white"}`}>
              {String(minutes).padStart(2, "0")} : {String(seconds).padStart(2, "0")}
            </span>
          </div>
        </div>
        <div className="h-1.5 w-full bg-[#1c1c1c] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%` }}
            className="h-full bg-[#7c3aed] transition-all duration-500 ease-out"
          />
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex items-center justify-center px-8 py-4">
        <motion.div
           layout
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-full max-w-[1000px] bg-[#1a1a1a] border border-[#2a2a2a] rounded-[24px] overflow-hidden flex min-h-[500px] shadow-2xl"
        >
          {/* Left: Question + Options (~70%) */}
          <div className="flex-[7] p-10 border-r border-[#242424]">
            <motion.div
               key={currentQuestion}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.3 }}
            >
              <p className="text-[11px] text-[#7c3aed] font-bold uppercase tracking-[0.2em] mb-3">Topic / Domain</p>
              <h2 className="text-2xl font-bold text-white leading-tight mb-10">
                {mockQuestions[currentQuestion].question}
              </h2>

              <div className="space-y-3">
                {mockQuestions[currentQuestion].options.map((option, idx) => {
                  const isSelected = answers[mockQuestions[currentQuestion].id] === idx
                  const charOffset = 65 // 'A'
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.005, backgroundColor: "rgba(255,255,255,0.03)" }}
                      whileTap={{ scale: 0.995 }}
                      onClick={() => handleAnswer(mockQuestions[currentQuestion].id, idx)}
                      className={`w-full text-left p-5 rounded-xl border transition-all duration-200 flex items-center gap-4 group
                        ${isSelected
                          ? "bg-[#7c3aed]/10 border-[#7c3aed] shadow-[0_0_20px_rgba(124,58,237,0.1)]"
                          : "bg-[#242424] border-[#333] hover:border-[#444]"
                        }
                      `}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all
                        ${isSelected ? "bg-[#7c3aed] text-white" : "bg-[#1a1a1a] text-[#6b7280] group-hover:text-white"}
                      `}>
                        {String.fromCharCode(charOffset + idx)}
                      </div>
                      <span className={`text-[15px] transition-colors ${isSelected ? "text-white" : "text-[#d1d5db] group-hover:text-white"}`}>
                        {option}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Right: Circular Progress (~30%) */}
          <div className="flex-[3] bg-[#161616] p-10 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7c3aed]/5 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#7c3aed]/5 rounded-full blur-3xl -ml-16 -mb-16" />

            <div className="relative w-[180px] h-[180px] flex items-center justify-center">
              <svg width="180" height="180" className="-rotate-90">
                <circle
                  cx="90" cy="90" r={R}
                  stroke="#242424"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="90" cy="90" r={R}
                  stroke="#7c3aed"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  initial={{ strokeDashoffset: circ }}
                  animate={{ strokeDashoffset: dash }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-white">{answeredCount}/{mockQuestions.length}</span>
                <span className="text-[10px] text-[#6b7280] uppercase tracking-widest mt-1">Answered</span>
              </div>
            </div>
            <p className="mt-8 text-[12px] text-[#6b7280] text-center max-w-[160px] leading-relaxed">
              Keep going! You're making great progress in this section.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="w-full bg-[#111111] border-t border-[#1e1e1e] px-8 py-5 flex flex-col items-center gap-6 pb-8">
        {/* Question Dot Navigation */}
        <div className="flex items-center justify-center gap-2.5">
          {mockQuestions.map((q, idx) => {
            const isCurrent = currentQuestion === idx
            const isAnswered = answers[q.id] !== undefined
            return (
              <motion.button
                key={q.id}
                whileHover={{ scale: 1.1 }}
                onClick={() => setCurrentQuestion(idx)}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold transition-all relative
                  ${isCurrent
                    ? "bg-[#7c3aed] text-white scale-110 shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                    : isAnswered
                    ? "bg-white text-[#0f0f0f]"
                    : "bg-[#242424] text-[#6b7280] hover:text-white"
                  }
                `}
              >
                {idx + 1}
                {isAnswered && !isCurrent && (
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#22c55e] border-2 border-[#111111] rounded-full" />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-[1000px] flex items-center justify-between">
          <button
            onClick={() => setCurrentQuestion((p) => Math.max(0, p - 1))}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#6b7280] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            ← Previous
          </button>

          {currentQuestion === mockQuestions.length - 1 ? (
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-10 py-3.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold rounded-full shadow-lg shadow-green-900/20 transition-all flex items-center gap-2"
            >
              Submit Test
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.333 7h9.334M8.167 3.5l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion((p) => Math.min(mockQuestions.length - 1, p + 1))}
              className="px-10 py-3.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold rounded-full shadow-lg shadow-purple-900/20 transition-all flex items-center gap-2"
            >
              Next →
            </button>
          )}
        </div>
      </div>

      {/* ── SUBMIT MODAL ── */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-[420px] bg-[#1a1a1a] border border-[#2a2a2a] rounded-[28px] p-8 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-[#22c55e]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M26 8L12 22L6 16" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Submit Test?</h2>
              <p className="text-[#9ca3af] text-sm leading-relaxed mb-8">
                You've answered <span className="text-white font-bold">{answeredCount}/{mockQuestions.length}</span> questions.
                {mockQuestions.length - answeredCount > 0 && (
                  <> There are <span className="text-red font-bold">{mockQuestions.length - answeredCount}</span> questions left unanswered.</>
                )}
                Are you sure you want to finalize your results?
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold rounded-2xl transition-all"
                >
                  Yes, Submit
                </button>
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="w-full py-4 bg-transparent text-[#6b7280] hover:text-white font-semibold rounded-2xl transition-all"
                >
                  Wait, Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
