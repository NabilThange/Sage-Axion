"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface StudioPanelProps {
  subject: string
}

const GENERATE_TILES = [
  { id: "audio",     label: "Audio Overview", icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1 5.5h2l2-3 3 9 2-5 1 2h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { id: "slides",    label: "Slide Deck", icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M5 14h6M8 12v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )},
  { id: "video",     label: "Video Overview", icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="3" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M11 6l4-2v8l-4-2V6Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  )},
  { id: "mindmap",   label: "Mind Map", icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M8 6V2M8 10v4M6 8H2M10 8h4M4.5 4.5l2 2M9.5 9.5l2 2M4.5 11.5l2-2M9.5 6.5l2-2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  )},
  { id: "reports",   label: "Reports", icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="1" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )},
  { id: "flash",     label: "Flashcards", icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="3" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="4" y="5.5" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="#111111"/>
    </svg>
  )},
  { id: "quiz",      label: "Quiz", icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M6 6.5a2 2 0 1 1 2 2v1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="8" cy="11.5" r="0.8" fill="currentColor"/>
    </svg>
  )},
  { id: "infographic", label: "Infographic", icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 12L6 7l3 3 3-5 2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="2" y="13" width="12" height="1.5" rx="0.75" fill="currentColor" opacity="0.3"/>
    </svg>
  )},
]

interface GeneratedNotebook {
  id: string
  type: "audio" | "book" | "doc"
  title: string
  meta: string
}

const MOCK_NOTEBOOKS: GeneratedNotebook[] = [
  { id: "1", type: "audio", title: "Building the Planet's...", meta: "Deep Dive · 3 sources · 54d ago" },
  { id: "2", type: "book",  title: "Internet of Things (IoT) Study...", meta: "Study Guide · 3 sources · 54d ago" },
  { id: "3", type: "doc",   title: "IoT Essentials: Connected World...", meta: "3 sources · 23d ago" },
]

function NotebookIcon({ type }: { type: GeneratedNotebook["type"] }) {
  if (type === "audio") return (
    <div className="w-8 h-8 rounded-lg bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1 5H3L5 2L8 10L10 6L11 8H13" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
  if (type === "book") return (
    <div className="w-8 h-8 rounded-lg bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 1.5h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1ZM10 1.5l2 1v10l-2 1" stroke="#9ca3af" strokeWidth="1.1" strokeLinejoin="round"/>
      </svg>
    </div>
  )
  return (
    <div className="w-8 h-8 rounded-lg bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1.5" y="1" width="11" height="12" rx="1.5" stroke="#9ca3af" strokeWidth="1.1"/>
        <path d="M4 4.5h6M4 7h6M4 9.5h4" stroke="#9ca3af" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

export function StudioPanel({ subject }: StudioPanelProps) {
  const [generating, setGenerating] = useState<string | null>(null)

  const handleGenerate = (id: string) => {
    setGenerating(id)
    setTimeout(() => setGenerating(null), 2000)
  }

  return (
    <div className="h-full flex flex-col bg-[#161616] border-l border-[#222]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#222]">
        <span className="text-sm font-semibold text-white">Studio</span>
        <button className="w-6 h-6 flex items-center justify-center text-[#6b7280] hover:text-white transition-colors rounded hover:bg-white/[0.06]" title="Collapse panel">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2H12V12H9M9 2V12M9 2L5 2M9 12L5 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Generate section label */}
        <div className="px-4 pt-4 pb-2">
          <p className="text-[10px] font-semibold tracking-[0.13em] text-[#6b7280] uppercase">Generate</p>
        </div>

        {/* 2-col tile grid */}
        <div className="px-3 grid grid-cols-2 gap-2 pb-2">
          {GENERATE_TILES.map((tile, i) => {
            const isLoading = generating === tile.id
            const isFullWidth = i === GENERATE_TILES.length - 1 && GENERATE_TILES.length % 2 !== 0
            return (
              <motion.button
                key={tile.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGenerate(tile.id)}
                className={`flex items-center justify-between gap-2 px-3 py-3 bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl
                  hover:border-[#3a3a3a] hover:bg-[#202020] transition-all cursor-pointer text-left
                  ${isFullWidth ? "col-span-2" : ""}
                  ${isLoading ? "border-[#3b82f6]/40 bg-[#1a2030]" : ""}
                `}
              >
                <div>
                  <div className={`mb-1.5 ${isLoading ? "text-[#3b82f6]" : "text-[#9ca3af]"}`}>
                    {tile.icon}
                  </div>
                  <span className="text-[11px] text-[#d1d5db] font-medium">{tile.label}</span>
                </div>
                {isLoading ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="animate-spin text-[#3b82f6] flex-shrink-0">
                    <path d="M6 1v2M6 9v2M1 6h2M9 6h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#4b5563] flex-shrink-0">
                    <path d="M5 3l4 3-4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Generated notebooks section */}
        <div className="px-4 pt-3 pb-2">
          <p className="text-[10px] font-semibold tracking-[0.13em] text-[#6b7280] uppercase">Generated Notebooks</p>
        </div>

        <div className="px-3 space-y-1 pb-3">
          {MOCK_NOTEBOOKS.map((nb, i) => (
            <motion.div
              key={nb.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-white/[0.04] transition-all group cursor-pointer"
            >
              <NotebookIcon type={nb.type} />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-[#d1d5db] truncate font-medium">{nb.title}</p>
                <p className="text-[10px] text-[#6b7280]">{nb.meta}</p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {nb.type === "audio" && (
                  <button className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all">
                    <svg width="9" height="10" viewBox="0 0 9 10" fill="none">
                      <path d="M1.5 1.5L7.5 5L1.5 8.5V1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
                <button className="w-6 h-6 flex items-center justify-center text-[#6b7280] hover:text-white transition-colors">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <circle cx="6.5" cy="3" r="0.8" fill="currentColor"/>
                    <circle cx="6.5" cy="6.5" r="0.8" fill="currentColor"/>
                    <circle cx="6.5" cy="10" r="0.8" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add note footer */}
      <div className="px-3 pb-3 pt-1 border-t border-[#222]">
        <button className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[#2a2a2a] text-xs text-[#aaa] hover:border-[#3a3a3a] hover:text-white transition-all">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 1V10M1 5.5H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Add note
        </button>
      </div>
    </div>
  )
}
