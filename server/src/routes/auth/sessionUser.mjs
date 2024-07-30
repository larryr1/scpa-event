import { EnsureApiAuthenticated } from "../../middleware/EnsureApiAuthenticated.mjs";
import { ParameterizedRouter } from "../../serverside/ParameterizedRouter.mjs";

export const SessionUserRouter = ParameterizedRouter();

SessionUserRouter.get("/session", (req, res) => {
    res.json(req.session);
});

SessionUserRouter.get("/user", (req, res) => {
    res.json(req.user);
});

SessionUserRouter.get("/permissions", (req, res) => {
    res.json(req.user.permissions);
});