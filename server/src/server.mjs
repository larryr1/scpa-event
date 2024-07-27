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

app.use(express.static("src/public"));

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.get("/display", (req, res) => {
  res.sendFile("views/display.html", { root: './src' });
})

app.get("/events", (req, res) => {
  res.json(events);
});

app.get("/messages", (req, res) => {
  res.json([
    ["Welcome back, Spartans!"],
    ["See something, say something."]
  ]);
});

app.get("*", (req, res) => {
  res.sendFile("views/404.html", { root: "./src"});
})

setInterval(fetchFilterAndSortEvents, 5000);

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log("Listening at " + port);
});