import type React from "react";

const Home: React.FC = () => {
  return (
    // Main container for the home section
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center p-8"
    >
      <div className="space-y-8">
        {/* Main heading (your name) */}
        <h1 className="text-6xl md:text-8xl font-bold mb-4">Adam Hemmings</h1>
        {/* Subheading (your title or tagline) */}
        <p className="text-2xl md:text-3xl max-w-2xl">
          Junior Software Developer | Building with Purpose
        </p>
        {/* Note: The "About Me" button has been removed */}
      </div>
    </section>
  );
};

export default Home;
