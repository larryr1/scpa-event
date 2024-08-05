import { EnsureAuthenticated } from "../middleware/EnsureAuthenticated.mjs";
import { ParameterizedRouter } from "../serverside/ParameterizedRouter.mjs";

export const RootRouter = ParameterizedRouter();

import { AuthRouter } from "./auth/index.mjs";
import { ApiRouter } from "./api/index.mjs";
import { populateReqUser } from "./middleware/PopulateReqUser.mjs";

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

// Populate req.user each request
RootRouter.all("*", populateReqUser);


RootRouter.use("/auth", AuthRouter);
RootRouter.use("/api", ApiRouter);
RootRouter.get("/events", (req, res) => {
  res.json(events);
});

// 404 page
RootRouter.get("*", (req, res) => {
  res.sendFile("views/404.html", { root: "./src"});
});