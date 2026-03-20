"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface SourceItem {
  id: string
  title: string
  type: "doc" | "pdf" | "notes"
  selected: boolean
}

interface SourcesPanelProps {
  subject: string
  onSourceCountChange?: (count: number) => void
}

const INITIAL_SOURCES: SourceItem[] = [
  { id: "1", title: "Architectures and Frameworks of the...", type: "doc",   selected: true },
  { id: "2", title: "Introduction to the Internet of Thin...", type: "doc",  selected: true },
  { id: "3", title: "Module 1 - Complete Notes.pdf",           type: "pdf",  selected: true },
]

function SourceIcon({ type }: { type: SourceItem["type"] }) {
  if (type === "pdf") {
    return (
      <div className="w-6 h-6 rounded flex items-center justify-center bg-red-900/40 flex-shrink-0">
        <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
          <rect x="0.5" y="0.5" width="10" height="12" rx="1.5" stroke="#ef4444" strokeWidth="1"/>
          <path d="M2.5 4.5H8.5M2.5 6.5H6.5M2.5 8.5H7" stroke="#ef4444" strokeWidth="0.9" strokeLinecap="round"/>
        </svg>
      </div>
    )
  }
  return (
    <div className="w-6 h-6 rounded flex items-center justify-center bg-blue-900/40 flex-shrink-0">
      <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
        <rect x="0.5" y="0.5" width="10" height="12" rx="1.5" stroke="#3b82f6" strokeWidth="1"/>
        <path d="M2.5 4.5H8.5M2.5 6.5H8.5M2.5 8.5H5.5" stroke="#3b82f6" strokeWidth="0.9" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

function CheckIcon({ active }: { active: boolean }) {
  return (
    <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all
      ${active ? "bg-[#3b82f6]" : "border border-[#3a3a3a]"}`}
    >
      {active && (
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
          <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  )
}

export function SourcesPanel({ subject }: SourcesPanelProps) {
  const [sources, setSources] = useState<SourceItem[]>(INITIAL_SOURCES)
  const [search, setSearch] = useState("")
  const [researchMode, setResearchMode] = useState<"web" | "academic">("web")
  const [researchSpeed, setResearchSpeed] = useState<"fast" | "deep">("fast")

  const allSelected = sources.every((s) => s.selected)

  const toggleAll = () => {
    setSources((prev) => prev.map((s) => ({ ...s, selected: !allSelected })))
  }

  const toggleSource = (id: string) => {
    setSources((prev) => prev.map((s) => s.id === id ? { ...s, selected: !s.selected } : s))
  }

  const filtered = sources.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col bg-[#161616] border-r border-[#222]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#222]">
        <span className="text-sm font-semibold text-white">Sources</span>
        <button className="w-6 h-6 flex items-center justify-center text-[#6b7280] hover:text-white transition-colors rounded hover:bg-white/[0.06]" title="Collapse panel">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2H2V12H5M5 2V12M5 2L9 2M5 12L9 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Add sources button */}
      <div className="px-3 pt-3">
        <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-[#2a2a2a] text-xs text-[#aaa] hover:border-[#3a3a3a] hover:text-white transition-all">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 1V10M1 5.5H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Add sources
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pt-2">
        <div className="flex items-center gap-2 px-2.5 py-2 bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#6b7280] flex-shrink-0">
            <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M7.5 7.5L10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search the web for new sources"
            className="flex-1 bg-transparent text-xs text-white placeholder:text-[#6b7280] focus:outline-none min-w-0"
          />
        </div>
      </div>

      {/* Research mode toggles */}
      <div className="px-3 pt-2 flex items-center gap-1.5">
        <button
          onClick={() => setResearchMode(researchMode === "web" ? "academic" : "web")}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg text-[11px] text-[#aaa] hover:text-white transition-all flex-1 justify-between"
        >
          <span>🌐 {researchMode === "web" ? "Web" : "Academic"}</span>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M2 3L4 5L6 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          onClick={() => setResearchSpeed(researchSpeed === "fast" ? "deep" : "fast")}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg text-[11px] text-[#aaa] hover:text-white transition-all flex-1 justify-between"
        >
          <span>⚡ {researchSpeed === "fast" ? "Fast" : "Deep"}</span>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M2 3L4 5L6 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] transition-all flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Select all row */}
      <div className="flex items-center justify-between px-3 pt-3 pb-1.5">
        <span className="text-[11px] text-[#6b7280]">Select all sources</span>
        <button onClick={toggleAll}><CheckIcon active={allSelected} /></button>
      </div>

      {/* Source list */}
      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-1">
        {filtered.map((source, i) => (
          <motion.button
            key={source.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => toggleSource(source.id)}
            className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/[0.04] transition-all text-left group"
          >
            <SourceIcon type={source.type} />
            <span className="flex-1 text-[12px] text-[#ccc] group-hover:text-white transition-colors truncate">
              {source.title}
            </span>
            <CheckIcon active={source.selected} />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
