import { UsersDatabase } from "../../database.mjs";
import { createSaltedHash } from "../../lib/auth/CreateSaltedHash.mjs";
import { EnsureAuthenticated } from "../../middleware/EnsureAuthenticated.mjs";
import { ParameterizedRouter } from "../../serverside/ParameterizedRouter.mjs";

export const authPasswordRouter = ParameterizedRouter();

authPasswordRouter.get("/", EnsureAuthenticated, (req, res) => {
  res.sendFile("views/change_password.html", { root: './src' });
});

authPasswordRouter.post("/", EnsureAuthenticated, async (req, res) => {
  if (!req.body.newPassword || req.body.newPassword === "") {
    res.json({ success: false, error: "Missing newPassword field in the request body.", code: "EMISSINGARG" });
    return;
  }

  const hashedPassword = createSaltedHash(req.body.password, req.user._id);

  try {
    const doc = await UsersDatabase.updateAsync({ _id: req.user._id }, { $set: { password: hashedPassword }});
    console.log(doc.value);
  } catch (error) {
    res.status(500).json({ success: false, error: "Database error.", code: "EDBFAILURE" });
    console.error(error);
  }

  try {
    req.session.destroy();
    res.redirect("/auth/login?successMessage=Password%20changed%20successfully.");
  } catch (error) {
    res.status(500).json({ success: false, error: "Session logout and and save error.", code: "ESESSIONERROR" });
    console.error(error);
  }
});