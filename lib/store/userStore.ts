import { create } from "zustand"

export interface User {
  userId: string
  name: string
  educationLevel?: string
  curriculum?: string
  semester?: string
  subjects?: string[]
  topicsKnown?: Record<string, string[]>
  streak?: number
  xp?: number
}

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
  updateUser: (updates: Partial<User>) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
}))
