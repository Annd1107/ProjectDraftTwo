
import { supabase } from '../utils/supabase'

export async function getStudents() {
  return await supabase.from('Student').select()
}

export async function addStudent(student) {
  return await supabase.from('Student').insert([student])
}

export async function createStudent(profile) {
  return await supabase.from("Students").insert([profile]);
}