"use client";

import type React from "react";
import { useState } from "react";
import { GitlabIcon as GitHub, Linkedin, Menu, X } from "lucide-react";

interface NavbarProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeIndex, onNavigate }) => {
  const items = ["Home", "About", "Skills", "Projects", "Contact"];
  const isScrolled = activeIndex > 0;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (index: number) => {
    onNavigate(index);
    setIsMenuOpen(false);
  };

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
          {/* Social links */}
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

          {/* Desktop nav */}
          <div className="hidden sm:flex space-x-4">
            {items.map((item, index) => (
              <button
                key={item}
                onClick={() => handleNavigate(index)}
                className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden text-gray-800 dark:text-gray-200"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div className="sm:hidden flex flex-col pt-3 pb-1 gap-1">
            {items.map((item, index) => (
              <button
                key={item}
                onClick={() => handleNavigate(index)}
                className="text-left px-2 py-2 text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 rounded"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
