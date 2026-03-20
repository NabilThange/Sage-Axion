import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#0D0D0F",
          surface: "#161618",
          elevated: "#1F1F22",
        },
        accent: {
          violet: "#7C6AF5",
          light: "#EAE8FD",
        },
        amber: "#F5A524",
        green: "#17C964",
        red: "#F31260",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        button: "8px",
        pill: "20px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-4px)" },
          "75%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        shake: "shake 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
}

export default config
