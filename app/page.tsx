"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("sage_userId")
      if (userId) {
        router.push("/planner")
      } else {
        router.push("/login")
      }
      setIsChecking(false)
    }
  }, [router])

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-primary">
        <div className="animate-pulse text-accent-violet">Loading...</div>
      </div>
    )
  }

  return null
}
