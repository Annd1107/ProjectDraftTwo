import { supabase } from "../utils/supabase";

export async function sendPaymentNotification(userId: string, olympiadName: string, email: string) {
  const notif = {
    id: Date.now().toString(),
    user_id: userId,
    type: "success",
    title: "Payment Successful",
    message: `Your payment for "${olympiadName}" has been received. You are now officially registered!`,
    read: false
  }
  const { error } = await createNotification(notif);
  await sendEmail(
    email,
    "Payment Successful",
    `Your payment for "${olympiadName}" has been received. You are now officially registered!`
  );
  if (error) console.error("Failed to send notification:", error.message);
}
export async function sendOlympiadUpdateNotif(
  olympiad_id: string,
  olympiadName: string,
  title: string
) {
  // 1. get registrations
  const { data: registrations, error } = await supabase
    .from("Registrations")
    .select("student_id")
    .eq("olympiad_id", olympiad_id);

  if (error || !registrations) {
    console.error("Failed to fetch registrations:", error?.message);
    return;
  }
  

  // 2. get student emails
  const { data: students, error: studentError } = await supabase
    .from("Students")
    .select("id, email")
    .in("id", registrations.map(r => r.student_id));

  if (studentError || !students) {
    console.error("Failed to fetch students:", studentError?.message);
    return;
  }

  // 3. loop students (correct mapping)
  for (const student of students) {
    if (!student.email) continue;

    await sendEmail(
      student.email,
      "Olympiad Updated",
      `"${olympiadName}" has been updated. Check the platform.`
    );

    await createNotification({
      id: Date.now().toString(),
      user_id: student.id,
      type: "info",
      title: "Olympiad Updated",
      message: `"${olympiadName}" has been updated. Check the latest details.`,
      read: false,
    });
  }

  console.log("sendOlympiadUpdateNotif called", olympiad_id);
}
/** ✅ send email via API */
export async function sendEmail(email: string, subject: string, message: string) {
  try {
    const res = await fetch("https://projectdrafttwo.onrender.com/notify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, subject, message }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Email error:", data);
    }

    return data;
  } catch (err: any) {
    console.error("Email error:", err.message);
  }
}

/** ✅ create notification */
export async function createNotification(noti: any) {
  return await supabase.from("notifications").insert(noti);
}