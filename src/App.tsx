"use client";

import type React from "react";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import DarkModeToggle from "./components/DarkModeToggle";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { Analytics } from "@vercel/analytics/react";

const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <DarkModeToggle />
      <div className="space-y-20">
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
  );
};

export default App;
