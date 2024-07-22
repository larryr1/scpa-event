import { fetchEventsData } from './fetchEvents.mjs';
import { filterAndSortEvents } from './filterAndSortEvents.mjs';

import express from 'express';
import cors from 'cors';

// Main function to fetch, filter, and sort events
var events = [];
const fetchFilterAndSortEvents = async () => {
  try {
    console.log("Fetching latest event data.");
    let tempEvents = await fetchEventsData();
    //events.push({ id: 1000, image: null, title: "My Test Event", slug: "my-test-event", location: null, link: null, text: "hi", when: "2024-07-09", start_time: null, end_time: null, end: "2024-07-09"})
    events = filterAndSortEvents(tempEvents);
  } catch (error) {
    console.error('Error fetching, filtering, or sorting events:', error);
  }
};

// Call the main function to fetch, filter, and sort events
fetchFilterAndSortEvents();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.get("/events", (req, res) => {
  res.json(events);
});

app.get("/messages", (req, res) => {
  res.json([
    ["Welcome back, Spartans!"],
    ["See something, say something."]
  ]);
});

setInterval(fetchFilterAndSortEvents, 5000);

app.listen(8000);