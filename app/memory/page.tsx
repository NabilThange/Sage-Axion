"use client"

import { motion } from "framer-motion"
import { Sidebar } from "@/components/sage/Sidebar"

const mockMemory = {
  world: [
    { id: "1", content: "Aryan is studying BTech CSE, Semester 3", timestamp: "3 weeks ago" },
    { id: "2", content: "Exam date: April 15, 2026", timestamp: "3 weeks ago" },
  ],
  experiences: [
    { id: "1", content: "Completed IOT Sensors module", timestamp: "2 days ago" },
    { id: "2", content: "Took OS Threading test - scored 85%", timestamp: "5 days ago" },
  ],
  observations: [
    { id: "1", content: "Struggles with Process Synchronization concepts", timestamp: "1 week ago" },
    { id: "2", content: "Strong in SQL query optimization", timestamp: "1 week ago" },
  ],
  opinions: [
    { id: "1", content: "Prefers visual learning for complex topics", timestamp: "2 weeks ago" },
    { id: "2", content: "Studies best in morning sessions", timestamp: "2 weeks ago" },
  ],
}

export default function MemoryPage() {
  return (
    <div className="flex h-screen bg-background-primary">
      <Sidebar currentPage="memory" />
      
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-h1 mb-2">Memory Panel 🧠</h1>
            <p className="text-caption">Everything Sage remembers about you</p>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-accent-violet/10 border border-accent-violet/20 rounded-card p-6"
          >
            <h3 className="text-h3 mb-3 text-accent-light">Memory Summary</h3>
            <p className="text-body text-white/90">
              Sage has built a comprehensive understanding of your learning journey across {mockMemory.world.length + mockMemory.experiences.length + mockMemory.observations.length + mockMemory.opinions.length} memory entries.
            </p>
          </motion.div>

          {/* Memory Types */}
          <div className="space-y-6">
            <MemorySection
              title="World Knowledge"
              icon="🌍"
              description="Facts about you and your context"
              memories={mockMemory.world}
              delay={0.1}
            />

            <MemorySection
              title="Experiences"
              icon="📚"
              description="What you've learned and accomplished"
              memories={mockMemory.experiences}
              delay={0.2}
            />

            <MemorySection
              title="Observations"
              icon="👁️"
              description="Patterns in your learning behavior"
              memories={mockMemory.observations}
              delay={0.3}
            />

            <MemorySection
              title="Opinions"
              icon="💭"
              description="Your preferences and learning style"
              memories={mockMemory.opinions}
              delay={0.4}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface MemorySectionProps {
  title: string
  icon: string
  description: string
  memories: Array<{ id: string; content: string; timestamp: string }>
  delay: number
}

function MemorySection({ title, icon, description, memories, delay }: MemorySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-background-surface rounded-card p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="text-h3">{title}</h3>
          <p className="text-caption">{description}</p>
        </div>
      </div>

      <div className="space-y-3">
        {memories.map((memory) => (
          <div
            key={memory.id}
            className="bg-background-elevated rounded-button p-4"
          >
            <p className="text-body mb-2">{memory.content}</p>
            <p className="text-xs text-white/40">{memory.timestamp}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
