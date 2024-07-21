import { useEffect, useRef, useState } from "react";
import { formatEventTimeString } from "../utilities/event-date-util";
import { deepEqual } from "../utilities/deep-equal";
import moment from 'moment-timezone';

export const EventPreview = () => {
  const [renderedData, setRenderedData] = useState([]);
  const eventData = useRef([]);

  async function getNewData() {
    let response;
    try {
      response = await fetch("http://localhost:8000/events");
    } catch (error) {
      console.log(error);
      eventData.current = [];
      setRenderedData([]);
      return;
    }

    const events = await response.json();
    console.log(deepEqual(eventData.current, events));
    if (!deepEqual(eventData.current, events)) {
      console.log("Difference detected. Setting new event data to " + JSON.stringify(events));
      eventData.current = events;
      setRenderedData(events);
    }
  }

  useEffect(() => {
    const interval = setInterval(getNewData, 1000);
    return () => { clearInterval(interval); }
  }, []);
  
  if (renderedData.length === 0) {
    return (
      <div className="App-eventContainer">
        <h2>Upcoming Events</h2>
        <p>Loading events...</p>
      </div>
    )
  }

  console.log("renderedData is " + JSON.stringify(renderedData));

  const latestEvent = renderedData[renderedData.length - 1];

  console.log("Events rendering.");

  const localizedDate = moment.tz(latestEvent.when, "America/New_York").toDate();

  return (
    <div className="App-eventContainer">
      <div className="App-eventContainerHeader">
        { latestEvent.title ? <p style={{ fontWeight: "bolder"}}>{latestEvent.title}</p> : null }
        <p style={{ fontWeight: "lighter", marginLeft: "15px"}}>On {localizedDate.toLocaleDateString()} {latestEvent.start_time ? <span>at {formatEventTimeString(latestEvent.start_time)}</span> : null }</p>
      </div>
      
      { latestEvent.text ? <p style={{ margin: 0 }}>{latestEvent.text}</p> : null }
      { latestEvent.location ? <p className="App-eventLocation">{latestEvent.location}</p> : <p style={{ fontWeight: "lighter", fontSize: ".6em"}}>No event location specified.</p> }
    </div>
  );
}