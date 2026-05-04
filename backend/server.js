import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY); // no VITE_ prefix, server-side

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ error: "email, subject, and message are required" });
  }

  try {
    await resend.emails.send({
      from: "Temtseen Portal <onboarding@resend.dev>",
      to: email,
      subject,
      text: message,
    });

    res.json({ success: true });
  } catch (err: any) {
    console.error("Mail error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port", process.env.PORT || 5000);
});
