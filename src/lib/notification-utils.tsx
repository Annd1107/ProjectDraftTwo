import { supabase } from "../utils/supabase";

export async function sendPaymentNotification(userId: string, olympiadName: string) {
  const { error } = await supabase.from("notifications").insert({
    id: Date.now().toString(),
    user_id: userId,
    type: "success",
    title: "Payment Successful",
    message: `Your payment for "${olympiadName}" has been received. You are now officially registered!`,
    read : false
  });

  if (error) console.error("Failed to send notification:", error.message);
}