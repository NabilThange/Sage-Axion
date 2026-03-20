"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { OnboardingStep1 } from "@/components/sage/onboarding/Step1"
import { OnboardingStep2 } from "@/components/sage/onboarding/Step2"
import { OnboardingStep3 } from "@/components/sage/onboarding/Step3"
import { OnboardingStep4 } from "@/components/sage/onboarding/Step4"
import { OnboardingStep5 } from "@/components/sage/onboarding/Step5"
import { OnboardingStep6 } from "@/components/sage/onboarding/Step6"
import { OnboardingStep7 } from "@/components/sage/onboarding/Step7"
import { OnboardingStep8 } from "@/components/sage/onboarding/Step8"

export interface OnboardingData {
  name: string
  educationLevel: string
  curriculum: string
  semester: string
  syllabusFile: string | null
  subjects: string[]
  topicsKnown: Record<string, string[]>
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    name: "",
    educationLevel: "",
    curriculum: "",
    semester: "",
    syllabusFile: null,
    subjects: [],
    topicsKnown: {},
  })
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userName = localStorage.getItem("sage_userName")
      if (userName) {
        setData((prev) => ({ ...prev, name: userName }))
      }
    }
  }, [])

  const handleNext = (stepData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...stepData }))
    setDirection(1)
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setDirection(-1)
    setCurrentStep((prev) => prev - 1)
  }

  const handleComplete = () => {
    // Save to localStorage (mock backend)
    const userId = localStorage.getItem("sage_userId")
    if (userId) {
      localStorage.setItem(`sage_profile_${userId}`, JSON.stringify(data))
    }
    router.push("/planner")
  }

  const steps = [
    <OnboardingStep1 key="step1" data={data} onNext={handleNext} />,
    <OnboardingStep2 key="step2" data={data} onNext={handleNext} onBack={handleBack} />,
    <OnboardingStep3 key="step3" data={data} onNext={handleNext} onBack={handleBack} />,
    <OnboardingStep4 key="step4" data={data} onNext={handleNext} onBack={handleBack} />,
    <OnboardingStep5 key="step5" data={data} onNext={handleNext} onBack={handleBack} />,
    <OnboardingStep6 key="step6" data={data} onNext={handleNext} onBack={handleBack} />,
    <OnboardingStep7 key="step7" data={data} onNext={handleNext} onBack={handleBack} />,
    <OnboardingStep8 key="step8" data={data} onComplete={handleComplete} onBack={handleBack} />,
  ]

  const progress = (currentStep / 8) * 100

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-background-elevated">
          <motion.div
            className="h-full bg-accent-violet"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="bg-background-surface px-6 py-4 border-b border-background-elevated">
          <p className="text-sm text-white/60">Step {currentStep} of 8</p>
        </div>
      </div>

      {/* Step Content */}
      <div className="pt-24 pb-12 px-4">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.2 }}
          >
            {steps[currentStep - 1]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
