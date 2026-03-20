import { OnboardingData } from "@/app/onboarding/page"
import { TapCard } from "@/components/sage/TapCard"

interface Props {
  data: OnboardingData
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
}

const semesters = {
  "BTech CSE": ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"],
  "CBSE": ["Class 10", "Class 11", "Class 12"],
  "default": ["Year 1", "Year 2", "Year 3", "Year 4"],
}

export function OnboardingStep4({ data, onNext, onBack }: Props) {
  const options = semesters[data.curriculum as keyof typeof semesters] || semesters.default

  const handleSelect = (semester: string) => {
    onNext({ semester })
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-h2">Which semester/year?</h2>
        <p className="text-caption">We'll load the right subjects</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {options.map((semester) => (
          <TapCard
            key={semester}
            label={semester}
            selected={data.semester === semester}
            onClick={() => handleSelect(semester)}
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
