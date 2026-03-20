"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface Task {
  id: string
  title: string
  subject: string
  time: string
  completed: boolean
}

interface SchedulerPanelProps {
  userId: string
}

const mockTasks: Task[] = [
  { id: "1", title: "Review Threading Concepts", subject: "OS", time: "10:00 AM", completed: false },
  { id: "2", title: "Practice SQL Queries", subject: "DBMS", time: "2:00 PM", completed: false },
  { id: "3", title: "IOT Sensors Quiz", subject: "IOT", time: "4:00 PM", completed: false },
]

export function SchedulerPanel({ userId }: SchedulerPanelProps) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-background-elevated">
        <h3 className="text-h3 mb-1">Today's Schedule</h3>
        <p className="text-caption">{today}</p>
      </div>

      {/* Tasks */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {mockTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={`/mentor/${task.subject.toLowerCase()}?topic=${encodeURIComponent(task.title)}`}
              className="block bg-background-elevated hover:bg-background-elevated/80 rounded-button p-4 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-body font-medium mb-1">{task.title}</p>
                  <p className="text-caption">{task.subject}</p>
                </div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {}}
                  className="mt-1"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="text-sm text-white/60">{task.time}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Add Task Button */}
      <div className="p-6 border-t border-background-elevated">
        <button className="w-full px-4 py-3 bg-accent-violet hover:bg-accent-violet/90 rounded-button font-medium transition-all">
          + Add Task
        </button>
      </div>
    </div>
  )
}
