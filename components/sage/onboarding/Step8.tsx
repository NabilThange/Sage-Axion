import { motion } from "framer-motion"
import { OnboardingData } from "@/app/onboarding/page"

interface Props {
  data: OnboardingData
  onComplete: () => void
  onBack: () => void
}

export function OnboardingStep8({ data, onComplete, onBack }: Props) {
  const proficiencyData = data.subjects.map((subject, index) => ({
    subject,
    proficiency: Math.floor(Math.random() * 40) + 30, // Mock proficiency 30-70%
  }))

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-6xl"
        >
          🎉
        </motion.div>
        <h1 className="text-h1">Your Profile is Ready!</h1>
        <p className="text-body text-white/80">
          Here's what we learned about you
        </p>
      </div>

      <div className="bg-background-surface rounded-card p-6 space-y-6">
        <div className="space-y-2">
          <p className="text-caption">Education</p>
          <p className="text-body">
            {data.educationLevel} • {data.curriculum} • {data.semester}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-caption">Your Subjects & Proficiency</p>
          {proficiencyData.map((item, index) => (
            <motion.div
              key={item.subject}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span>{item.subject}</span>
                <span className="text-white/60">{item.proficiency}%</span>
              </div>
              <div className="h-2 bg-background-elevated rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent-violet"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.proficiency}%` }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-2 text-white/60 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onComplete}
          className="px-8 py-3 bg-accent-violet hover:bg-accent-violet/90 rounded-button font-medium transition-all"
        >
          Start Learning 🚀
        </button>
      </div>
    </div>
  )
}
