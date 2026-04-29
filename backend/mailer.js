import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(email, subject, message) {
  return await resend.emails.send({
    from: "Temtseen Portal <onboarding@resend.dev>", // change later
    to: email,
    subject,
    text: message,
  });
}