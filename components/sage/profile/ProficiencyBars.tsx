import { motion } from "framer-motion"

interface ProficiencyBarsProps {
  subjects: string[]
}

export function ProficiencyBars({ subjects }: ProficiencyBarsProps) {
  const proficiencyData = subjects.map((subject) => ({
    subject,
    proficiency: Math.floor(Math.random() * 40) + 40,
    insight: "Keep practicing to improve your understanding",
  }))

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 70) return "bg-green"
    if (proficiency >= 50) return "bg-amber"
    return "bg-red"
  }

  return (
    <div className="bg-background-surface rounded-card p-6">
      <h2 className="text-h2 mb-6">Subject Proficiency</h2>
      
      <div className="space-y-6">
        {proficiencyData.map((item, index) => (
          <motion.div
            key={item.subject}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-body font-medium">{item.subject}</span>
              <span className="text-white/60">{item.proficiency}%</span>
            </div>
            
            <div className="h-3 bg-background-elevated rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${getProficiencyColor(item.proficiency)}`}
                initial={{ width: 0 }}
                animate={{ width: `${item.proficiency}%` }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              />
            </div>
            
            <p className="text-sm text-white/60">{item.insight}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
