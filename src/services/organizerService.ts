import { supabase } from '../utils/supabase'
export async function createOrganizer(profile: any ) {
  return await supabase.from("Organizers").insert([profile]);
}
export async function payment_data(id: string) {
  const { data, error } = await supabase
    .from("payment")
    .select("*")
    .eq("OrganizerId", id)
    .eq("status", "paid");

  if (error) {
    console.error(error);
    return { data: [] };
  }

  return { data };
}
export async function updateRevenue(organizerId: string, amount: number) {

  const { data: organizer, error: fetchError } = await supabase
    .from("Organizers")
    .select("revenue")
    .eq("id", organizerId)
    .single();

  if (fetchError) {
    console.error(fetchError);
    return false;
  }

  const newRevenue = (organizer?.revenue || 0) + amount;


  const { error: updateError } = await supabase
    .from("Organizers")
    .update({ revenue: newRevenue })
    .eq("id", organizerId); 
    
  if (updateError) {
    console.error(updateError);
    return false;
  } 
  return true;
}