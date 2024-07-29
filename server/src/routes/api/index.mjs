import { EnsureApiAuthenticated } from "../../middleware/EnsureApiAuthenticated.mjs";
import { ParameterizedRouter } from "../../serverside/ParameterizedRouter.mjs";

export const ApiRouter = ParameterizedRouter();

ApiRouter.use(EnsureApiAuthenticated);

ApiRouter.get("/", (req, res) => {
  res.json({ success: true });
});