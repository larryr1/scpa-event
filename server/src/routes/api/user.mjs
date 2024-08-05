import { EnsureApiAuthenticated } from "../../middleware/EnsureApiAuthenticated.mjs";
import { ParameterizedRouter } from "../../serverside/ParameterizedRouter.mjs";

export const ApiUserRouter = ParameterizedRouter();

ApiUserRouter.get("/", EnsureApiAuthenticated, (req, res) => {
  res.json(req.user);
});