import { motion } from "framer-motion"

interface DailyBriefingCardProps {
  user: any
  briefing: any
}

export function DailyBriefingCard({ user, briefing }: DailyBriefingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background-surface rounded-card p-6 space-y-4"
    >
      <div>
        <h2 className="text-h2">{briefing.greeting}</h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-background-elevated rounded-button p-4">
          <div className="text-2xl font-medium text-amber">{user.streak}</div>
          <div className="text-caption">Day Streak 🔥</div>
        </div>

        <div className="bg-background-elevated rounded-button p-4">
          <div className="text-2xl font-medium text-accent-violet">{user.xp}</div>
          <div className="text-caption">Total XP</div>
        </div>

        <div className="bg-background-elevated rounded-button p-4">
          <div className="text-2xl font-medium text-red">{briefing.examCountdown}</div>
          <div className="text-caption">Days to Exam</div>
        </div>
      </div>

      <div className="bg-background-elevated rounded-button p-4">
        <div className="text-caption mb-1">Weakest Topic</div>
        <div className="text-body font-medium">{briefing.weakestTopic}</div>
        <div className="text-sm text-white/60">{briefing.weakestSubject}</div>
      </div>

      <div className="bg-accent-violet/10 border border-accent-violet/20 rounded-button p-4">
        <div className="text-caption text-accent-light mb-1">Today's Focus</div>
        <div className="text-body">{briefing.todayFocus}</div>
      </div>
    </motion.div>
  )
}
