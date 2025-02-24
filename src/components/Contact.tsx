"use client"; // Required for client-side interactivity

import { useState, ChangeEvent, useEffect } from "react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Clear error when form data changes
  useEffect(() => {
    if (error && (formData.name || formData.email || formData.message)) {
      setError("");
    }
  }, [formData, error]);

  // Clear success message when form data changes
  useEffect(() => {
    if (isSuccess && (formData.name || formData.email || formData.message)) {
      setIsSuccess(false);
    }
  }, [formData, isSuccess]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Send email using EmailJS
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      setIsSuccess(true);
      setFormData({ name: "", email: "", company: "", message: "" }); // Reset form
    } catch (err) {
      console.error("Error sending message:", err); // Log the error
      setError(
        "An error occurred while sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    // Main container for the contact section
    <section
      id="contact"
      className="min-h-screen py-20 bg-gray-100 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        {/* Section title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Let's Connect
        </h2>
        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md"
        >
          {/* Name input field */}
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-lg">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-600"
              required
            />
          </div>
          {/* Email input field */}
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-600"
              required
            />
          </div>
          {/* Company input field (optional) */}
          <div className="mb-6">
            <label htmlFor="company" className="block mb-2 text-lg">
              Company (optional)
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
          {/* Message textarea */}
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 text-lg">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-600"
              required
            ></textarea>
          </div>
          {/* Error message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {/* Success message */}
          {isSuccess && (
            <p className="text-green-500 mb-4">
              Your message has been sent successfully!
            </p>
          )}
          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 dark:bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
        {/* Back to Top button */}
        <div className="text-center mt-12">
          <button
            onClick={scrollToTop}
            className="inline-block bg-blue-500 dark:bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors shadow-md"
          >
            Back to Top
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
