"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Interface for project data structure
interface Project {
  id: number;
  title: string;
  description: string;
  skills: string[];
  image: string;
  currentState: string;
  featuresInDevelopment: string[];
  plannedFeatures: string[];
  repoLink: string;
  deployedLink: string;
}

// Array of project data
const projects: Project[] = [
  {
    id: 1,
    title: "Mega OX",
    description:
      "Mega OX is a full-stack online twist on naughts and crosses, featuring a macro board and 9 micro boards. Each player’s move is strategically determined by the opponent’s previous turn, adding a thrilling layer of complexity.",
    skills: ["React", "Node.js", "JavaScript", "OOP"],
    image: "/megaoxpic1.png",
    currentState: "Early alpha - Game is being transitioned to OOP",
    featuresInDevelopment: [
      "Initialization of multiple game boards",
      "Win condition for multiple boards",
    ],
    plannedFeatures: [
      "User Profiles",
      "Customization options",
      "Network play",
      "Leaderboards",
    ],
    repoLink: "https://github.com/AJHemmings/MEGA-OX",
    deployedLink: "https://mega-2s2ptn1dy-adams-projects-ff804fb2.vercel.app/",
  },
  {
    id: 2,
    title: "Recipe Book Web App",
    description:
      "Recipe Book Web App – A React-based project leveraging a JSON server for efficient development, enabling students to find and create budget-friendly meals. Demonstrates proficiency in React, JSON, and full-stack development for practical, real-world solutions.",
    skills: ["React", "JSON", "JavaScript", "Node.js"],
    image: "/react app web app.png",
    currentState:
      "Beta - Deployed but no back-end. To add new recipes requires local hosting with JSON server to populate the db.json.",
    featuresInDevelopment: ["Back-end database", "Form input formatting"],
    plannedFeatures: [
      "Styling",
      "Favorites",
      "Randomizer",
      "On-click shopping list creation",
    ],
    repoLink: "https://github.com/AJHemmings/Reciepe-book-web-app/tree/main",
    deployedLink: "https://reciepe-book-web-app-phi.vercel.app/",
  },
  {
    id: 3,
    title: "SoC Legacy App",
    description:
      "The SOC Legacy App unites developers of all levels, fostering mentorship, collaboration, and resource sharing. Continuing the spirit of The School of Code, it empowers individuals to shape the future of tech together.",
    skills: ["React", "TypeScript", "Next.js", "TailWind"],
    image: "/soclegacy.png",
    currentState:
      "Alpha - basic user profile creation and editing. Issue with legacy deps. Not deployed.",
    featuresInDevelopment: [
      "Dependency updates",
      "Containerization",
      "Deployment",
    ],
    plannedFeatures: [
      "User matching logic",
      "Notifications",
      "Private messaging",
      "Learning materials",
      "Calendar linking",
    ],
    repoLink: "https://github.com/yourusername/fitness-tracker",
    deployedLink: "",
  },
  {
    id: 4,
    title: "Learning Material Content",
    description:
      "JavaScript OOP Learning Material – A concise guide showcasing advanced Object-Oriented Programming concepts, designed to demonstrate clear articulation and deep understanding of JavaScript’s powerful OOP capabilities.",
    skills: ["JavaScript", "OOP", "Content Creation", "Canva", "YouTube"],
    image: "/oop in js.png",
    currentState: "Released",
    featuresInDevelopment: ["New concept ideas", "Video editing"],
    plannedFeatures: ["More topics/concepts", "Move to Scrimba"],
    repoLink:
      "https://www.canva.com/design/DAGfo7sA0rE/r0849jAvieA1ryT9jX40oQ/edit?utm_content=DAGfo7sA0rE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    deployedLink: "https://youtu.be/89kiLc8i-B0",
  },
];

// Project cards
const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({
  project,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 w-96 h-[500px] flex flex-col"
    >
      {/* Project image */}
      <div className="w-full h-48 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Project content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Project title */}
        <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
        {/* Project description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
          {project.description}
        </p>
        {/* Project skills */}
        <div className="flex flex-wrap gap-2">
          {project.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ProjectModal component
const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({
  project,
  onClose,
}) => {
  return (
    // Modal overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-y-auto max-h-full w-full max-w-4xl">
        <div className="p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="float-right text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          {/* Project title */}
          <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
          {/* Project images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-lg"
            />
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          {/* Project details */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Current State</h3>
            <p>{project.currentState}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">
              Features in Development
            </h3>
            <ul className="list-disc list-inside">
              {project.featuresInDevelopment.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Planned Features</h3>
            <ul className="list-disc list-inside">
              {project.plannedFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          {/* Project links */}
          <div className="flex justify-between">
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              GitHub Repo
            </a>
            <a
              href={project.deployedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Projects component
const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Add horizontal scroll on mouse wheel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY !== 0) {
        // Check if the container has reached the start or end
        const isAtStart = container.scrollLeft === 0;
        const isAtEnd =
          container.scrollLeft + container.clientWidth >= container.scrollWidth;

        // If at the start and scrolling up, allow vertical scroll
        if (isAtStart && event.deltaY < 0) {
          return; // Let the default vertical scroll behavior handle it
        }

        // If at the end and scrolling down, allow vertical scroll
        if (isAtEnd && event.deltaY > 0) {
          return; // Let the default vertical scroll behavior handle it
        }

        // Otherwise, scroll horizontally
        event.preventDefault();
        container.scrollBy({
          left: event.deltaY < 0 ? -100 : 100, // Adjust scroll speed
          behavior: "smooth", // Smooth scrolling
        });
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <section id="projects" className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Projects
        </h2>
        {/* Horizontal scroll container */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto pb-4 scrollbar-hide" // Add scrollbar-hide to hide the scrollbar
        >
          {/* Flex container for project cards */}
          <div className="flex space-x-8">
            {projects.map((project) => (
              <div key={project.id} className="flex-shrink-0">
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Note: The "Contact Me" button has been removed */}
      </div>
      {/* Render ProjectModal when a project is selected */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
