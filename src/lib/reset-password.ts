import { supabase } from "../utils/supabase";
import emailjs from "@emailjs/browser";

// ─── Step 1: Send reset email ─────────────────────────────────────────────
export async function sendPasswordReset(email: string) {
  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + 1000 * 60 * 30).toISOString(); // 30 min

  // check students first
  const { data: student } = await supabase
    .from("Students")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  const { data: organizer } = await supabase
    .from("Organizers")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (!student && !organizer) {
    return { error: "Email not found" };
  }

  const table = student ? "Students" : "Organizers";

  await supabase
    .from(table)
    .update({ reset_token: token, reset_token_expires: expires })
    .eq("email", email);

  const resetLink = `${window.location.origin}/reset-password?token=${token}&role=${student ? "student" : "organizer"}`;

  await emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      to_email: email,
      to_name: email,
      subject: "Password Reset",
      message: `Click this link to reset your password (expires in 30 minutes):\n\n${resetLink}`,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );

  return { success: true };
}

// ─── Step 2: Reset the password ──────────────────────────────────────────
export async function resetPassword(token: string, role: string, newPassword: string) {
  const table = role === "student" ? "Students" : "Organizers";

  const { data, error } = await supabase
    .from(table)
    .select("id, reset_token_expires")
    .eq("reset_token", token)
    .maybeSingle();

  if (error || !data) return { error: "Invalid token" };

  // check expiry
  if (new Date(data.reset_token_expires) < new Date()) {
    return { error: "Token expired" };
  }

  await supabase
    .from(table)
    .update({ 
      password: newPassword, 
      reset_token: null,        // ✅ invalidate token after use
      reset_token_expires: null 
    })
    .eq("id", data.id);

  return { success: true };
}