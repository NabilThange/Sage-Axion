"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  role: "user" | "assistant"
  content: MessageContent[]
  timestamp: Date
}

// Rich content types
type MessageContent =
  | { type: "text";  value: string }
  | { type: "bold";  value: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "list";  items: string[] }
  | { type: "note";  value: string }

interface MentorChatPanelProps {
  subject: string
  sourceCount?: number
}

// Parse **bold** and citation numbers out of a plain string
function parseInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[\d+\])/g)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
    }
    if (/^\[\d+\]$/.test(part)) {
      return (
        <sup key={i} className="text-[9px] text-[#3b82f6] ml-0.5 cursor-pointer hover:underline">
          {part.slice(1, -1)}
        </sup>
      )
    }
    return part
  })
}

function RenderContent({ blocks }: { blocks: MessageContent[] }) {
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        if (block.type === "text") {
          return <p key={i} className="text-[13px] text-[#d1d5db] leading-relaxed">{parseInline(block.value)}</p>
        }
        if (block.type === "bold") {
          return <p key={i} className="text-[13px] text-white font-medium">{block.value}</p>
        }
        if (block.type === "note") {
          return (
            <p key={i} className="text-[12px] text-[#9ca3af] italic border-l-2 border-[#3b82f6]/40 pl-3">
              {parseInline(block.value)}
            </p>
          )
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="space-y-1.5 ml-1">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-[13px] text-[#d1d5db]">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#6b7280] flex-shrink-0" />
                  {parseInline(item)}
                </li>
              ))}
            </ul>
          )
        }
        if (block.type === "table") {
          return (
            <div key={i} className="rounded-lg overflow-hidden border border-[#2a2a2a] text-[12px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2a2a2a]">
                    {block.headers.map((h, j) => (
                      <th key={j} className="px-3 py-2 text-left text-[#9ca3af] font-medium bg-[#1c1c1c]">
                        {h}
                        {j > 0 && <sup className="text-[#3b82f6] ml-0.5 text-[9px]">{j}</sup>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, j) => (
                    <tr key={j} className="border-b border-[#1f1f1f] last:border-0 hover:bg-white/[0.02]">
                      {row.map((cell, k) => (
                        <td key={k} className={`px-3 py-2 ${k === 0 ? "text-[#9ca3af]" : "text-[#d1d5db]"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

function MessageActions({ onSave }: { onSave: () => void }) {
  const [liked, setLiked] = useState<boolean | null>(null)
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex items-center gap-3 mt-3 pt-2">
      <button onClick={onSave} className="flex items-center gap-1 text-[11px] text-[#6b7280] hover:text-white transition-colors">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M5.5 1v7M2 5l3.5 3.5L9 5M1.5 10h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Save to note
      </button>
      <button onClick={() => setCopied(true)} className="text-[#6b7280] hover:text-white transition-colors">
        {copied ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#22c55e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.1"/>
            <path d="M1.5 8.5V1.5H8.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
      <button onClick={() => setLiked(true)} className={`transition-colors ${liked === true ? "text-[#22c55e]" : "text-[#6b7280] hover:text-white"}`}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1.5 6.5h2V11H1.5V6.5ZM3.5 6.5L5.5 1c.5 0 1.5.5 1.5 1.5V5h3.5c.5 0 1 .5.5 1.5L9.5 10c-.2.5-.6 1-1 1H3.5V6.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
        </svg>
      </button>
      <button onClick={() => setLiked(false)} className={`transition-colors ${liked === false ? "text-[#ef4444]" : "text-[#6b7280] hover:text-white"}`}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M10.5 5.5h-2V1H10.5V5.5ZM8.5 5.5 6.5 11c-.5 0-1.5-.5-1.5-1.5V7H1.5c-.5 0-1-.5-.5-1.5L2.5 2c.2-.5.6-1 1-1H8.5V5.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

function TimestampDivider({ date }: { date: Date }) {
  const label = date.toLocaleString("en-US", {
    weekday: undefined, month: "short", day: "numeric",
    hour: "numeric", minute: "2-digit",
  })
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-[#222]" />
      <span className="text-[10px] text-[#6b7280]">Today • {label}</span>
      <div className="flex-1 h-px bg-[#222]" />
    </div>
  )
}

// Initial mock messages with rich content
function makeInitialMessages(subject: string): Message[] {
  return [
    {
      id: "1",
      role: "assistant",
      timestamp: new Date(),
      content: [
        { type: "text", value: `Ready to dive into **${subject}**? I have 3 sources loaded. Here's a quick comparison of the two main architectural approaches from your sources:` },
        {
          type: "table",
          headers: ["Step Sequence", "Oracle (Enterprise)", "IBM (Cloud)"],
          rows: [
            ["1. Initiation",   "Gather",            "Gather"],
            ["2. Processing",   "Enrich",            "Consolidate"],
            ["3. Connectivity", "Stream",            "Connect"],
            ["4. Handling",     "Manage",            "Collect"],
            ["5. Aggregation",  "Acquire",           "Assemble"],
            ["6. Conclusion",   "Organize & Analyze","Manage & Analyze"],
          ],
        },
        { type: "note", value: "Note: Both frameworks begin with **Gathering** data and conclude with **Managing and Analyzing** it [4]." },
      ],
    },
  ]
}

export function MentorChatPanel({ subject, sourceCount = 3 }: MentorChatPanelProps) {
  const [messages, setMessages]   = useState<Message[]>(() => makeInitialMessages(subject))
  const [input, setInput]         = useState("")
  const [isTyping, setIsTyping]   = useState(false)
  const messagesEndRef             = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      timestamp: new Date(),
      content: [{ type: "text", value: input.trim() }],
    }
    setMessages((p) => [...p, userMsg])
    setInput("")
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        timestamp: new Date(),
        content: [
          { type: "text", value: `Great question about **${subject}**! Let me break this down from your sources:` },
          { type: "list", items: [
            "Key concept one — foundational understanding [1]",
            "Key concept two — applied in real-world systems [2]",
            "Key concept three — covered in Module 1 notes [3]",
          ]},
          { type: "note", value: "This is a mock response. Actual AI integration will pull from your loaded sources." },
        ],
      }
      setMessages((p) => [...p, aiMsg])
    }, 1200)
  }

  return (
    <div className="flex flex-col h-full bg-[#111111]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e] flex-shrink-0">
        <span className="text-sm font-semibold text-white">Chat</span>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 flex items-center justify-center text-[#6b7280] hover:text-white hover:bg-white/[0.06] rounded transition-all">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 3.5h5M1 6.5h9M1 9.5h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="w-7 h-7 flex items-center justify-center text-[#6b7280] hover:text-white hover:bg-white/[0.06] rounded transition-all">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="3" r="0.8" fill="currentColor"/>
              <circle cx="6.5" cy="6.5" r="0.8" fill="currentColor"/>
              <circle cx="6.5" cy="10" r="0.8" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-1">
        <TimestampDivider date={messages[0]?.timestamp ?? new Date()} />

        {messages.map((msg, idx) => (
          <AnimatePresence key={msg.id}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={msg.role === "user" ? "flex justify-end mb-4" : "mb-6"}
            >
              {msg.role === "user" ? (
                <div className="max-w-[75%] px-4 py-2.5 bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl rounded-tr-sm">
                  <RenderContent blocks={msg.content} />
                </div>
              ) : (
                <div>
                  <RenderContent blocks={msg.content} />
                  <MessageActions onSave={() => {}} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5 py-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#6b7280]"
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-5 pb-3 pt-2 border-t border-[#1e1e1e] flex-shrink-0">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl focus-within:border-[#3a3a3a] transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSend() }}
            placeholder="Start typing..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-[#6b7280] focus:outline-none"
          />
          <span className="text-[11px] text-[#6b7280] flex-shrink-0">{sourceCount} sources</span>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[#3b82f6] disabled:bg-[#1f1f1f] disabled:text-[#444] text-white transition-all hover:bg-[#2563eb] flex-shrink-0"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 10V2M2.5 5.5L6 2L9.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <p className="text-center text-[10px] text-[#4b5563] mt-1.5">
          AI can make mistakes, double check responses
        </p>
      </div>
    </div>
  )
}
