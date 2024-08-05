import { EnsureApiAuthenticated } from "../../middleware/EnsureApiAuthenticated.mjs";
import { MessagesRouter } from "./messages.mjs";
import { ApiPermissionsRouter } from "./permissions.mjs";
import { ParameterizedRouter } from "../../serverside/ParameterizedRouter.mjs";
import { ApiUserRouter } from "./user.mjs";
import { ApiCreateUserRouter } from "./createUser.mjs";
import { RouterApiEvents } from "./events.mjs";

export const ApiRouter = ParameterizedRouter();

//ApiRouter.use(EnsureApiAuthenticated);

ApiRouter.get("/", (req, res) => {
  res.json({ success: true });
});

ApiRouter.use("/messages", MessagesRouter);
ApiRouter.use("/permissions", ApiPermissionsRouter);
ApiRouter.use("/user", ApiUserRouter);
ApiRouter.use("/createuser", ApiCreateUserRouter);
ApiRouter.use("/events", RouterApiEvents);