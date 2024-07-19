import { fetchEventsData } from './fetchEvents.mjs';
import { filterAndSortEvents } from './filterAndSortEvents.mjs';

// Main function to fetch, filter, and sort events
const fetchFilterAndSortEvents = async () => {
  try {
    const events = await fetchEventsData();
    //events.push({ id: 1000, image: null, title: "My Test Event", slug: "my-test-event", location: null, link: null, text: "hi", when: "2024-07-09", start_time: null, end_time: null, end: "2024-07-09"})
    const sortedEvents = filterAndSortEvents(events);
    
    // Output sorted events
    console.log("Sorted events (most recent first):");
    console.log(sortedEvents);
  } catch (error) {
    console.error('Error fetching, filtering, or sorting events:', error);
  }
};

// Call the main function to fetch, filter, and sort events
fetchFilterAndSortEvents();