import moment from 'moment-timezone';

const timezone = "America/New_York";

// Function to create Moment object from date only
const createMomentFromDate = (date) => {
  return moment(date, 'YYYY-MM-DD').tz(timezone);
};

// Function to create Moment object from date and time
const createMomentFromDateTime = (date, time) => {
  return moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm:ss').tz(timezone);
};

// Function to filter and sort events
export const filterSortEvents = (events) => {
  // Current date/time in EST
  const now = moment().tz(timezone);
  const today = moment().tz(timezone).startOf("day");

  return events
    // Filter events happening now or in the future, including ongoing events
    .filter(event => {
      if (event.start_time === null) {
        // Treat as an all-day event
        const eventDate = createMomentFromDate(event.when);
        return eventDate.isValid() && eventDate.isSameOrAfter(today, 'day');
      } else {
        // Parse event start time and end time if available
        const eventStartTime = createMomentFromDateTime(event.when, event.start_time);
        const eventEndTime = createMomentFromDateTime(event.when, event.end_time);

        if (eventStartTime.isValid()) {
          // Check if current time is before start time (event has not started yet)
          if (now.isBefore(eventStartTime)) return true;

          // Checks for if we also have an end time
          if (eventEndTime.isValid() && event.end_time !== null) {
            // Check if current time is between start time and end time (event is ongoing)
            if (now.isBetween(eventStartTime, eventEndTime, null, '[)')) return true;

          } else {
            // Edge case for when the event only has a start time and the event is today (event does not end), (really isn't an edge case because they are entered wrong half the time), we want it to display anyway
            if (now.isAfter(eventStartTime, "ms") && now.isSame(eventStartTime, "day")) return true;
          }

          // Event is not in the future or ongoing (it has already passed)
          return false;
          
        } else {
          console.error("An event has an invalid start or end time.");
          return false;
        }
      }
    })
    // Sort events by start time/date descending
    .sort((a, b) => {
      const momentA = a.start_time === null ? createMomentFromDate(a.when) : createMomentFromDateTime(a.when, a.start_time);
      const momentB = b.start_time === null ? createMomentFromDate(b.when) : createMomentFromDateTime(b.when, b.start_time);
      return momentB.diff(momentA); // Sort descending (most recent first)
    });
};
