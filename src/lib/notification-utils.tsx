import { supabase } from "../utils/supabase";

import emailjs from "@emailjs/browser";

async function sendEmail(email: string, subject: string, message: string, name:string) {
  console.log("to_email value:", email); // ✅ check this
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        to_email: email,
        subject,
        message,
        to_name: name,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
  } catch (err) {
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
export async function sendPaymentNotification(name_ : string,
  userId: string,
  olympiadName: string,
  email: string
) {
  const message = `Та "${olympiadName}" олимпиадад амжилттай бүртгүүллээ. Төлбөрөө баталгаажуулсан тул олимпиадын дэлгэрэнгүй мэдээллийг шалгаарай. Амжилт хүсье!`;

  await createNotification({
    id: Date.now().toString(),
    user_id: userId,
    type: "success",
    title: "Төлбөр амжилттай",
    message,
    read: false,
  });

  await sendEmail(email, "Төлбөр амжилттай", message,  name_);
}
export async function sendPassEmail(email: string, name:string, newPass: string) {
  const message = `Таны нууц үг амжилттай солигдлоо. Шинэ нууц үг: ${newPass}`;
  
  await sendEmail(email, "Password Reset", message, name);
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
    .select("id, name, email")
    .in("id", studentIds);

  if (studentError || !students) {
    console.error("Failed to fetch students:", studentError?.message);
    return;
  }

  // 3. Notify each student
  const message = `"${olympiadName}" has been updated. Check the latest details.`;

  for (const student of students) {
    if (!student.email) continue;

    await sendEmail(student.email, "Olympiad Updated", message, student.name);

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
