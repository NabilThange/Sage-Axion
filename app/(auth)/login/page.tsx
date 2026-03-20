"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import users from "@/lib/mock/users.json"

export default function LoginPage() {
  const [name, setName] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedName = name.trim().toLowerCase()
    
    if (!trimmedName) return

    // Check if user exists in mock data
    const userExists = users[trimmedName as keyof typeof users]
    
    if (userExists) {
      localStorage.setItem("sage_userId", trimmedName)
      router.push("/planner")
    } else {
      // New user - go to onboarding
      const newUserId = `user_${trimmedName}_${Date.now()}`
      localStorage.setItem("sage_userId", newUserId)
      localStorage.setItem("sage_userName", name.trim())
      router.push("/onboarding")
    }
  }

  const handleDemoUser = (demoName: string) => {
    setName(demoName)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-primary p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-background-surface rounded-card p-8 border border-background-elevated">
          {/* Logo and Tagline */}
          <div className="text-center mb-8">
            <div className="text-4xl font-medium text-accent-violet mb-2">
              🌿 Sage
            </div>
            <p className="text-caption">The AI Tutor That Never Forgets</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-background-elevated rounded-button text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent-violet transition-all"
              />
            </div>

            {/* Demo User Pills */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleDemoUser("Aryan")}
                className="flex-1 px-4 py-2 bg-background-elevated hover:bg-background-elevated/80 rounded-pill text-sm transition-colors"
              >
                Aryan
              </button>
              <button
                type="button"
                onClick={() => handleDemoUser("Priya")}
                className="flex-1 px-4 py-2 bg-background-elevated hover:bg-background-elevated/80 rounded-pill text-sm transition-colors"
              >
                Priya
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full px-6 py-3 bg-accent-violet hover:bg-accent-violet/90 disabled:bg-accent-violet/30 disabled:cursor-not-allowed rounded-button font-medium transition-all"
            >
              Enter Sage
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
