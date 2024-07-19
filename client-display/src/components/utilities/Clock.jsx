import { useEffect, useState } from "react";

const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export const Clock = (props) => {
  const [timeString, setTimeString] = useState("");

  function update() {
    const date = new Date();
    const weekday = weekdays[date.getDay()];
    const day = date.getMonth();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const time = date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', second: '2-digit', hour12: true });

    setTimeString(`${weekday}, ${day} ${month} ${year} — ${time}`)
  }

  useEffect(() => {
    const interval = setInterval(update, 100);
    return () => { clearInterval(interval); }
  }, []);
  
  return <p className={props.className}>{timeString}</p>
}