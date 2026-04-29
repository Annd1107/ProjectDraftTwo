export async function sendEmail(email: string, subject: string, message: string) {
  await fetch("http://localhost:3001/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      subject,
      message,
    }),
  });
}