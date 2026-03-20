import { motion } from "framer-motion"

interface TestHistoryProps {
  userId: string
}

const mockTests = [
  { id: "1", subject: "OS", score: 85, total: 10, date: "2 days ago" },
  { id: "2", subject: "DBMS", score: 70, total: 10, date: "5 days ago" },
  { id: "3", subject: "IOT", score: 90, total: 10, date: "1 week ago" },
]

export function TestHistory({ userId }: TestHistoryProps) {
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green"
    if (percentage >= 60) return "text-amber"
    return "text-red"
  }

  return (
    <div className="bg-background-surface rounded-card p-6">
      <h2 className="text-h2 mb-6">Test History</h2>
      
      <div className="space-y-3">
        {mockTests.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-background-elevated rounded-button p-4 flex items-center justify-between"
          >
            <div className="flex-1">
              <p className="text-body font-medium mb-1">{test.subject}</p>
              <p className="text-caption">{test.date}</p>
            </div>
            
            <div className={`text-2xl font-medium ${getScoreColor((test.score / test.total) * 100)}`}>
              {test.score}/{test.total}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
