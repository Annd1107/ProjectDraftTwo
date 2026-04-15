
import { supabase } from '../utils/supabase'

export interface Student{
  id: string, 
  name : string,
  email : string, 
  school:string, 
  grade :number,
  birthdate : Date,
  password: string

}
export async function getStudents(): Promise<Student[]> {
  const { data, error } = await supabase.from('Students').select('*')
  if (error) throw error
  return data as Student[];
}
export async function addStudent(student : Student) {
  return await supabase.from('Students').insert([student])
}

export async function createStudent(profile : any) {
  return await supabase.from("Students").insert([profile]);
}