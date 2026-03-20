import { motion } from "framer-motion"

interface TapCardProps {
  label: string
  icon?: string
  selected?: boolean
  onClick: () => void
}

export function TapCard({ label, icon, selected, onClick }: TapCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`relative p-6 rounded-card border-2 transition-all ${
        selected
          ? "border-accent-violet bg-accent-violet/10"
          : "border-background-elevated bg-background-surface hover:border-background-elevated/60"
      }`}
    >
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <p className="text-body font-medium">{label}</p>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-6 h-6 bg-accent-violet rounded-full flex items-center justify-center text-sm"
        >
          ✓
        </motion.div>
      )}
    </motion.button>
  )
}
