"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatPanelProps {
  userId: string
  userName?: string
}

const QUICK_ACTIONS = [
  { label: "Learn", icon: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1L11 3.5V8.5L6 11L1 8.5V3.5L6 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  )},
  { label: "Code", icon: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M4 4L1.5 6L4 8M8 4L10.5 6L8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { label: "Create", icon: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M8.5 1.5L10.5 3.5L4 10H2V8L8.5 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { label: "Write", icon: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 9H10M2 3H7M2 6H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )},
  { label: "Life stuff", icon: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M6 4V6.5L7.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )},
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return "Morning"
  if (h < 17) return "Afternoon"
  return "Evening"
}

export function ChatPanel({ userId, userName = "Nabil" }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const hasMessages = messages.length > 0

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm here to help you plan your study sessions. This is a mock response — the AI integration is coming soon!",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 1200)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickAction = (label: string) => {
    setInput(label + ": ")
    inputRef.current?.focus()
  }

  return (
    <div className="flex flex-col h-full">
      <AnimatePresence mode="wait">
        {!hasMessages ? (
          /* ═══ Empty / Welcome State ═══ */
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center px-6"
          >
            {/* PLANNER heading + badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center gap-2 mb-10"
            >
              <h1 className="text-[11px] font-semibold tracking-[0.25em] text-white/30 uppercase">
                Planner
              </h1>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.07]">
                <span className="text-[11px] text-white/35">Free plan</span>
                <span className="text-white/20">·</span>
                <button className="text-[11px] text-[#FF6B47]/70 hover:text-[#FF6B47] transition-colors">
                  Upgrade
                </button>
              </div>
            </motion.div>

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="flex items-center gap-3 mb-10"
            >
              {/* Asterisk/snowflake icon */}
              <motion.svg
                width="32" height="32" viewBox="0 0 32 32" fill="none"
                animate={{ rotate: [0, 30, -30, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M16 2V30M2 16H30M5.37 5.37L26.63 26.63M26.63 5.37L5.37 26.63" stroke="#FF6B47" strokeWidth="2.5" strokeLinecap="round"/>
              </motion.svg>
              <span className="text-[28px] font-light text-white tracking-tight">
                {getGreeting()}, {userName}
              </span>
            </motion.div>

            {/* Input Box */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-full max-w-[560px] mb-4"
            >
              <div className="planner-input-box relative bg-[#242424] border border-white/[0.08] rounded-2xl overflow-hidden focus-within:border-white/[0.18] transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="How can I help you today?"
                  rows={3}
                  className="w-full bg-transparent px-4 pt-4 pb-12 text-sm text-white placeholder:text-white/25 resize-none focus:outline-none leading-relaxed"
                />

                {/* Toolbar row */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 pb-2.5">
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.07] transition-all">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {/* Model selector */}
                    <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/[0.07] text-[11px] transition-all">
                      Sonnet 4.6
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M2 3L4 5L6 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    {/* Voice / mic */}
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.07] transition-all">
                      <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                        <rect x="3.5" y="0.5" width="5" height="7" rx="2.5" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M1 7C1 9.76 3.24 12 6 12C8.76 12 11 9.76 11 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        <path d="M6 12V13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </button>

                    {/* Send */}
                    <button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#FF6B47] disabled:bg-white/10 disabled:text-white/20 text-white transition-all hover:bg-[#e85a36] disabled:cursor-not-allowed"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 10V2M2.5 5.5L6 2L9.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick action pills */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center gap-2 flex-wrap justify-center"
            >
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action.label)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] text-white/45 hover:text-white/75 hover:border-white/[0.18] hover:bg-white/[0.06] text-xs transition-all"
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          /* ═══ Active conversation ═══ */
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 overflow-y-auto px-6 py-6 space-y-4"
          >
            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-[#FF6B47]/20 border border-[#FF6B47]/30 flex items-center justify-center mr-2.5 mt-0.5 flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 1V9M1 5H9M2.17 2.17L7.83 7.83M7.83 2.17L2.17 7.83" stroke="#FF6B47" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#FF6B47]/10 border border-[#FF6B47]/15 text-white/85"
                      : "bg-white/[0.05] border border-white/[0.07] text-white/75"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-[#FF6B47]/20 border border-[#FF6B47]/30 flex items-center justify-center mr-0.5 flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1V9M1 5H9M2.17 2.17L7.83 7.83M7.83 2.17L2.17 7.83" stroke="#FF6B47" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex gap-1 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.07]">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-white/40"
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input — shown in chat mode below messages */}
      {hasMessages && (
        <div className="px-6 pb-6 pt-2">
          <div className="planner-input-box relative bg-[#242424] border border-white/[0.08] rounded-2xl overflow-hidden focus-within:border-white/[0.18] transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              rows={2}
              className="w-full bg-transparent px-4 pt-3 pb-10 text-sm text-white placeholder:text-white/25 resize-none focus:outline-none leading-relaxed"
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 pb-2">
              <button className="w-6 h-6 flex items-center justify-center rounded-lg text-white/25 hover:text-white/60 hover:bg-white/[0.07] transition-all">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
              <div className="flex items-center gap-1.5">
                <button className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-white/35 hover:text-white/65 hover:bg-white/[0.07] text-[11px] transition-all">
                  Sonnet 4.6
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M2 3L4 5L6 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-6 h-6 flex items-center justify-center rounded-lg bg-[#FF6B47] disabled:bg-white/10 disabled:text-white/20 text-white transition-all hover:bg-[#e85a36] disabled:cursor-not-allowed"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 9V1M1.5 4.5L5 1L8.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
