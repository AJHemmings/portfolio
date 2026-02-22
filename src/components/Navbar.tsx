"use client";

import type React from "react";
import { GitlabIcon as GitHub, Linkedin } from "lucide-react";

interface NavbarProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeIndex, onNavigate }) => {
  const items = ["Home", "About", "Skills", "Projects", "Contact"];
  const isScrolled = activeIndex > 0;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur ${
        isScrolled
          ? "bg-white/80 dark:bg-[#0f1116]/85 shadow-lg border-b border-black/5 dark:border-white/10"
          : "bg-white/40 dark:bg-[#0f1116]/45 border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <a
              href="https://github.com/AJHemmings"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
            >
              <GitHub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/adam-hemmings-75b71b55/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
            >
              <Linkedin size={24} />
            </a>
          </div>
          <div className="space-x-4">
            {items.map((item, index) => (
              <button
                key={item}
                onClick={() => onNavigate(index)}
                className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
