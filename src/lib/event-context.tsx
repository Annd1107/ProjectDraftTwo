import { createContext, useContext, useEffect, useState } from "react";
import { getOlympiads } from "./tournament-api";

const EventContext = createContext<any>(null);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getOlympiads();
      setEvents(data || []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <EventContext.Provider value={{ events, loading }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}