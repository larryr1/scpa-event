import { fetchFilterSortEvents } from "../../lib/events/FetchFilterSortEvents.mjs";
import { ParameterizedRouter } from "../../serverside/ParameterizedRouter.mjs";

export const RouterApiEvents = ParameterizedRouter();

// Array to hold events
var events = [];

// Go ahead and call once manually to populate the field on startup
console.log("Fetching initial event payload.");
fetchFilterSortEvents().then(e => {
  events = e;
});

setInterval(async () => { events = await fetchFilterSortEvents(); }, 5000);

RouterApiEvents.get("/", (req, res) => {
  res.json(events);
});