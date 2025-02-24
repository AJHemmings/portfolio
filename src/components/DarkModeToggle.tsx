"use client"

import type React from "react"
import { useState, useEffect } from "react"

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true" || localStorage.getItem("darkMode") === null
    setIsDarkMode(isDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    document.documentElement.classList.toggle("dark", newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-20 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 z-50"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? "🌞" : "🌙"}
    </button>
  )
}

export default DarkModeToggle

