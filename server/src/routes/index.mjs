import { EnsureAuthenticated } from "../middleware/EnsureAuthenticated.mjs";
import { fetchEventsData } from "../serverside/fetchEvents.mjs";
import { filterAndSortEvents } from "../serverside/filterAndSortEvents.mjs";
import { ParameterizedRouter } from "../serverside/ParameterizedRouter.mjs";

export const RootRouter = ParameterizedRouter();

import { AuthRouter } from "./auth/index.mjs";
import { DebugRouter } from "./debug/session.mjs";
import { ApiRouter } from "./api/index.mjs";
import { UsersDatabase } from "../database.mjs";

// Home page
RootRouter.get("/", (req, res) => {
  res.redirect("/admin");
});

// Admin page
RootRouter.get("/admin/*", EnsureAuthenticated, (req, res) => {
  res.sendFile("views/admin.html", { root: './src' });
});

// Display
RootRouter.get("/display", (req, res) => {
  res.sendFile("views/display.html", { root: './src' });
});

// Default permissions
const defaultPermissions = {
  admin: false,
  editMessages: false,
  editEvents: false,
  editUsers: false,
  points: {
    manageEvents: false,
    scanEvents: false,
    managePoints: false
  }
};

// Populate req.user each request
const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
RootRouter.all("*", async (req, res, next) => {
  console.log("userId matches regex: " + uuidRegex.test(String(req.session.userId) || ""));
  if (!req.session.loggedIn ||  !uuidRegex.test(String(req.session.userId) || "")) return next();

  const user = await UsersDatabase.findOneAsync({ _id: req.session.userId });
  if (!user) return next();

  req.user = {
    _id: user._id,
    username: user.username,
    permissions: { ...defaultPermissions, ...user.permissions}, // Must spread the defaults BEFORE applying the actual permissions, so the actual values overwrite.
  };
  console.log("Set req.user to " + JSON.stringify(req.user));
  return next();
});

RootRouter.use("/auth", AuthRouter);
RootRouter.use("/debug", DebugRouter);
RootRouter.use("/api", ApiRouter);
RootRouter.get("/events", (req, res) => {
  res.json(events);
});

// 404 page
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