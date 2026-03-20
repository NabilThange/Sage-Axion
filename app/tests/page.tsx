"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sage/Sidebar"
import { TestModeSelector } from "@/components/sage/tests/TestModeSelector"
import { TestConfigForm } from "@/components/sage/tests/TestConfigForm"
import { TestInterface } from "@/components/sage/tests/TestInterface"
import { TestResults } from "@/components/sage/tests/TestResults"

export default function TestsPage() {
  const [stage, setStage] = useState<"mode" | "config" | "test" | "results">("mode")
  const [mode, setMode] = useState<"student" | "mentor" | null>(null)
  const [config, setConfig] = useState<any>(null)
  const [results, setResults] = useState<any>(null)

  const handleModeSelect = (selectedMode: "student" | "mentor") => {
    setMode(selectedMode)
    setStage("config")
  }

  const handleConfigSubmit = (testConfig: any) => {
    setConfig(testConfig)
    setStage("test")
  }

  const handleTestComplete = (testResults: any) => {
    setResults(testResults)
    setStage("results")
  }

  const handleRetake = () => {
    setStage("config")
    setResults(null)
  }

  const handleNewTest = () => {
    setStage("mode")
    setMode(null)
    setConfig(null)
    setResults(null)
  }

  return (
    <div className="flex h-screen bg-background-primary">
      {stage !== "test" && <Sidebar currentPage="tests" />}
      
      <div className="flex-1 overflow-y-auto">
        {stage === "mode" && <TestModeSelector onSelect={handleModeSelect} />}
        {stage === "config" && mode && (
          <TestConfigForm mode={mode} onSubmit={handleConfigSubmit} onBack={() => setStage("mode")} />
        )}
        {stage === "test" && config && (
          <TestInterface config={config} onComplete={handleTestComplete} />
        )}
        {stage === "results" && results && (
          <TestResults results={results} onRetake={handleRetake} onNewTest={handleNewTest} />
        )}
      </div>
    </div>
  )
}
