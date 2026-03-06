"use client";

import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import DarkModeToggle from "./components/DarkModeToggle";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { Analytics } from "@vercel/analytics/react";

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAboutLocked, setIsAboutLocked] = useState(false);
  const [aboutNavState, setAboutNavState] = useState({
    atStart: true,
    atEnd: false,
  });
  const [projectsNavState, setProjectsNavState] = useState({
    atStart: true,
    atEnd: false,
  });
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const aboutExitRef = useRef<{ direction: number; time: number } | null>(null);
  const projectsExitRef = useRef<{ direction: number; time: number } | null>(null);
  const lastWheelTimeRef = useRef(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const sections = useMemo(
    () => ["home", "about", "skills", "projects", "contact"],
    [],
  );

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;
      setParallaxOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (activeIndex !== 1 || (!aboutNavState.atStart && !aboutNavState.atEnd)) {
      aboutExitRef.current = null;
    }
  }, [activeIndex, aboutNavState]);

  useEffect(() => {
    if (activeIndex !== 3 || (!projectsNavState.atStart && !projectsNavState.atEnd)) {
      projectsExitRef.current = null;
    }
  }, [activeIndex, projectsNavState]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (document.body.dataset.modalOpen === "true") {
      event.preventDefault();
      return;
    }
    const dominantDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    if (dominantDelta === 0) return;

    const direction = dominantDelta > 0 ? 1 : -1;

    if (activeIndex === 1) {
      const canExit =
        (direction > 0 && aboutNavState.atEnd) ||
        (direction < 0 && aboutNavState.atStart);

      if (!canExit) {
        aboutExitRef.current = null;
        event.preventDefault();
        return;
      }

      const now = Date.now();
      const armed = aboutExitRef.current;
      if (!armed || armed.direction !== direction || now - armed.time > 900) {
        aboutExitRef.current = { direction, time: now };
        event.preventDefault();
        return;
      }

      aboutExitRef.current = null;
    }

    if (isAboutLocked) {
      event.preventDefault();
      return;
    }

    if (activeIndex === 3) {
      const canExit =
        (direction > 0 && projectsNavState.atEnd) ||
        (direction < 0 && projectsNavState.atStart);

      if (!canExit) {
        // Not at boundary — let the browser scroll the cards container
        projectsExitRef.current = null;
        return;
      }

      const now = Date.now();
      const armed = projectsExitRef.current;
      if (!armed || armed.direction !== direction || now - armed.time > 900) {
        projectsExitRef.current = { direction, time: now };
        event.preventDefault();
        return;
      }

      projectsExitRef.current = null;
    }

    event.preventDefault();

    const now = Date.now();
    if (now - lastWheelTimeRef.current < 1100) {
      return;
    }
    lastWheelTimeRef.current = now;

    setActiveIndex((prev) => {
      const nextIndex = dominantDelta > 0 ? prev + 1 : prev - 1;
      return Math.min(Math.max(nextIndex, 0), sections.length - 1);
    });
  };

  const handleNavigate = (index: number) => {
    setActiveIndex(Math.min(Math.max(index, 0), sections.length - 1));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (document.body.dataset.modalOpen === "true") return;

    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;

    // Only handle primarily horizontal swipes above a minimum threshold
    if (Math.abs(deltaX) <= Math.abs(deltaY) || Math.abs(deltaX) < 50) return;

    const direction = deltaX > 0 ? 1 : -1;

    if (activeIndex === 1) {
      const canExit =
        (direction > 0 && aboutNavState.atEnd) ||
        (direction < 0 && aboutNavState.atStart);
      if (!canExit) return;
    }

    setActiveIndex((prev) =>
      Math.min(Math.max(prev + direction, 0), sections.length - 1),
    );
  };

  return (
    <div
      className="min-h-screen text-gray-900 dark:text-gray-100"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="parallax-layer" aria-hidden="true">
        <div className="parallax-base" />
        <div
          className="parallax-mid"
          style={{
            transform: `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0)`,
          }}
        />
      </div>
      <Navbar activeIndex={activeIndex} onNavigate={handleNavigate} />
      <DarkModeToggle />
      <div
        className="slider-rail"
        style={{ transform: `translateX(-${activeIndex * 100}vw)` }}
      >
        <div className="slider-panel">
          <Home />
        </div>
        <div className="slider-panel">
          <About
            isActive={activeIndex === 1}
            onLockChange={setIsAboutLocked}
            onNavStateChange={setAboutNavState}
          />
        </div>
        <div className="slider-panel">
          <Skills />
        </div>
        <div className="slider-panel scrollbar-hide">
          <Projects onNavStateChange={setProjectsNavState} />
        </div>
        <div className="slider-panel">
          <Contact onBackToTop={() => handleNavigate(0)} />
        </div>
      </div>
      <Analytics />
    </div>
  );
};

export default App;
