import { UsersDatabase } from "../../database.mjs";
import { ParameterizedRouter } from "../../serverside/ParameterizedRouter.mjs";

export const LoginRouter = ParameterizedRouter();

LoginRouter.get("/", (req, res) => {
  res.sendFile("views/login.html", { root: "./src"});
});

LoginRouter.post("/", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "admin" && password === "password") {
    req.session.loggedIn = true;
    req.session.permissions = {};
    req.session.permissions.messages = true;
    console.log("Logged in!");

    if (req.session.redirectAfterLogin) {
      const redir = { link: req.session.redirectAfterLogin };
      delete req.session.redirectAfterLogin;
      res.redirect(redir.link);
      return;
    }

    res.send("No redirect specified, go to dashboard");
  }
})