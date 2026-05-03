import { supabase } from "../utils/supabase";

const API = "https://projectdrafttwo.onrender.com";

// ─── Core email sender (used by everything below) ───────────────────────────
async function sendEmail(email: string, subject: string, message: string) {
  const res = await fetch(`${API}/send-email`, {       // ✅ fixed: was /payment-email
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, subject, message }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Email failed:", err);
  }
}

// ─── Core notification creator ───────────────────────────────────────────────
async function createNotification(notif: {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
}) {
  const { error } = await supabase.from("notifications").insert(notif);
  if (error) console.error("Notification insert failed:", error.message);
}

// ─── Payment success ─────────────────────────────────────────────────────────
export async function sendPaymentNotification(
  userId: string,
  olympiadName: string,
  email: string
) {
  const message = `Your payment for "${olympiadName}" has been received. You are now officially registered!`;

  await createNotification({
    id: Date.now().toString(),
    user_id: userId,
    type: "success",
    title: "Payment Successful",
    message,
    read: false,
  });

  await sendEmail(email, "Payment Successful", message);
}

// ─── Olympiad updated (notify all registered students) ───────────────────────
export async function sendOlympiadUpdateNotif(
  olympiad_id: string,
  olympiadName: string,
) {
  // 1. Get registrations
  const { data: registrations, error: regError } = await supabase
    .from("Registrations")
    .select("student_id")
    .eq("olympiad_id", olympiad_id);

  if (regError || !registrations) {
    console.error("Failed to fetch registrations:", regError?.message);
    return;
  }

  // 2. Get student emails
  const studentIds = registrations.map((r) => r.student_id);
  const { data: students, error: studentError } = await supabase
    .from("Students")
    .select("id, email")
    .in("id", studentIds);

  if (studentError || !students) {
    console.error("Failed to fetch students:", studentError?.message);
    return;
  }

  // 3. Notify each student
  const message = `"${olympiadName}" has been updated. Check the latest details.`;

  for (const student of students) {
    if (!student.email) continue;

    await sendEmail(student.email, "Olympiad Updated", message);

    await createNotification({
      id: Date.now().toString(),        // ⚠️ see note below
      user_id: student.id,
      type: "info",
      title: "Olympiad Updated",
      message,
      read: false,
    });
  }
}
