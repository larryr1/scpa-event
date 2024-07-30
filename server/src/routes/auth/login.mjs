import { UsersDatabase } from "../../database.mjs";
import { ParameterizedRouter } from "../../serverside/ParameterizedRouter.mjs";
import crypto from 'crypto';

export const LoginRouter = ParameterizedRouter();

LoginRouter.get("/", (req, res) => {
  res.sendFile("views/login.html", { root: "./src"});
});

LoginRouter.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let user;

  // Make database call for user
  try {
    user = await UsersDatabase.findOneAsync({ username: username }); 
  } catch (error) {
    res.status(500).json({ success: false, error: "Database failure.", code: "EDBFAILURE" });
    return;
  }

  // Check password hash
  if (!user || !(user.password === crypto.createHash('sha256').update(password + user._id).digest("hex"))) {
    res.sendFile("views/login_incorrect.html", { root: './src' });
    return;
  }

  // Set session information
  req.session.loggedIn = true;
  req.session.userId = user._id;
  

  // Perform redirect if needed
  if (req.session.redirectAfterLogin) {
    const redir = { link: req.session.redirectAfterLogin };
    delete req.session.redirectAfterLogin;
    req.session.save();
    res.redirect(redir.link);
    return;
  }

  // Send to dashboard after successful login
  req.session.save();
  res.redirect("/admin");
});