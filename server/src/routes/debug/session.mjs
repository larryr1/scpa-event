import { ParameterizedRouter } from "../../serverside/ParameterizedRouter.mjs";

export const DebugRouter = ParameterizedRouter();

DebugRouter.get("/session", (req, res) => {
  res.json(req.session);
});