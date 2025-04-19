"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="relative inline-flex">
      <div className="bg-gray-800 dark:bg-gray-800 rounded-full p-1 flex items-center">
        <button
          onClick={() => setTheme("light")}
          className={`p-2 rounded-full transition-all duration-200 ${
            theme !== "dark" ? "bg-white text-black" : "text-white"
          }`}
          aria-label="Light mode"
        >
          <Sun className="h-4 w-4" />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`p-2 rounded-full transition-all duration-200 ${
            theme === "dark" ? "bg-gray-700 text-white" : "text-white"
          }`}
          aria-label="Dark mode"
        >
          <Moon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

