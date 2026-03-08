import type React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const HEADING = "Skills";

type AnimPhase = "idle" | "typing" | "moving-up" | "revealing" | "done";

interface Skill {
  name: string;
  image: string;
}

const skills: Skill[] = [
  { name: "JavaScript", image: "/javascript-original.svg" },
  { name: "TypeScript", image: "/typescript-original.svg" },
  { name: "React", image: "/react-original.svg" },
  { name: "Next.js", image: "/nextjs-original.svg" },
  { name: "Node.js", image: "/nodejs-original-wordmark.svg" },
  { name: "Python", image: "/python-original.svg" },
  { name: "HTML", image: "/html5-original.svg" },
  { name: "CSS", image: "/css3-original.svg" },
  { name: "Tailwind CSS", image: "/tailwindcss-original.svg" },
  { name: "PostgreSQL", image: "/postgresql-original.svg" },
  { name: "Git", image: "/git-original.svg" },
  { name: "Figma", image: "/figma-original.svg" },
  { name: "Vite", image: "/vite-original.svg" },
  { name: "Docker", image: "/docker-original.svg" },
  { name: "Vercel", image: "/vercel-original.svg" },
  { name: "PlayWright", image: "/playwright-original.svg" },
  { name: "DevOps", image: "/github-original.svg" },
  { name: "Claude AI", image: "/claude-original.svg" },
  { name: "JSON", image: "/json-original.svg" },
  { name: "React Native", image: "/react-original.svg" },
];

interface SkillsProps {
  isActive: boolean;
}

const Skills: React.FC<SkillsProps> = ({ isActive }) => {
  const [animPhase, setAnimPhase] = useState<AnimPhase>("idle");
  const [displayedHeading, setDisplayedHeading] = useState("");
  const [cursorOn, setCursorOn] = useState(true);
  const hasAnimated = useRef(false);

  // Trigger animation once when section becomes active
  useEffect(() => {
    if (isActive && !hasAnimated.current) {
      hasAnimated.current = true;
      setAnimPhase("typing");
    }
  }, [isActive]);

  // Type heading
  useEffect(() => {
    if (animPhase !== "typing") return;
    if (displayedHeading.length >= HEADING.length) {
      const t = setTimeout(() => setAnimPhase("moving-up"), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setDisplayedHeading(HEADING.slice(0, displayedHeading.length + 1)),
      100,
    );
    return () => clearTimeout(t);
  }, [animPhase, displayedHeading]);

  // After heading slides up, begin revealing cards
  useEffect(() => {
    if (animPhase !== "moving-up") return;
    const t = setTimeout(() => setAnimPhase("revealing"), 700);
    return () => clearTimeout(t);
  }, [animPhase]);

  // Mark done
  useEffect(() => {
    if (animPhase !== "revealing") return;
    const t = setTimeout(() => setAnimPhase("done"), 1000);
    return () => clearTimeout(t);
  }, [animPhase]);

  // Cursor blink
  useEffect(() => {
    if (animPhase === "moving-up" || animPhase === "revealing" || animPhase === "done") {
      setCursorOn(false);
      return;
    }
    const interval = setInterval(() => setCursorOn((v) => !v), 520);
    return () => clearInterval(interval);
  }, [animPhase]);

  const isCentered = animPhase === "idle" || animPhase === "typing";
  const cardsVisible = animPhase === "revealing" || animPhase === "done";

  return (
    <section id="skills" className="relative min-h-screen py-20 overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Heading — starts translated down to center, then transitions up */}
        <h2
          className="font-display text-4xl md:text-5xl tracking-tight text-center mb-12 transition-transform duration-700 ease-in-out"
          style={{
            transform: isCentered ? "translateY(calc(45vh - 7rem))" : "translateY(0)",
          }}
        >
          {animPhase === "idle" ? "\u00A0" : displayedHeading}
          {cursorOn && animPhase === "typing" && (
            <span aria-hidden="true" className="ml-0.5 opacity-60">|</span>
          )}
        </h2>

        {/* Skill cards — staggered unblur */}
        <div className="grid grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="flex flex-col items-center p-4 bg-white/90 dark:bg-gray-900/70 rounded-lg border border-black/5 dark:border-white/10 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/5 dark:hover:bg-white/10 hover:shadow-lg"
              style={
                cardsVisible
                  ? {
                      animation: "unblur 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
                      animationDelay: `${i * 50}ms`,
                    }
                  : { opacity: 0 }
              }
            >
              <Image
                src={skill.image}
                alt={skill.name}
                width={64}
                height={64}
                className="mb-3 rounded-lg"
              />
              <span className="text-center text-sm font-medium">{skill.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
