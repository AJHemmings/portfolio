import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const images = [
  { src: "/profile-v2.jpg", alt: "Image 1" },
  { src: "/Yuna in bed_1697207304640.jpg", alt: "Image 3" },
  { src: "/singing.jpg", alt: "Image 2" },
  { src: "/me.jpg", alt: "Image 4" },
];

const Slideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="relative w-64 h-64">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={300}
            height={300}
            className="rounded-full object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};

const About: React.FC = () => {
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const aboutRef = useRef<HTMLElement>(null);

  const paragraphs = [
    {
      text: (
        <>
          Hello! I'm a junior full-stack developer passionate about creating{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            meaningful digital experiences
          </span>
          . With a background in both technology and mindfulness, I bring a
          unique perspective to every project I undertake. My journey into
          software development began with a deep curiosity about how technology
          can <span className="font-medium">enhance our daily lives</span> and a
          passion for purposeful problem-solving.
        </>
      ),
    },
    {
      text: (
        <>
          My diverse experience in{" "}
          <span className="font-medium">
            Customer Service, Telecom Network Engineering, and Computer Aided
            Design
          </span>{" "}
          has equipped me with strong analytical thinking and rapid
          adaptability skills I now apply to building{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            impactful software solutions
          </span>
          . Through intensive training at the School of Code bootcamp, I've
          developed professional-grade skills in{" "}
          <span className="font-medium">
            JavaScript, TypeScript, React, databases, DevOps, and UI/UX
            principles
          </span>
          .
        </>
      ),
    },
    {
      text: (
        <>
          I thrive in{" "}
          <span className="font-medium">Agile, collaborative environments</span>{" "}
          where I can contribute my full-stack capabilities while continuing to
          grow. What sets me apart is my ability to{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            quickly adapt
          </span>
          —whether mastering new technologies or solving multidimensional
          problems by combining structured learning frameworks with creative
          execution.
        </>
      ),
    },
    {
      text: (
        <>
          When I'm not coding, you can find me exploring nature trails with Yuna
          (my dog), cultivating mushrooms, playing with my band "Dam Anna", or feeding my endless
          curiosity about how things work.
        </>
      ),
      isPersonal: true,
    },
  ];

  const nextParagraph = () => {
    setCurrentParagraph((prev) => (prev + 1) % paragraphs.length);
  };

  const prevParagraph = () => {
    setCurrentParagraph(
      (prev) => (prev - 1 + paragraphs.length) % paragraphs.length
    );
  };

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (!aboutRef.current) return;

      const aboutSection = aboutRef.current;
      const rect = aboutSection.getBoundingClientRect();
      const isInView =
        rect.top <= window.innerHeight * 0.3 &&
        rect.bottom >= window.innerHeight * 0.7;

      // Only intercept scroll when the about section is prominently in view
      if (isInView) {
        // Check if we're at the beginning and scrolling up, or at the end and scrolling down
        const isAtStart = currentParagraph === 0;
        const isAtEnd = currentParagraph === paragraphs.length - 1;

        if ((isAtStart && e.deltaY < 0) || (isAtEnd && e.deltaY > 0)) {
          // Allow normal page scrolling when at boundaries
          setIsScrollLocked(false);
          return;
        }

        // Prevent default scrolling and handle paragraph navigation
        e.preventDefault();
        setIsScrollLocked(true);

        // Clear existing timeout
        clearTimeout(scrollTimeout);

        // Debounce scroll events to prevent rapid firing
        scrollTimeout = setTimeout(() => {
          if (e.deltaY > 0) {
            nextParagraph();
          } else {
            prevParagraph();
          }
        }, 100);
      } else {
        setIsScrollLocked(false);
      }
    };

    // Intersection Observer to detect when About section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setIsScrollLocked(false);
            setCurrentParagraph(0); // Reset to first paragraph when leaving
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    // Add wheel listener to window
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      observer.disconnect();
      clearTimeout(scrollTimeout);
    };
  }, [currentParagraph]);

  return (
    // Main container for the about section
    <section
      ref={aboutRef}
      id="about"
      className="min-h-screen py-20 flex items-center relative"
    >
      {/* Scroll lock indicator */}
      {isScrollLocked && (
        <div className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium opacity-75">
          About Navigation Active
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Section title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center animate-fade-in">
          About Me
        </h2>
        {/* Flex container for image and text */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12 animate-fade-in-up">
          {/* Replace the static Image with the Slideshow component */}
          <div className="transform transition-transform duration-300 hover:scale-105">
            <Slideshow />
          </div>
          {/* Text content with navigation */}
          <div className="max-w-2xl relative">
            {/* Invisible card container */}
            <div className="relative h-80 overflow-hidden">
              {/* Navigation arrows */}
              <button
                onClick={prevParagraph}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-gray-200 dark:border-gray-600"
                aria-label="Previous paragraph"
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextParagraph}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-gray-200 dark:border-gray-600"
                aria-label="Next paragraph"
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Paragraph content */}
              <div className="relative w-full h-full flex items-center">
                <p
                  className={`text-lg leading-relaxed transition-all duration-500 transform ${
                    paragraphs[currentParagraph].isPersonal
                      ? "text-gray-700 dark:text-gray-300 italic"
                      : ""
                  } opacity-100 translate-x-0`}
                >
                  {paragraphs[currentParagraph].text}
                </p>
              </div>
            </div>

            {/* Paragraph indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {paragraphs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentParagraph(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentParagraph
                      ? "bg-blue-600 dark:bg-blue-400 w-6"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                  aria-label={`Go to paragraph ${index + 1}`}
                />
              ))}
            </div>

            {/* Dynamic scroll hint */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              {isScrollLocked
                ? "Continue scrolling to navigate paragraphs"
                : "Scroll here to explore my story"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
