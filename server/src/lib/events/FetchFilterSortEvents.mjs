import { filterSortEvents } from "./FilterSortEvents.mjs";
import { fetchEvents } from "./fetchEvents.mjs";

/**
 * Queries the webpage for the events list, then filters and sorts it for current or future events based on when they occur.
 * @returns Array of events sorted by their starting date and time.
 */
export const fetchFilterSortEvents = async () => {
    try {
      let tempEvents = await fetchEvents();
      return filterSortEvents(tempEvents);
    } catch (error) {
      console.error('Error fetching, filtering, or sorting events:', error);
    }
  };