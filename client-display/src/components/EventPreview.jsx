import { useEffect, useRef, useState } from "react";
import { formatEventTimeString } from "../utilities/event-date-util";
import { deepEqual } from "../utilities/deep-equal";
import locIcon from '../assets/map-pin.svg';
import moment from 'moment-timezone';

export const EventPreview = (props) => {
  const [renderedData, setRenderedData] = useState([]);
  const eventData = useRef([]);

  async function getNewData() {
    let response;
    try {
      response = await fetch("/events");
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

  const eventIsToday = moment(localizedDate).isSame(moment(), 'day');

  function getTimeString(start, end) {
    if (start === null) {
      return (
        <span>— All Day Event</span>
      )
    }

    if (end === null) {
      return (
        <span>at {formatEventTimeString(start)}</span>
      )
    } else {
      return (
        <span>from {formatEventTimeString(start)} to {formatEventTimeString(end)}</span>
      )
    }
  }

  return (
    <div className="App-eventContainer">
      <div className="d-flex">
        <h3>Upcoming Event</h3>
        <h3 className="ms-2 fw-light">{eventIsToday ? <span>Today</span> : <span>On {localizedDate.toLocaleDateString()}</span>} {getTimeString(latestEvent.start_time, latestEvent.end_time)} {latestEvent.end_time ? null : "(no scheduled end time)"}</h3>
      </div>
      <div className="App-eventContainerHeader">
        { latestEvent.title ? <p style={{ fontWeight: "bolder"}}>{latestEvent.title}</p> : null }
      </div>
      
      { latestEvent.text ? <p style={{ margin: 0 }}>{latestEvent.text}</p> : null }
      { latestEvent.location ? <p className="App-eventLocation"><img src={locIcon} className="App-eventLocation"/> {latestEvent.location}</p> : <p style={{ fontWeight: "lighter", fontSize: ".6em"}}>No event location specified.</p> }
    </div>
  );
}