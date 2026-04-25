import { supabase } from "../utils/supabase";

export async function sendPaymentNotification(userId: string, olympiadName: string) {
  const notif = {
    id: Date.now().toString(),
    user_id: userId,
    type: "success",
    title: "Payment Successful",
    message: `Your payment for "${olympiadName}" has been received. You are now officially registered!`,
    read: false
  }
  const { error } = await createNotification(notif);

  if (error) console.error("Failed to send notification:", error.message);
}
export async function sendOlympiadUpdateNotif(olympiad_id: string, olympiadName: string) {
  // ✅ get only registrations for this olympiad
  const { data: registrations, error } = await supabase
    .from("Registrations")
    .select("student_id")
    .eq("olympiad_id", olympiad_id);

  if (error) {
    console.error("Failed to fetch registrations:", error.message);
    return;
  }

  // ✅ send notification to each student
  for (const r of registrations) {
    const notif = {
      id: Date.now().toString(),
      user_id: r.student_id,
      type: "info",
      title: "Olympiad Updated",
      message: `"${olympiadName}" has been updated. Check the latest details.`,
      read: false,
    };

    const { error: insertError } = await createNotification(notif);

    if (insertError) {
      console.error("Notification error:", insertError.message);
    }
    
  }
  console.log("sendOlympiadUpdateNotif called", olympiad_id);
}
export async function createNotification(noti: any) {
  return await supabase.from("notifications").insert(noti)
}