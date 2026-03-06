"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

// Interface for project data structure
export interface Project {
  id: number;
  title: string;
  description: string;
  skills: string[];
  image: string;
  imageOne: string;
  imageTwo: string;
  imageThree?: string;
  imageFour?: string;
  currentState: string;
  featuresInDevelopment: string[];
  plannedFeatures: string[];
  knownBugs: string;
  versionHistory: {
    label: string;
    url: string;
  } | null;
  repoLink: string;
  deployedLink: string;
}

// Array of project data
export const projects: Project[] = [
  {
    id: 1,
    title: "Inbox Buster - Mobile and desktop email management tool",
    description:
      "Inbox Buster is a productivity tool designed to help users manage their email inbox more efficiently.",
    skills: [
      "Agentic AI",
      "Claude AI",
      "Claude Skills",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind-CSS",
      "AirTable",
      "Vercel",
      "CI/CD",
    ],
    image: "/inbox-banner.jpg",
    imageOne: "/eclean-cat-mail.jpg",
    imageTwo: "/eclean-done.jpg",
    imageThree: "/eclean-unsub.jpg",
    imageFour: "/eclean-slect-email.jpg",
    currentState:
      "In developement : Please join the wait list for updates and early access - https://inbox-buster-landing.vercel.app ",
    featuresInDevelopment: ["iOS compatibility", "Email provider integrations"],
    plannedFeatures: [
      "Interactive dashboards and analytics",
      "Profile Customization options",
    ],
    knownBugs: "N/A",
    versionHistory: null,
    repoLink: "https://github.com/AJHemmings/inbox-buster",
    deployedLink: "https://inbox-buster-landing.vercel.app",
  },
  {
    id: 2,
    title: "Novari - Personal Growth Platform",
    description:
      "Novari is a platform designed to make personal growth accessible, interactive and community-driven.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "DevOps",
      "Tailwind-CSS",
      "SQL",
      "Supabase",
      "Vercel",
      "CI/CD",
    ],
    image: "/novari.jpg",
    imageOne: "/novari-community.png",
    imageTwo: "/user-profile.png",
    imageThree: "/novari-home.png",
    imageFour: "/novari-community.png",
    currentState:
      "In developement : please sign up OR sign in with email - guest@demo.com | password - demopassword1234 ",
    featuresInDevelopment: ["Direct Messaging", "Gamification enhancements"],
    plannedFeatures: [
      "Interactive dashboards and analytics",
      "RAG - Vector database",
      "Profile Customization options",
      "More ember task options",
    ],
    knownBugs: "N/A",
    versionHistory: {
      label: "V 1.0.0 - View Changelog",
      url: "https://docs.google.com/document/d/175JyxLvE5dpMrBYZSmhykMk8NyXi1GH_7bxAqh49mQs/edit?usp=sharing",
    },
    repoLink: "https://github.com/AJHemmings/Novari",
    deployedLink:
      "https://novari-git-main-adams-projects-ff804fb2.vercel.app/auth/signin",
  },
  {
    id: 3,
    title: "Dam Anna - Band Website",
    description:
      "A website for the band Dam Anna. 3D guitar model imported from blender and animated with Three.js. Admin dashboard designed for non technical band mates to contribute and change content. User photo-submissions go to admin review panel. Optimized for mobile devices and desktop.",
    skills: [
      "React",
      "Three.js",
      "JavaScript",
      "Node.js",
      "Vite",
      "TailwindCSS",
      "PostgreSQL",
      "Vercel",
      "Supabase",
      "Blender",
    ],
    image: "/dam.jpg",
    imageOne: "/dam-anna-logo2.jpg",
    imageTwo: "/damannadash.jpg",
    imageThree: "/dam-anna-logo.jpg",
    imageFour: "/dam-anna-logo2.jpg",
    currentState: "Release: 1.0",
    featuresInDevelopment: ["Mobile Optimization for the admin dashboard"],
    plannedFeatures: [
      "Styling",
      "Social Media Management Intergration",
      "Mailing List",
      "Social Media AI automation",
    ],
    knownBugs: "Minor UI jolt when opening and closing About Us Modal",
    versionHistory: null,
    repoLink: "https://github.com/AJHemmings/dam-anna-web",
    deployedLink: "https://www.damannaband.com/",
  },
  {
    id: 4,
    title: "Mega OX - Online Multiplayer Naughts and Crosses (Tic-Tac-Toe)",
    description:
      "A modern twist on the classic Naughts and Crosses (Tic-Tac-Toe) game. The game features a macro board with 9 micro boards in each cell, creating a layered and strategic gameplay experience.",
    skills: ["TypeScript", "OOP", "React", "Docker", "CI/CD"],
    image: "/megaox.jpg",
    imageOne: "/megaox2.png",
    imageTwo: "/megaox3.png",
    imageThree: "/megaox1.png",
    imageFour: "/megaox2.png",
    currentState: "In Development V 1.3.3",
    featuresInDevelopment: [
      "User Profiles",
      "Network Play",
      "UI/UX Enhancements",
    ],
    plannedFeatures: [
      "Ladders",
      "Profile Customization",
      "Communication",
      "Friends List",
    ],
    knownBugs: "N/A",
    versionHistory: {
      label: "V 1.3.3 - View Changelog",
      url: "https://docs.google.com/document/d/1ItdRho5sCXa5rDfcBwENUHvwSCQrPYe-gKicPalCIdM/edit?usp=sharing",
    },
    repoLink: "https://github.com/AJHemmings/MEGA-OX",
    deployedLink: "https://mega-ox.vercel.app/",
  },
  {
    id: 5,
    title: "Learning Material Content - JavaScript OOP Concepts",
    description:
      "JavaScript OOP Learning Material – A concise guide showcasing advanced Object-Oriented Programming concepts, designed to demonstrate clear articulation and deep understanding of JavaScript’s powerful OOP capabilities.",
    skills: [
      "JavaScript",
      "OOP",
      "Content Creation",
      "Canva",
      "Adobe Premier Pro",
      "YouTube",
    ],
    image: "/oop in js.png",
    imageOne: "/oop-ceo.png",
    imageTwo: "/oop-in-js-1.png",
    imageThree: "/oop in js.png",
    imageFour: "/oop-ceo.png",
    currentState: "Released",
    featuresInDevelopment: ["New concept ideas", "Video editing"],
    plannedFeatures: ["More topics/concepts", "Move to Scrimba"],
    knownBugs: "N/A",
    versionHistory: null,
    repoLink:
      "https://www.canva.com/design/DAGfo7sA0rE/r0849jAvieA1ryT9jX40oQ/edit?utm_content=DAGfo7sA0rE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    deployedLink: "https://youtu.be/89kiLc8i-B0",
  },

  // {
  //   id: 5,
  //   title: "Personal Movie Recommendations",
  //   description:
  //     "A personal recommendation app that gives you vector based similarity searches based on user input from a movie database using Pinecone AI.",
  //   skills: ["React", "Node.js", "JavaScript"],
  //   image: "/movie1.png",
  //   imageOne: "/movie1.png",
  //   imageTwo: "/movie2.png",
  //   currentState: "Dev - Under development",
  //   featuresInDevelopment: ["User signup", "User Profiles"],
  //   plannedFeatures: [
  //     "User lists - watched - watching - waiting",
  //     "Customization options",
  //     "Movie thumbnails",
  //     "Comment sections",
  //   ],
  //   knownBugs:
  //     "Database is currently offline | CSS scrolling on sides refreshes every time a character is typed on the keyboard",
  //   versionHistory: null,
  //   repoLink: "https://github.com/AJHemmings/Movie-Recommendation-Library",
  //   deployedLink: "https://movie-recommendation-library.vercel.app/",
  // },
];

