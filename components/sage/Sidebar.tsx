"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

interface SidebarProps {
  currentPage: string
}

export function Sidebar({ currentPage }: SidebarProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.clear()
    router.push("/login")
  }

  const navItems = [
    { id: "planner", label: "Planner", icon: "📅", href: "/planner" },
    { id: "mentor", label: "Mentor", icon: "📚", href: "/mentor" },
    { id: "tests", label: "Tests", icon: "📝", href: "/tests" },
    { id: "profile", label: "Profile", icon: "👤", href: "/profile" },
    { id: "memory", label: "Memory", icon: "🧠", href: "/memory" },
  ]

  return (
    <div className="w-60 bg-background-surface border-r border-background-elevated flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-background-elevated">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="text-xl font-medium text-accent-violet">Sage</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-button transition-colors ${
              currentPage === item.id
                ? "bg-accent-violet text-white"
                : "text-white/80 hover:bg-background-elevated"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-background-elevated">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-button text-white/80 hover:bg-background-elevated transition-colors"
        >
          <span className="text-xl">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
