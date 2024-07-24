import { useEffect, useState } from "react";

const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

/**
 * Generates a string from a Date object that looks like `Sunday, 1 January 2024 -- 12:00 AM`.
 * @param {*} date The date to generate the string from.
 * @returns {string} The date string.
 */
const getStringFromDate = (date) => {
  const weekday = weekdays[date.getDay()];
  const day = date.getMonth();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const time = date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', second: '2-digit', hour12: true });
  return `${weekday}, ${day} ${month} ${year} — ${time}`;
}

/**
 * A component that shows a live-updating clock, formatted as it is described in {@link getStringFromDate}.
 * @param {*} props Props for the underlying <p> element that is displayed.
 * @returns The component.
 */
export const Clock = (props) => {
  const [timeString, setTimeString] = useState("");

  function update() {
    setTimeString(getStringFromDate(new Date()));
  }

  useEffect(() => {
    const interval = setInterval(update, 100);
    return () => { clearInterval(interval); }
  }, []);
  
  return <p {...props}>{timeString}</p>
}