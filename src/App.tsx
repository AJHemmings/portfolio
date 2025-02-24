"use client"

import type React from "react"
import { useEffect } from "react"
import Navbar from "./components/Navbar"
import DarkModeToggle from "./components/DarkModeToggle"
import Home from "./components/Home"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Contact from "./components/Contact"

const App: React.FC = () => {
  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add("dark")
  }, [])

  return (
    // Main container for the entire application
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navbar component */}
      <Navbar />
      {/* Dark mode toggle component */}
      <DarkModeToggle />
      {/* Main content container */}
      <div className="space-y-20">
        {/* Individual section components */}
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
  )
}

export default App

