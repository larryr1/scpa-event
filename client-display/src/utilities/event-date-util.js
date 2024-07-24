export const formatEventTimeString = (time) => {
if (time === null) return "";

  const segments = time.split(":");
  const hours = Number(segments[0]);
  const suffix = (hours < 12) ? "AM" : "PM";
  const adjustedHours = (hours > 12) ? hours - 12 : hours;
  const minutes = segments[1];

  return `${adjustedHours}:${minutes} ${suffix}`;
}