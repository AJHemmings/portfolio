import type React from "react";
import Image from "next/image";

// Array of skills with unique images
const skills = [
  { name: "JSON", image: "/json-original.svg" },
  { name: "JavaScript", image: "/javascript-original.svg" },
  { name: "TypeScript", image: "/typescript-original.svg" },
  { name: "React", image: "/react-original.svg" },
  { name: "Node.js", image: "/nodejs-original-wordmark.svg" },
  { name: "Next.js", image: "/nextjs-original.svg" },
  { name: "Python", image: "/python-original.svg" },
  { name: "HTML", image: "/html5-original.svg" },
  { name: "CSS", image: "/css3-original.svg" },
  { name: "Tailwind CSS", image: "/tailwindcss-original.svg" },
  { name: "PlayWright", image: "/playwright-original.svg" },
  { name: "PostgreSQL", image: "/postgresql-original.svg" },
  { name: "Vercel", image: "/vercel-original.svg" },
  { name: "Git", image: "/git-original.svg" },
  { name: "Figma", image: "/figma-original.svg" },
  { name: "DevOps", image: "/github-original.svg" },
  { name: "Vite", image: "/vite-original.svg" },
  { name: "Docker", image: "/docker-original.svg" },
];

const Skills: React.FC = () => {
  return (
    // Main container for the skills section
    <section
      id="skills"
      className="min-h-screen py-20 bg-gray-100 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        {/* Section title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Skills
        </h2>
        {/* Grid container for skill cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Map through skills array to create skill cards */}
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md"
            >
              {/* Skill icon */}
              <Image
                src={skill.image}
                alt={skill.name}
                width={80}
                height={80}
                className="mb-4 rounded-lg"
              />
              {/* Skill name */}
              <span className="text-center font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
        {/* Note: The "My Projects" button has been removed */}
      </div>
    </section>
  );
};

export default Skills;
