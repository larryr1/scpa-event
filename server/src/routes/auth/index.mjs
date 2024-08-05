import { ParameterizedRouter } from "../../serverside/ParameterizedRouter.mjs";

export const AuthRouter = ParameterizedRouter();

import { LoginRouter } from "./login.mjs";
import { LogoutRouter } from "./logout.mjs";
import { SessionUserRouter } from "./sessionUser.mjs";
import { authPasswordRouter } from "./password.mjs";

AuthRouter.use("/login", LoginRouter);
AuthRouter.use("/logout", LogoutRouter);
AuthRouter.use("/", SessionUserRouter);
AuthRouter.use("/passchange", authPasswordRouter);