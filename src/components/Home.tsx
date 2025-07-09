import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const titles = [
    "Full Stack Developer",
    "Back-End Developer",
    "Software Engineer",
    "Data Engineer",
    "Systems Thinker",
    "Dog Dad",
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2000); // Change text every 2 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center p-8">
      <div className="space-y-8">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">Adam Hemmings</h1>

        <div className="text-2xl md:text-3xl">
          <p>Junior</p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTitleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }} // Faster animation (0.3s)
              className="h-10 flex items-center justify-center"
            >
              {titles[currentTitleIndex]}
            </motion.div>
          </AnimatePresence>

          <p>Building with Purpose</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
