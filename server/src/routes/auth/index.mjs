import { ParameterizedRouter } from "../../serverside/ParameterizedRouter.mjs";

export const AuthRouter = ParameterizedRouter();

import { LoginRouter } from "./login.mjs";
import { LogoutRouter } from "./logout.mjs";

console.log(LoginRouter);

AuthRouter.use("/login", LoginRouter);
AuthRouter.use("/logout", LogoutRouter);