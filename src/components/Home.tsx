import { useState, useEffect } from "react";

const NAME = "Adam Hemmings";
const TAGLINE = "Building with purpose.";

type Phase = "typing-name" | "pause" | "typing-tagline" | "done";

const Home = () => {
  const [displayedName, setDisplayedName] = useState("");
  const [displayedTagline, setDisplayedTagline] = useState("");
  const [phase, setPhase] = useState<Phase>("typing-name");
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    if (phase !== "typing-name") return;
    if (displayedName.length >= NAME.length) {
      const t = setTimeout(() => setPhase("pause"), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setDisplayedName(NAME.slice(0, displayedName.length + 1)),
      75,
    );
    return () => clearTimeout(t);
  }, [phase, displayedName]);

  useEffect(() => {
    if (phase !== "pause") return;
    const t = setTimeout(() => setPhase("typing-tagline"), 600);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "typing-tagline") return;
    if (displayedTagline.length >= TAGLINE.length) {
      const t = setTimeout(() => setPhase("done"), 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setDisplayedTagline(TAGLINE.slice(0, displayedTagline.length + 1)),
      55,
    );
    return () => clearTimeout(t);
  }, [phase, displayedTagline]);

  useEffect(() => {
    if (phase === "done") {
      setCursorOn(false);
      return;
    }
    const interval = setInterval(() => setCursorOn((v) => !v), 520);
    return () => clearInterval(interval);
  }, [phase]);

  const showNameCursor =
    (phase === "typing-name" || phase === "pause") && cursorOn;
  const showTaglineCursor = phase === "typing-tagline" && cursorOn;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center text-center px-6"
    >
      <div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight">
          {displayedName}
          {showNameCursor && (
            <span aria-hidden="true" className="ml-0.5 opacity-60">
              |
            </span>
          )}
        </h1>
        <p
          className="mt-4 text-xs md:text-sm tracking-[0.25em] uppercase text-gray-400 dark:text-gray-500"
          style={{ minHeight: "1.5em" }}
        >
          {displayedTagline}
          {showTaglineCursor && (
            <span aria-hidden="true" className="ml-0.5 opacity-60">
              |
            </span>
          )}
        </p>
      </div>
    </section>
  );
};

export default Home;
