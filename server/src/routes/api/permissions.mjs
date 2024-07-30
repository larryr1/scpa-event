import { EnsureApiAuthenticated } from "../../middleware/EnsureApiAuthenticated.mjs";
import { ParameterizedRouter } from "../../serverside/ParameterizedRouter.mjs";

export const ApiPermissionsRouter = ParameterizedRouter();

ApiPermissionsRouter.get("/", EnsureApiAuthenticated, (req, res) => {
  res.json(req.user.permissions);
});