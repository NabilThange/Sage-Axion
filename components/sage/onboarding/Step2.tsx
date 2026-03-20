import { OnboardingData } from "@/app/onboarding/page"
import { TapCard } from "@/components/sage/TapCard"

interface Props {
  data: OnboardingData
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
}

const educationLevels = [
  { id: "class-10-12", label: "Class 10–12", icon: "📚" },
  { id: "undergraduate", label: "Undergraduate", icon: "🎓" },
  { id: "postgraduate", label: "Postgraduate", icon: "👨‍🎓" },
  { id: "competitive", label: "Competitive Exam", icon: "📝" },
]

export function OnboardingStep2({ data, onNext, onBack }: Props) {
  const handleSelect = (level: string) => {
    onNext({ educationLevel: level })
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-h2">What's your education level?</h2>
        <p className="text-caption">This helps us customize your experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {educationLevels.map((level) => (
          <TapCard
            key={level.id}
            label={level.label}
            icon={level.icon}
            selected={data.educationLevel === level.label}
            onClick={() => handleSelect(level.label)}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onBack}
          className="px-6 py-2 text-white/60 hover:text-white transition-colors"
        >
          ← Back
        </button>
      </div>
    </div>
  )
}
