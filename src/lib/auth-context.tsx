"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../utils/supabase";

interface UserProfile {
  id: string; // 👈 IMPORTANT: match your DB type (int8)
  email: string;
  name: string;
  role: "student" | "organizer";
  school?: string;
  grade?: number;
  birthdate?: string;
  organization?: string;
  revenue?: number;
}

interface AuthContextType {
  user: UserProfile | null;
  signup: (data: any) => Promise<boolean>;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔍 load session
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  // -------------------------
  // SIGNUP (NO SUPABASE AUTH)
  // -------------------------
  const signup = async (data: any): Promise<boolean> => {
    try {
      // 1. check if email exists (students)
      const { data: studentExists } = await supabase
        .from("Students")
        .select("email")
        .eq("email", data.email)
        .maybeSingle();

      const { data: orgExists } = await supabase
        .from("Organizers")
        .select("email")
        .eq("email", data.email)
        .maybeSingle();

      if (studentExists || orgExists) {
        console.error("Email already exists");
        return false;
      }

      // 2. insert user
      if (data.role === "student") {
        const { data: inserted, error } = await supabase
          .from("Students")
          .insert({
            id: Math.random().toString(36).substr(2, 9), 
            email: data.email,
            password: data.password, // ⚠️ plain text (not secure but your choice)
            name: data.name,
            school: data.school,
            grade: data.grade,
            birthdate: data.birthdate,
          })
          .select()
          .single();

        if (error) {
          console.error(error);
          return false;
        }

        setUser({ ...inserted, role: "student" });
        localStorage.setItem("user", JSON.stringify(inserted));
        return true;
      }

      const { data: inserted, error } = await supabase
        .from("Organizers")
        .insert({
          id: Math.random().toString(36).substr(2, 9),
          email: data.email,
          password: data.password,
          name: data.name,
          organization: data.organization,
          revenue: 0,
        })
        .select()
        .single();

      if (error) {
        console.error(error);
        return false;
      }

      setUser({ ...inserted, role: "organizer" });
      localStorage.setItem("user", JSON.stringify(inserted));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // -------------------------
  // LOGIN (manual check)
  // -------------------------
  const login = async (
    email: string,
    password: string,
    role: string
  ): Promise<boolean> => {
    const table = role === "student" ? "Students" : "Organizers";

    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .maybeSingle();

    if (error || !data) {
      console.error("Invalid login");
      return false;
    }

    const userData = { ...data, role };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    return true;
  };

  // -------------------------
  // LOGOUT
  // -------------------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}