import { ParameterizedRouter } from "../../serverside/ParameterizedRouter.mjs";

export const LogoutRouter = ParameterizedRouter();

LogoutRouter.get("/", (req, res) => {
  console.log("Logged out!");

  req.session.destroy();
  res.redirect("/");
});