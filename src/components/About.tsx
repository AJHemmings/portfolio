import { useState, useEffect } from "react";
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
  return (
    // Main container for the about section
    <section id="about" className="min-h-screen py-20 flex items-center">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          About Me
        </h2>
        {/* Flex container for image and text */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
          {/* Replace the static Image with the Slideshow component */}
          <Slideshow />
          {/* Text content */}
          <div className="max-w-2xl space-y-6">
            {/* Bio paragraphs */}
            <p className="text-lg">
              Hello! I'm a junior software developer passionate about creating
              meaningful digital experiences. With a background in both
              technology and mindfulness, I bring a unique perspective to every
              project I undertake. My journey into software development began
              with a deep curiosity about how technology can enhance our daily
              lives and a passion for problem-solving.
            </p>
            <p className="text-lg">
              With experience in customer service, engineering, and CAD space
              planning, I’ve developed strong analytical thinking and
              adaptability—skills that seamlessly translate into coding. I’m
              currently honing my full-stack development skills, with hands-on
              experience in JavaScript, TypeScript, React, databases, DevOps,
              and UI/UX. I thrive in collaborative environments, enjoy tackling
              complex challenges, and love building projects that make a real
              impact.
            </p>
            <p className="text-lg">
              When I’m not coding, you can find me exploring nature trails with
              Yuna (my dog), learning new things, cultivating mushrooms, or
              playing my guitar.
            </p>
            {/* Note: The "My Skills" button has been removed */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
