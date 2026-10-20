export type DaySlot = { start: string; end: string };

/** Monday = 1 … Sunday = 0, matching Date.getDay() in the local calendar. */
export const WEEKLY_HOURS: Record<number, DaySlot[]> = {
  1: [
    { start: "08:00", end: "12:00" },
    { start: "14:00", end: "18:00" },
  ],
  2: [
    { start: "08:00", end: "12:00" },
    { start: "14:00", end: "18:00" },
  ],
  3: [
    { start: "08:00", end: "12:00" },
    { start: "14:00", end: "18:00" },
  ],
  4: [
    { start: "08:00", end: "12:00" },
    { start: "14:00", end: "18:00" },
  ],
  5: [
    { start: "08:00", end: "12:00" },
    { start: "14:00", end: "18:00" },
  ],
  6: [{ start: "08:00", end: "12:30" }],
  0: [],
};

function parisParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekdayMap: Record<string, number> = {
    lun: 1,
    mar: 2,
    mer: 3,
    jeu: 4,
    ven: 5,
    sam: 6,
    dim: 0,
  };

  const weekdayKey = get("weekday").replace(".", "").toLowerCase();
  return {
    day: weekdayMap[weekdayKey] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

function slotToMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function getOpenStatus(date = new Date()) {
  const state = getOpenState(date);
  return {open: state.isOpen, ...state};
}

export function getOpenState(date = new Date()) {
  const { day, minutes } = parisParts(date);
  const slots = WEEKLY_HOURS[day] ?? [];
  const current = slots.find(
    (slot) => minutes >= slotToMinutes(slot.start) && minutes < slotToMinutes(slot.end),
  );
  return {
    isOpen: Boolean(current),
    day,
    slots,
    current,
  };
}

export const HOURS_COPY = {
  weekdays: "08:00–12:00 / 14:00–18:00",
  saturday: "08:00–12:30",
  sunday: "Fermé",
};
