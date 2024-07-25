import { useEffect, useRef, useState } from "react";
import { formatEventTimeString } from "../utilities/event-date-util";
import { deepEqual } from "../utilities/deep-equal";
import locIcon from '../assets/map-pin.svg';
import moment from 'moment-timezone';

export const EventPreview = (props) => {

  // State
  const [renderedData, setRenderedData] = useState([]);
  const eventData = useRef([]);

  // Function called by the interval to fetch new data
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
      eventData.current = events;
      setRenderedData(events);
    }
  }

  // Set up the interval to fetch new data
  useEffect(() => {
    const interval = setInterval(getNewData, 1000);
    return () => { clearInterval(interval); }
  }, []);
  
  // Loading text while we have no events
  if (renderedData.length === 0) {
    return (
      <div className="App-eventContainer">
        <h2>Upcoming Events</h2>
        <p>Loading events...</p>
      </div>
    )
  }

  // Function to create Moment object from date and time
  const createMomentFromDateTime = (date, time) => {
    return moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm:ss').tz("America/New_York");
  }

  // Define all date objects needed in the component
  const latestEvent = renderedData[renderedData.length - 1];
  const localStartDate = moment.tz(latestEvent.when, "America/New_York").toDate();
  const momentStartDate = moment(localStartDate);
  const momentStartTime = createMomentFromDateTime(latestEvent.when, latestEvent.start_time);
  const momentEndTime = createMomentFromDateTime(latestEvent.when, latestEvent.end_time);

  const eventIsToday = momentStartDate.isSame(moment(), 'day');

  /**
   * Returns a string representative of the start and end time, relative to now. For example:
   * 
   * `at [start_time]`
   * 
   * `until [end_time]`
   * 
   * `from [start_time] to [end_time]`
   * 
   * @param {*} start The start time, in the form of `hh:mm:ss`
   * @param {*} end The end time, in the form of `hh:mm:ss`
   * @returns The string representative of the start and end time.
   */
  function getTimeString(start, end) {
    if (start === null) {
      return (
        <span>— All Day</span>
      )
    }

    if (end === null) {
      return (
        <span>at {formatEventTimeString(start)}</span>
      )
    } else {
      if (moment().isBetween(momentStartTime, momentEndTime, "ms", "[]")) {
        return (
          <span>until {formatEventTimeString(end)}</span>
        )
      }
      return (
        <span>from {formatEventTimeString(start)} to {formatEventTimeString(end)}</span>
      )
    }
  }

  return (
    <div className="App-eventContainer">
      <div className="d-flex">
        <h3>Upcoming Event</h3>
        <h3 className="ms-2 fw-light">{eventIsToday ? <span>Today</span> : <span>On {momentStartDate.format("dddd, MM/DD/YYYY")}</span>} {getTimeString(latestEvent.start_time, latestEvent.end_time)}</h3>
      </div>
      <div className="App-eventContainerHeader">
        { latestEvent.title ? <p style={{ fontWeight: "bolder"}}>{latestEvent.title}</p> : null }
      </div>
      
      { latestEvent.text ? <p style={{ margin: 0 }}>{latestEvent.text}</p> : null }
      { latestEvent.location ? <p className="App-eventLocation"><img src={locIcon} className="App-eventLocation" alt=""/> {latestEvent.location}</p> : <p style={{ fontWeight: "lighter", fontSize: ".6em"}}>No event location specified.</p> }
    </div>
  );
}