import { useState, useEffect } from "react"
import { OnboardingData } from "@/app/onboarding/page"

interface Props {
  data: OnboardingData
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
}

const subjectsByCurriculum: Record<string, string[]> = {
  "BTech CSE": ["IOT", "DS", "OS", "DBMS", "CN", "AI", "ML"],
  "CBSE": ["Physics", "Chemistry", "Maths", "Biology", "English"],
  "default": ["Subject 1", "Subject 2", "Subject 3"],
}

export function OnboardingStep6({ data, onNext, onBack }: Props) {
  const [subjects, setSubjects] = useState<string[]>([])
  const availableSubjects = subjectsByCurriculum[data.curriculum] || subjectsByCurriculum.default

  useEffect(() => {
    if (data.subjects.length > 0) {
      setSubjects(data.subjects)
    } else {
      setSubjects(availableSubjects.slice(0, 5))
    }
  }, [])

  const toggleSubject = (subject: string) => {
    setSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    )
  }

  const handleNext = () => {
    onNext({ subjects })
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-h2">Confirm your subjects</h2>
        <p className="text-caption">Tap to add or remove</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {availableSubjects.map((subject) => (
          <button
            key={subject}
            onClick={() => toggleSubject(subject)}
            className={`p-4 rounded-button border-2 transition-all ${
              subjects.includes(subject)
                ? "border-accent-violet bg-accent-violet/10"
                : "border-background-elevated bg-background-surface hover:border-background-elevated/60"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{subject}</span>
              {subjects.includes(subject) && <span className="text-green">✓</span>}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-2 text-white/60 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={subjects.length === 0}
          className="px-8 py-3 bg-accent-violet hover:bg-accent-violet/90 disabled:bg-accent-violet/30 disabled:cursor-not-allowed rounded-button font-medium transition-all"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
