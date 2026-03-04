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
    title: "Inbox Buster",
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
    versionHistory: {
      label: "",
      url: "",
    },
    repoLink: "https://github.com/AJHemmings/inbox-buster",
    deployedLink: "https://inbox-buster-landing.vercel.app",
  },
  {
    id: 2,
    title: "Novari",
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
    image: "/novari home.png",
    imageOne: "/novari-community.png",
    imageTwo: "/user-profile.png",
    imageThree: "/novari home.png",
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
    title: "Dam Anna (band website)",
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
    image: "/dam-anna-logo.jpg",
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
    versionHistory: {
      label: "",
      url: "",
    },
    repoLink: "https://github.com/AJHemmings/dam-anna-web",
    deployedLink: "https://www.damannaband.com/",
  },
  {
    id: 4,
    title: "Mega OX",
    description:
      "A modern twist on the classic Naughts and Crosses (Tic-Tac-Toe) game. The game features a macro board with 9 micro boards in each cell, creating a layered and strategic gameplay experience.",
    skills: ["TypeScript", "OOP", "React", "Docker", "CI/CD"],
    image: "/megaox1.png",
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
    title: "Learning Material Content",
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
    <div
      onClick={onClick}
      className="group bg-white/90 dark:bg-gray-900/70 rounded-2xl border border-black/5 dark:border-white/10 shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full"
    >
      {/* Project image */}
      <div className="w-full h-40 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={400}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
    </div>
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

  const modalImages = [project.imageOne, project.imageTwo].map(
    (image) => image || project.image || "/placeholder.svg",
  );
  // To enable images 3/4 later, add them to modalImages here.

  return createPortal(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] w-full max-w-5xl">
        <div className="p-6">
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

          <h2 className="text-center text-3xl font-bold mb-6">
            {project.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {modalImages.map((image, index) => (
              <Image
                key={`${project.title}-${index}`}
                src={image}
                alt={`${project.title} ${index + 1}`}
                width={520}
                height={360}
                className="w-full h-56 object-cover rounded-xl"
                onClick={() => onImageClick(image)}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Current State</h3>
                <p>{project.currentState}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Features in Development
                </h3>
                <ul className="list-disc list-inside">
                  {project.featuresInDevelopment.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Planned Features</h3>
                <ul className="list-disc list-inside">
                  {project.plannedFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Known Bugs</h3>
                <p className="text-red-500">{project.knownBugs}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Version History</h3>
                {project.versionHistory ? (
                  <a
                    href={project.versionHistory.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {project.versionHistory.label}
                  </a>
                ) : (
                  <span className="text-yellow-600">
                    Work in Progress (WIP)
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-4">
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Repo Link
            </a>
            <a
              href={project.deployedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Deployed Link
            </a>
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
  useEffect(() => {
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
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden max-h-full w-full max-w-4xl">
        <div className="p-6">
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
          <Image
            src={image}
            alt="Selected Image"
            width={800}
            height={600}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
