import { useEffect, useState } from "react";
import { getStringFromDate } from "../../utilities/event-date-util";

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