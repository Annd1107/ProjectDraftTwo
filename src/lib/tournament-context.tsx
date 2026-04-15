"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  getOlympiads,
  createOlympiad,
  updateOlympiad,
  deleteOlympiad,
  registerOlympiad,
  unregisterOlympiad,
  getRegistrations
} from "./tournament-api";

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

  // IMPORTANT: preparation material
  preparation_material?: {
    fileName: string;
    fileUrl: string;
  } | null;
}
export interface Registration {
  id: string,
  created_at: string,
  student_id: string,
  olympiad_id: string
}

import { useAuth } from "./auth-context";

interface OlympiadContextType {
  olympiads: Olympiad[];
  registrations: Registration[];
  isLoading: boolean;

  addOlympiad: (data: Omit<Olympiad,
    "id" | "created_at" | "registered_count" | "registrations"
  >) => Promise<void>;

  updateOlympiadItem: (id: string, data: Partial<Olympiad>) => Promise<void>;
  deleteOlympiadItem: (id: string) => Promise<void>;

  register: (olympiadId: string, studentId: string) => Promise<void>;
  unregister: (olympiadId: string, studentId: string) => Promise<void>;

  getById: (id: string) => Olympiad | undefined;
}

const OlympiadContext = createContext<OlympiadContextType | undefined>(
  undefined
);

export function OlympiadProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const [olympiads, setOlympiads] = useState<Olympiad[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  /** LOAD */
  useEffect(() => {
    (async () => {
      const data = await getOlympiads();
      setOlympiads(data);
      const dta = await getRegistrations();
      setRegistrations(dta);
      setIsLoading(false);
    })();
  }, []);

  /** CREATE */
  const addOlympiad = async (data: Omit<Olympiad,
    "id" | "created_at" | "registered_count" | "organizer_id" | "organizer_name" | "organizer_organization"
  >) => {
    if (!user) throw new Error("Not authenticated");

    const created = await createOlympiad({
      ...data,
      organizer_id: user.id,
      organizer_name: user.name || "",
      organizer_organization: user.organization || "",
    });

    setOlympiads((prev) => [created, ...prev]);
  };

  /** UPDATE */
  const updateOlympiadItem = async (id: string, data: Partial<Olympiad>) => {
    const updated = await updateOlympiad(id, data);
    setOlympiads((prev) =>
      prev.map((o) => (o.id === id ? updated : o))
    );
  };

  /** DELETE */
  const deleteOlympiadItem = async (id: string) => {
    await deleteOlympiad(id);
    setOlympiads((prev) => prev.filter((o) => o.id !== id));
  };

  const register = async (olympiadId: string, studentId: string) => {
    const olympiad = olympiads.find((o) => o.id === olympiadId);
    if (!olympiad) return;

    const alreadyRegistered = registrations.some(
      (r) => r.olympiad_id === olympiadId && r.student_id === studentId
    );

    if (alreadyRegistered) return;

    if (olympiad.registered_count >= olympiad.max_participants) return;

    const newReg = await registerOlympiad(studentId, olympiadId);

    const updated = {
      ...olympiad,
      registered_count: olympiad.registered_count + 1,
    };

    await updateOlympiad(olympiadId, {
      registered_count: updated.registered_count,
    });


    setRegistrations((prev) => [newReg, ...prev]);
    setOlympiads((prev) =>
      prev.map((o) => (o.id === olympiadId ? updated : o))
    );
  };
  const unregister = async (olympiadId: string, studentId: string) => {
    const olympiad = olympiads.find((o) => o.id === olympiadId);
    if (!olympiad) return;

    const reg = registrations.find(
      (r) => r.olympiad_id === olympiadId && r.student_id === studentId
    );

    if (!reg) return;


    await unregisterOlympiad(reg.id);


    const updated = {
      ...olympiad,
      registered_count: olympiad.registered_count - 1,
    };

    await updateOlympiad(olympiadId, {
      registered_count: updated.registered_count,
    });


    setRegistrations((prev) => prev.filter((r) => r.id !== reg.id));
    setOlympiads((prev) =>
      prev.map((o) => (o.id === olympiadId ? updated : o))
    );
  };

  const getById = (id: string) =>
    olympiads.find((o) => o.id === id);

  return (
    <OlympiadContext.Provider
      value={{
        olympiads,
        registrations,
        isLoading,
        addOlympiad,
        updateOlympiadItem,
        deleteOlympiadItem,
        register,
        unregister,
        getById,
      }}
    >
      {children}
    </OlympiadContext.Provider>
  );
}

export function useOlympiads() {
  const ctx = useContext(OlympiadContext);
  if (!ctx) throw new Error("useOlympiads must be used inside provider");
  return ctx;
}