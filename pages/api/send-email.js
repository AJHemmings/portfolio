import emailjs from "@emailjs/browser";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, company, message } = req.body;

  try {
    // Replace with your EmailJS service ID, template ID, and user ID
    const serviceId = "service_qjxgcgn";
    const templateId = "template_j77hjvg";
    const userId = "S8op53qNaBKTEKzlG";

    const templateParams = {
      from_name: name,
      from_email: email,
      company: company || "Not provided",
      message: message,
    };

    await emailjs.send(serviceId, templateId, templateParams, userId);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
}
