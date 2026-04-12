import { supabase } from "../utils/supabase";

export interface Olympiad {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;

  registration_fee: number;
  max_participants: number;
  registered_count: number;

  organizer_id: string;
  organizer_name: string;
  organizer_organization: string;

  created_at: string;

  // JSON column in Supabase
  registrations: string[];

  // IMPORTANT: preparation material
  preparation_material?: {
    fileName: string;
    fileUrl: string;
  } | null;
}

export async function getOlympiads(): Promise<Olympiad[]> {
  const { data, error } = await supabase
    .from("olympiad")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Olympiad[];
}
export async function createOlympiad(
  olympiad: Omit<Olympiad, "id" | "created_at" | "registered_count">
) {
  const { data, error } = await supabase
    .from("olympiad")
    .insert({
      ...olympiad,
      id: crypto.randomUUID(),
      registered_count: 0,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
export async function deleteOlympiad(id: string) {
  const { error } = await supabase
    .from("olympiad")
    .delete()
    .eq("id", id);
    supabase.from("payment").delete().eq("olympiad_id", id); // Also delete related payments

  if (error) throw error;
} 