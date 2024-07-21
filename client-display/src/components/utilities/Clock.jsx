import { useEffect, useState } from "react";
import { getStringFromDate } from "../../utilities/event-date-util";

export const Clock = (props) => {
  const [timeString, setTimeString] = useState("");

  function update() {
    setTimeString(getStringFromDate(new Date()));
  }

  useEffect(() => {
    const interval = setInterval(update, 100);
    return () => { clearInterval(interval); }
  }, []);
  
  return <p className={props.className}>{timeString}</p>
}