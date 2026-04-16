
import { supabase } from "../utils/supabase";

export async function savePlacements(placements: any[]) {
  const { data, error } = await supabase
    .from("Placements")
    .insert(placements);

  if (error) throw error;
  return data;
}

/** GET placements by olympiad */
export async function getPlacementsByOlympiad(olympiadId: string) {
  const { data, error } = await supabase
    .from("Placements")
    .select("*")
    .eq("OlympiadId", olympiadId)
    .order("rank", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

/** GET placements by student */
export async function getPlacementsByStudent(studentId: string) {
  const { data, error } = await supabase
    .from("Placements")
    .select("*,  olympiad : OlympiadId( title, category, location, registered_count )")
    .eq("StudentId", studentId)

  if (error) throw error;
  return data ?? [];
}