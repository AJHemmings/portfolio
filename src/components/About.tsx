import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const images = [
  { src: "/profile-v2.jpg", alt: "Image 1" },
  { src: "/Yuna in bed_1697207304640.jpg", alt: "Image 3" },
  { src: "/singing.jpg", alt: "Image 2" },
  { src: "/me.jpg", alt: "Image 4" },
];

interface SlideshowProps {
  className?: string;
  shape?: string;
}

const Slideshow: React.FC<SlideshowProps> = ({
  className = "",
  shape = "rounded-[28px]",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`absolute inset-0 h-full w-full ${className}`}>
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
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 360px, 300px"
            className={`${shape} object-cover`}
          />
        </div>
      ))}
    </div>
  );
};

interface AboutProps {
  isActive: boolean;
  onLockChange?: (isLocked: boolean) => void;
  onNavStateChange?: (state: { atStart: boolean; atEnd: boolean }) => void;
}

const About: React.FC<AboutProps> = ({
  isActive,
  onLockChange,
  onNavStateChange,
}) => {
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const lastWheelTimeRef = useRef(0);
  const activationTimeRef = useRef(0);

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
          has equipped me with strong analytical thinking and rapid adaptability
          skills I now apply to building{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            impactful software solutions
          </span>
          . Through intensive training at the School of Code bootcamp, I've
          developed professional-grade skills in{" "}
          <span className="font-medium">
            JavaScript, Python, React, databases, DevOps, and UI/UX principles
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
          . Whether mastering new technologies or solving multidimensional
          problems by combining structured learning frameworks with creative
          execution.
        </>
      ),
    },
    {
      text: (
        <>
          When I'm not coding, you can find me exploring nature trails with Yuna
          (my dog), cultivating mushrooms, playing with my band "Dam Anna", or
          feeding my endless curiosity about how things work.
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
      (prev) => (prev - 1 + paragraphs.length) % paragraphs.length,
    );
  };

  useEffect(() => {
    const isAtStart = currentParagraph === 0;
    const isAtEnd = currentParagraph === paragraphs.length - 1;
    const shouldLock = isActive && !(isAtStart || isAtEnd);
    onLockChange?.(shouldLock);
    onNavStateChange?.({ atStart: isAtStart, atEnd: isAtEnd });
  }, [
    currentParagraph,
    isActive,
    onLockChange,
    onNavStateChange,
    paragraphs.length,
  ]);

  useEffect(() => {
    if (isActive) {
      activationTimeRef.current = Date.now();
    }
  }, [isActive]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!isActive) return;

      const isAtStart = currentParagraph === 0;
      const isAtEnd = currentParagraph === paragraphs.length - 1;

      const dominantDelta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      if (dominantDelta === 0) return;

      if (Date.now() - activationTimeRef.current < 400) return;

      if (dominantDelta > 0 && isAtEnd) return;
      if (dominantDelta < 0 && isAtStart) return;

      event.preventDefault();

      const now = Date.now();
      if (now - lastWheelTimeRef.current < 500) {
        return;
      }
      lastWheelTimeRef.current = now;

      if (dominantDelta > 0 && !isAtEnd) {
        nextParagraph();
        return;
      }

      if (dominantDelta < 0 && !isAtStart) {
        prevParagraph();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentParagraph, isActive, paragraphs.length]);

  return (
    <section
      id="about"
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
    >
      <div className="relative container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] items-center">
          <div className="relative">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[28px] border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-2xl backdrop-blur overflow-hidden">
              <Slideshow shape="rounded-[28px]" />
            </div>
          </div>

          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              About
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl tracking-tight">
              About Me
            </h2>

            <div className="mt-8 min-h-[320px] md:min-h-[360px] rounded-2xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-white/5 p-7 md:p-9 shadow-xl backdrop-blur">
              <p
                key={currentParagraph}
                className={`text-lg md:text-xl leading-relaxed animate-fade-in-up ${
                  paragraphs[currentParagraph].isPersonal
                    ? "text-gray-700 dark:text-gray-300 italic"
                    : "text-gray-800/90 dark:text-gray-100/90"
                }`}
              >
                {paragraphs[currentParagraph].text}
              </p>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Scroll on the card to move through the story.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
