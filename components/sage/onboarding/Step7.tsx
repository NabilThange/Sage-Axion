import { useState } from "react"
import { OnboardingData } from "@/app/onboarding/page"
import { TopicTree } from "./TopicTree"

interface Props {
  data: OnboardingData
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
}

interface Topic {
  id: string
  name: string
  children?: Topic[]
}

const topicsBySubject: Record<string, Topic[]> = {
  "IOT": [
    {
      id: "iot-m1",
      name: "Introduction to IoT",
      children: [
        { id: "iot-m1-t1", name: "IoT Architecture" },
        { id: "iot-m1-t2", name: "IoT Protocols" },
      ],
    },
    {
      id: "iot-m2",
      name: "Sensors & Actuators",
      children: [
        { id: "iot-m2-t1", name: "Temperature Sensors" },
        { id: "iot-m2-t2", name: "Motion Sensors" },
        {
          id: "iot-m2-t3",
          name: "Actuators",
          children: [
            { id: "iot-m2-t3-s1", name: "Motors" },
            { id: "iot-m2-t3-s2", name: "Relays" },
          ],
        },
      ],
    },
    {
      id: "iot-m3",
      name: "Communication",
      children: [
        { id: "iot-m3-t1", name: "MQTT" },
        { id: "iot-m3-t2", name: "HTTP/REST" },
        { id: "iot-m3-t3", name: "WebSockets" },
      ],
    },
  ],
  "DS": [
    {
      id: "ds-m1",
      name: "Linear Data Structures",
      children: [
        { id: "ds-m1-t1", name: "Arrays" },
        { id: "ds-m1-t2", name: "Linked Lists" },
        { id: "ds-m1-t3", name: "Stacks" },
        { id: "ds-m1-t4", name: "Queues" },
      ],
    },
    {
      id: "ds-m2",
      name: "Non-Linear Data Structures",
      children: [
        {
          id: "ds-m2-t1",
          name: "Trees",
          children: [
            { id: "ds-m2-t1-s1", name: "Binary Trees" },
            { id: "ds-m2-t1-s2", name: "BST" },
            { id: "ds-m2-t1-s3", name: "AVL Trees" },
          ],
        },
        { id: "ds-m2-t2", name: "Graphs" },
        { id: "ds-m2-t3", name: "Heaps" },
      ],
    },
  ],
  "OS": [
    {
      id: "os-m1",
      name: "Process Management",
      children: [
        { id: "os-m1-t1", name: "Processes" },
        { id: "os-m1-t2", name: "Threads" },
        { id: "os-m1-t3", name: "Scheduling" },
        {
          id: "os-m1-t4",
          name: "Synchronization",
          children: [
            { id: "os-m1-t4-s1", name: "Semaphores" },
            { id: "os-m1-t4-s2", name: "Monitors" },
          ],
        },
      ],
    },
    {
      id: "os-m2",
      name: "Memory Management",
      children: [
        { id: "os-m2-t1", name: "Paging" },
        { id: "os-m2-t2", name: "Segmentation" },
        { id: "os-m2-t3", name: "Virtual Memory" },
      ],
    },
  ],
  "default": [
    {
      id: "default-m1",
      name: "Module 1",
      children: [
        { id: "default-m1-t1", name: "Topic 1" },
        { id: "default-m1-t2", name: "Topic 2" },
      ],
    },
    {
      id: "default-m2",
      name: "Module 2",
      children: [
        { id: "default-m2-t1", name: "Topic 1" },
        {
          id: "default-m2-t2",
          name: "Topic 2",
          children: [
            { id: "default-m2-t2-s1", name: "Sub Topic 1" },
            { id: "default-m2-t2-s2", name: "Sub Topic 2" },
          ],
        },
      ],
    },
  ],
}

export function OnboardingStep7({ data, onNext, onBack }: Props) {
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0)
  const [topicsKnown, setTopicsKnown] = useState<Record<string, Set<string>>>(
    () => {
      const initial: Record<string, Set<string>> = {}
      Object.keys(data.topicsKnown || {}).forEach((subject) => {
        initial[subject] = new Set(data.topicsKnown?.[subject] || [])
      })
      return initial
    }
  )

  const currentSubject = data.subjects[currentSubjectIndex]
  const topics = topicsBySubject[currentSubject] || topicsBySubject["default"]
  const selectedIds = topicsKnown[currentSubject] || new Set<string>()

  const handleToggle = (id: string, isSelected: boolean, childIds: string[]) => {
    setTopicsKnown((prev) => {
      const newSet = new Set(prev[currentSubject] || [])
      
      if (isSelected) {
        newSet.add(id)
        childIds.forEach((childId) => newSet.add(childId))
      } else {
        newSet.delete(id)
        childIds.forEach((childId) => newSet.delete(childId))
      }

      return {
        ...prev,
        [currentSubject]: newSet,
      }
    })
  }

  const handleNext = () => {
    if (currentSubjectIndex < data.subjects.length - 1) {
      setCurrentSubjectIndex((prev) => prev + 1)
    } else {
      // Convert Sets back to arrays for storage
      const topicsKnownArrays: Record<string, string[]> = {}
      Object.keys(topicsKnown).forEach((subject) => {
        topicsKnownArrays[subject] = Array.from(topicsKnown[subject])
      })
      onNext({ topicsKnown: topicsKnownArrays })
    }
  }

  const handleSkip = () => {
    if (currentSubjectIndex < data.subjects.length - 1) {
      setCurrentSubjectIndex((prev) => prev + 1)
    } else {
      const topicsKnownArrays: Record<string, string[]> = {}
      Object.keys(topicsKnown).forEach((subject) => {
        topicsKnownArrays[subject] = Array.from(topicsKnown[subject])
      })
      onNext({ topicsKnown: topicsKnownArrays })
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-h2">What do you already know in {currentSubject}?</h2>
        <p className="text-caption">
          Subject {currentSubjectIndex + 1} of {data.subjects.length}
        </p>
      </div>

      <div className="bg-background-surface rounded-card p-6 max-h-[500px] overflow-y-auto">
        <TopicTree
          topics={topics}
          selectedIds={selectedIds}
          onToggle={handleToggle}
        />
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-2 text-white/60 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={handleSkip}
          className="px-6 py-2 text-white/60 hover:text-white transition-colors"
        >
          Skip
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-accent-violet hover:bg-accent-violet/90 rounded-button font-medium transition-all"
        >
          {currentSubjectIndex < data.subjects.length - 1 ? "Next Subject →" : "Continue →"}
        </button>
      </div>
    </div>
  )
}
