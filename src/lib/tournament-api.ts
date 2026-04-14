import { supabase } from "../utils/supabase";

export interface PreparationMaterial {
  fileName: string;
  fileUrl: string;
}

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

/** GET all olympiads */
export async function getOlympiads(): Promise<Olympiad[]> {
  const { data, error } = await supabase
    .from("olympiad")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

/** CREATE olympiad */
export async function createOlympiad(
  olympiad: Omit<
    Olympiad,
    "id" | "created_at" | "registered_count" | "registrations"
  >
) {
  const { data, error } = await supabase
    .from("olympiad")
    .insert({
      ...olympiad,
      id: crypto.randomUUID(),
      registered_count: 0,
      registrations: [],
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/** UPDATE olympiad */
export async function updateOlympiad(
  id: string,
  updates: Partial<Olympiad>
) {
  const { data, error } = await supabase
    .from("olympiad")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/** DELETE olympiad (FIXED DUPLICATE REMOVED) */
export async function deleteOlympiad(id: string) {
  const { error } = await supabase
    .from("olympiad")
    .delete()
    .eq("id", id);

  if (error) throw error;
}