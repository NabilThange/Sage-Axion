import { OnboardingData } from "@/app/onboarding/page"

interface Props {
  data: OnboardingData
  onNext: (data: Partial<OnboardingData>) => void
}

export function OnboardingStep1({ data, onNext }: Props) {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-h1">Hey {data.name}! 👋</h1>
        <p className="text-body text-white/80">
          Let's build your personalized study profile
        </p>
      </div>

      <button
        onClick={() => onNext({})}
        className="px-8 py-3 bg-accent-violet hover:bg-accent-violet/90 rounded-button font-medium transition-all"
      >
        Let's Go →
      </button>
    </div>
  )
}
