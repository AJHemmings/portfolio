import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, company, message } = req.body;

  // Create a transporter using your email service (e.g., Gmail)
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Replace with your email service
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASSWORD, // Your email password or app password
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: process.env.EMAIL_USER, // Recipient address (can be the same as sender)
    subject: `New message from ${name} (${email})`,
    text: `
      Name: ${name}
      Email: ${email}
      Company: ${company || "Not provided"}
      Message: ${message}
    `,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
}
