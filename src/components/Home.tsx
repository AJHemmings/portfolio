import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const titles = [
    "Dog Dad",
    "Developer",
    "Systems Thinker",
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center p-8">
      <div className="space-y-8">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          Adam Hemmings
        </h1>

        <div className="text-2xl md:text-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTitleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-10 flex items-center justify-center"
            >
              {titles[currentTitleIndex]}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {currentTitleIndex !== 0 && (
              <motion.p
                key="purpose"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                Building with Purpose
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Home;
