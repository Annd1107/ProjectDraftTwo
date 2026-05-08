export const CATEGORY_MAP: Record<string, string> = {
  Mathematics: "math",
  Physics: "phys",
  Chemistry: "chem",
  Programming: "cs",
  Biology: "bio",
};

export interface CalendarEvent {
  date: Date;
  cat: string;
  title: string;
  venue: string;
  fee: string;
  slots: number;
  id : string;
}

export function transformEvents(dbEvents: any[]): CalendarEvent[] {
  return dbEvents.map((e: any) => ({
    date: new Date(e.date),
    cat: CATEGORY_MAP[e.category] || "math",
    title: e.title,
    venue: e.location,
    fee: `₮${e.registration_fee}`,
    slots: e.max_participants,
    id: e.id,
  }));
}

export function dateKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function buildEventMap(events: any[]) {
  const map: any = {};
  events.forEach((e) => {
    const k = dateKey(e.date);
    if (!map[k]) map[k] = [];
    map[k].push(e);
  });
  return map;
}