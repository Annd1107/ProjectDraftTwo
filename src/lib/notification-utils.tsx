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
  const { data: registrations, error } = await supabase
    .from("Registrations")
    .select("student_id")
    .eq("olympiad_id", olympiad_id);

  if (error || !registrations) {
    console.error("Failed to fetch registrations:", error?.message);
    return;
  }

  const studentIds = registrations.map(r => r.student_id);

  const { data: students, error: studentsError } = await supabase
    .from("Students")
    .select("id, email")
    .in("id", studentIds);

  if (studentsError || !students) {
    console.error("Failed to fetch students:", studentsError?.message);
    return;
  }

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
  const { data, error } = await supabase.functions.invoke("send-email", {
    body: {
      email,
      subject,
      message,
    },
  });

  if (error) {
    console.error("Email error:", error.message);
  }

  return data;
}

/** ✅ create notification */
export async function createNotification(noti: any) {
  return await supabase.from("notifications").insert(noti);
}