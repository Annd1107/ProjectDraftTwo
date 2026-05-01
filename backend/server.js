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
  const { email, subject, message } = req.body;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Temtseen <onboarding@resend.dev>",
        to: [email],
        subject,
        text: message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json(data);
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
