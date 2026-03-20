import { useState } from "react"
import { OnboardingData } from "@/app/onboarding/page"

interface Props {
  data: OnboardingData
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
}

export function OnboardingStep5({ data, onNext, onBack }: Props) {
  const [selectedOption, setSelectedOption] = useState<string>("")

  const handleSelect = (option: string) => {
    setSelectedOption(option)
    if (option === "skip") {
      onNext({ syllabusFile: null })
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onNext({ syllabusFile: file.name })
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-h2">Upload your syllabus</h2>
        <p className="text-caption">Or we'll use the standard curriculum</p>
      </div>

      <div className="space-y-4">
        <label className="block">
          <div className="border-2 border-dashed border-background-elevated hover:border-accent-violet rounded-card p-8 text-center cursor-pointer transition-colors">
            <div className="text-4xl mb-4">📄</div>
            <p className="text-body mb-2">Click to upload syllabus PDF</p>
            <p className="text-caption">or drag and drop here</p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </label>

        <div className="text-center">
          <button
            onClick={() => handleSelect("skip")}
            className="text-white/60 hover:text-white transition-colors"
          >
            Skip for now
          </button>
        </div>
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
