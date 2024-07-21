export const formatEventTimeString = (time) => {
  const segments = time.split(":");
  const hours = Number(segments[0]);
  const suffix = (hours < 12) ? "AM" : "PM";
  const adjustedHours = (hours > 12) ? hours - 12 : hours;
  const minutes = segments[1];

  return `${adjustedHours}:${minutes} ${suffix}`;
}

const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
/**
 * Generates a string from a Date object that looks like `Sunday, 1 January 2024 -- 12:00 AM`.
 * @param {*} date The date to generate the string from.
 */
export const getStringFromDate = (date) => {
  const weekday = weekdays[date.getDay()];
  const day = date.getMonth();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const time = date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', second: '2-digit', hour12: true });
  return `${weekday}, ${day} ${month} ${year} — ${time}`;
}