// Project cards
const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({
  project,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group bg-white/90 dark:bg-gray-900/70 rounded-2xl border border-black/5 dark:border-white/10 shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full w-full text-left"
    >
      {/* Project image */}
      <div className="relative w-full h-52 overflow-hidden">
        {/* Blurred background layer */}
        <div
          aria-hidden="true"
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${project.image || "/placeholder.svg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(12px) brightness(0.5)",
          }}
        />
        {/* Foreground image — contained, no cropping */}
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      {/* Project content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Project title */}
        <h3 className="text-xl font-semibold mb-2 tracking-tight">
          {project.title}
        </h3>
        {/* Project description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {project.description}
        </p>
        {/* Project skills */}
        <div className="flex flex-wrap gap-2">
          {project.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-full text-xs uppercase tracking-wide cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/15 dark:hover:bg-white/25 hover:text-black dark:hover:text-white hover:shadow-md"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
};

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onImageClick: (image: string) => void;
}

// ProjectModal component
const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onImageClick,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(
    project.imageOne || project.image || "/placeholder.svg",
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousModalFlag = document.body.dataset.modalOpen;

    document.body.dataset.modalOpen = "true";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      if (previousModalFlag === undefined) {
        delete document.body.dataset.modalOpen;
      } else {
        document.body.dataset.modalOpen = previousModalFlag;
      }
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  const allImages = [
    project.imageOne,
    project.imageTwo,
    project.imageThree,
    project.imageFour,
  ].filter((img): img is string => Boolean(img));

  return createPortal(
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Split panel body */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* LEFT: Image gallery */}
          <div className="md:w-1/2 flex flex-col gap-3 p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 flex-shrink-0 max-h-64 md:max-h-none">
            {/* Featured image */}
            <button
              type="button"
              aria-label={`Open full-size image for ${project.title}`}
              className="relative w-full bg-gray-950 rounded-xl overflow-hidden cursor-pointer"
              style={{ aspectRatio: "4/3" }}
              onClick={() => onImageClick(featuredImage)}
            >
              <Image
                src={featuredImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </button>

            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setFeaturedImage(img)}
                    aria-label={`View image ${i + 1} of ${project.title}`}
                    aria-pressed={featuredImage === img}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      featuredImage === img
                        ? "border-blue-500 opacity-100"
                        : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} ${i + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Project info */}
          <div className="md:w-1/2 overflow-y-auto p-6 flex flex-col gap-5 min-h-0">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {project.description}
            </p>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                Current State
              </h3>
              <p className="text-sm">{project.currentState}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                Features in Development
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {project.featuresInDevelopment.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                Planned Features
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {project.plannedFeatures.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                Known Bugs
              </h3>
              <p className="text-sm text-red-500">{project.knownBugs}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                Version History
              </h3>
              {project.versionHistory?.url ? (
                <a
                  href={project.versionHistory.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  {project.versionHistory.label || "View Changelog"}
                </a>
              ) : (
                <span className="text-sm text-yellow-600">
                  Work in Progress (WIP)
                </span>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-full text-xs uppercase tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-3 mt-auto pt-2">
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-sm font-medium px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                View Repo
              </a>
              <a
                href={project.deployedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-sm font-medium px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

// Main Projects component
const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="projects" className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
          Projects
        </h2>
        {/* Grid layout for project cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
        {/* Note: The "Contact Me" button has been removed */}
      </div>
      {/* Render ProjectModal when a project is selected */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onImageClick={(image) => setSelectedImage(image)}
        />
      )}
      {/* Render ImageModal when an image is selected */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
};

const ImageModal: React.FC<{ image: string; onClose: () => void }> = ({
  image,
  onClose,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousModalFlag = document.body.dataset.modalOpen;

    document.body.dataset.modalOpen = "true";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      if (previousModalFlag === undefined) {
        delete document.body.dataset.modalOpen;
      } else {
        document.body.dataset.modalOpen = previousModalFlag;
      }
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <button
            onClick={onClose}
            aria-label="Close image"
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
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
          <Image
            src={image}
            alt="Selected Image"
            width={800}
            height={600}
            className="max-h-[75vh] w-auto max-w-full mx-auto block object-contain rounded-lg"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Projects;
