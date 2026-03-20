import { useState } from "react"
import { OnboardingData } from "@/app/onboarding/page"
import { TapCard } from "@/components/sage/TapCard"

interface Props {
  data: OnboardingData
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
}

const curriculums = {
  "Class 10–12": ["CBSE", "ICSE", "State Board"],
  "Undergraduate": ["BTech CSE", "BTech ECE", "BCA", "BSc CS"],
  "Postgraduate": ["MTech", "MCA", "MSc"],
  "Competitive Exam": ["JEE", "NEET", "GATE", "CAT"],
}

export function OnboardingStep3({ data, onNext, onBack }: Props) {
  const options = curriculums[data.educationLevel as keyof typeof curriculums] || []

  const handleSelect = (curriculum: string) => {
    onNext({ curriculum })
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-h2">Select your curriculum</h2>
        <p className="text-caption">We'll tailor content to your syllabus</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((curriculum) => (
          <TapCard
            key={curriculum}
            label={curriculum}
            selected={data.curriculum === curriculum}
            onClick={() => handleSelect(curriculum)}
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
