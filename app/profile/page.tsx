"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sidebar } from "@/components/sage/Sidebar"
import { ProficiencyBars } from "@/components/sage/profile/ProficiencyBars"
import { TestHistory } from "@/components/sage/profile/TestHistory"
import users from "@/lib/mock/users.json"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("sage_userId")
      if (!userId) {
        router.push("/login")
        return
      }

      const userData = users[userId as keyof typeof users]
      if (userData) {
        setUser(userData)
      } else {
        localStorage.clear()
        router.push("/login")
      }
    }
  }, [router])

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-accent-violet">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background-primary">
      <Sidebar currentPage="profile" />
      
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-h1 mb-2">Your Profile</h1>
            <p className="text-caption">Track your progress and performance</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-background-surface rounded-card p-6"
            >
              <div className="text-4xl font-medium text-amber mb-2">{user.streak}</div>
              <div className="text-caption">Day Streak 🔥</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-background-surface rounded-card p-6"
            >
              <div className="text-4xl font-medium text-accent-violet mb-2">{user.xp}</div>
              <div className="text-caption">Total XP</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-background-surface rounded-card p-6"
            >
              <div className="text-4xl font-medium text-green mb-2">{user.subjects.length}</div>
              <div className="text-caption">Active Subjects</div>
            </motion.div>
          </div>

          {/* Proficiency */}
          <ProficiencyBars subjects={user.subjects} />

          {/* Test History */}
          <TestHistory userId={user.userId} />
        </div>
      </div>
    </div>
  )
}
