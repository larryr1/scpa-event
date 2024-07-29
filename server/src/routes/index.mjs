import { EnsureAuthenticated } from "../middleware/EnsureAuthenticated.mjs";
import { fetchEventsData } from "../serverside/fetchEvents.mjs";
import { filterAndSortEvents } from "../serverside/filterAndSortEvents.mjs";
import { ParameterizedRouter } from "../serverside/ParameterizedRouter.mjs";

export const RootRouter = ParameterizedRouter();

import { AuthRouter } from "./auth/index.mjs";
import { DebugRouter } from "./debug/session.mjs";
import { ApiRouter } from "./api/index.mjs";

RootRouter.use("/auth", AuthRouter);
RootRouter.use("/debug", DebugRouter);
RootRouter.use("/api", ApiRouter);

RootRouter.get("/", (req, res) => {
  res.redirect("/auth/login");
});

RootRouter.get("/protected", EnsureAuthenticated, (req, res) => {
  res.json({ success: true });
})

RootRouter.get("/display", (req, res) => {
  res.sendFile("views/display.html", { root: './src' });
});

RootRouter.get("/events", (req, res) => {
  res.json(events);
});

/*RootRouter.get("/messages", (req, res) => {
  res.json([
    ["Welcome back, Spartans!"],
    ["See something, say something."]
  ]);
});*/

RootRouter.get("*", (req, res) => {
  res.sendFile("views/404.html", { root: "./src"});
});

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

setInterval(fetchFilterAndSortEvents, 5000);