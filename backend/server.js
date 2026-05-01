import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";



dotenv.config();
const app = express();

app.use(cors()); // ✅ THIS FIXES YOUR ERROR
app.use(express.json());

app.options("*", cors()); // ✅ preflight fix
const PORT = process.env.PORT || 5000;

app.post("/notify-email", async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // MUST be true
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
await transporter.verify();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
