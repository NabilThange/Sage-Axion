"use client"

import { motion } from "framer-motion"

interface TestModeSelectorProps {
  onSelect: (mode: "student" | "mentor") => void
}

export function TestModeSelector({ onSelect }: TestModeSelectorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[#0D0D0F]">
      <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="max-w-4xl w-full"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/20 text-[#7c3aed] text-xs font-bold uppercase tracking-[0.2em] mb-4"
          >
            Preparation
          </motion.div>
          <h1 className="text-5xl font-black text-white tracking-tight mb-4">Choose Test Mode</h1>
          <p className="text-[#6b7280] text-lg font-medium">How would you like to be tested today?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.button
            onClick={() => onSelect("student")}
            whileHover={{ y: -8, backgroundColor: "#1e1e20", borderColor: "#7c3aed" }}
            whileTap={{ scale: 0.98 }}
            className="group relative bg-[#161618] border border-[#2a2a2c] rounded-[32px] p-10 transition-all duration-300 text-left shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7c3aed]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#7c3aed]/10 transition-colors" />

            <div className="w-16 h-16 bg-[#1a1a1c] border border-[#2a2a2c] rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner">
              ✏️
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Student-Designed</h3>
            <p className="text-[#9ca3af] text-[15px] leading-relaxed mb-8">
              Take full control. You choose the specific subject, topics, and difficulty levels you want to master.
            </p>
            <div className="space-y-3">
              {['Custom topic selection', 'Set your own time limit', 'Choose question count'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[#6b7280]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />
                  {item}
                </div>
              ))}
            </div>
          </motion.button>

          <motion.button
            onClick={() => onSelect("mentor")}
            whileHover={{ y: -8, backgroundColor: "#1e1e20", borderColor: "#7c3aed" }}
            whileTap={{ scale: 0.98 }}
            className="group relative bg-[#161618] border border-[#2a2a2c] rounded-[32px] p-10 transition-all duration-300 text-left shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7c3aed]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#7c3aed]/10 transition-colors" />

            <div className="w-16 h-16 bg-[#1a1a1c] border border-[#2a2a2c] rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner">
              🎯
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Mentor-Assigned</h3>
            <p className="text-[#9ca3af] text-[15px] leading-relaxed mb-8">
              Let Sage take the lead. AI analyzes your recent activity to create a test targeting your growth areas.
            </p>
            <div className="space-y-3">
              {['Targets your weaknesses', 'Adaptive difficulty', 'Personalized questions'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[#6b7280]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />
                  {item}
                </div>
              ))}
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
