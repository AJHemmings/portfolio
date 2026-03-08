"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";

const HEADING = "Let's Connect";

type AnimPhase = "idle" | "typing" | "moving-up" | "revealing" | "done";

interface ContactProps {
  isActive?: boolean;
  onBackToTop?: () => void;
}

const Contact: React.FC<ContactProps> = ({ isActive, onBackToTop }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Animation state
  const [animPhase, setAnimPhase] = useState<AnimPhase>("idle");
  const [displayedHeading, setDisplayedHeading] = useState("");
  const [cursorOn, setCursorOn] = useState(true);
  const hasAnimated = useRef(false);

  // Trigger animation once when section becomes active
  useEffect(() => {
    if (isActive && !hasAnimated.current) {
      hasAnimated.current = true;
      setAnimPhase("typing");
    }
  }, [isActive]);

  // Type heading
  useEffect(() => {
    if (animPhase !== "typing") return;
    if (displayedHeading.length >= HEADING.length) {
      const t = setTimeout(() => setAnimPhase("moving-up"), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setDisplayedHeading(HEADING.slice(0, displayedHeading.length + 1)),
      75,
    );
    return () => clearTimeout(t);
  }, [animPhase, displayedHeading]);

  // After heading slides up, reveal form
  useEffect(() => {
    if (animPhase !== "moving-up") return;
    const t = setTimeout(() => setAnimPhase("revealing"), 700);
    return () => clearTimeout(t);
  }, [animPhase]);

  // Mark done
  useEffect(() => {
    if (animPhase !== "revealing") return;
    const t = setTimeout(() => setAnimPhase("done"), 900);
    return () => clearTimeout(t);
  }, [animPhase]);

  // Cursor blink
  useEffect(() => {
    if (animPhase === "moving-up" || animPhase === "revealing" || animPhase === "done") {
      setCursorOn(false);
      return;
    }
    const interval = setInterval(() => setCursorOn((v) => !v), 520);
    return () => clearInterval(interval);
  }, [animPhase]);

  const isCentered = animPhase === "idle" || animPhase === "typing";
  const formVisible = animPhase === "revealing" || animPhase === "done";

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (error && (formData.name || formData.email || formData.message)) setError("");
  }, [formData, error]);

  useEffect(() => {
    if (isSuccess && (formData.name || formData.email || formData.message)) setIsSuccess(false);
  }, [formData, isSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill out all required fields.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to send message.");
      setIsSuccess(true);
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      setError("An error occurred while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen py-20">
      <div className="container mx-auto px-4">

        {/* Heading — centred during typing, slides to top after */}
        <h2
          className="font-display text-4xl md:text-5xl tracking-tight mb-12 text-center transition-transform duration-700 ease-in-out"
          style={{
            transform: isCentered ? "translateY(calc(45vh - 6rem))" : "translateY(0)",
          }}
        >
          {animPhase === "idle" ? "\u00A0" : displayedHeading}
          {cursorOn && animPhase === "typing" && (
            <span aria-hidden="true" className="ml-0.5 opacity-60">|</span>
          )}
        </h2>

        {/* Form — unblurs into existence */}
        <div
          style={
            formVisible
              ? { animation: "unblur 0.9s cubic-bezier(0.22, 1, 0.36, 1) both" }
              : { opacity: 0 }
          }
        >
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white/80 dark:bg-white/5 backdrop-blur border border-black/5 dark:border-white/10 p-8 rounded-2xl shadow-xl"
          >
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="company" className="block mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                Company <span className="text-xs normal-case opacity-50">(optional)</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors resize-none"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {isSuccess && (
              <p className="text-green-500 text-sm mb-4">Your message has been sent successfully!</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-6 py-3 rounded-lg text-sm font-medium uppercase tracking-wide transition-colors"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="text-center mt-10">
            <button
              onClick={() => onBackToTop?.()}
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Top
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
