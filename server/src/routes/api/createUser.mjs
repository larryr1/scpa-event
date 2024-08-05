import { randomUUID } from "crypto";
import { UsersDatabase } from "../../database.mjs";
import { EnsureApiAuthenticated } from "../../middleware/EnsureApiAuthenticated.mjs";
import { ParameterizedRouter } from "../../serverside/ParameterizedRouter.mjs";
import { defaultPermissions } from "../../lib/permissions/DefaultPermissions.mjs";
import { createSaltedHash } from "../../lib/auth/CreateSaltedHash.mjs";
import { GetPermissionCheckMiddleware } from "../../lib/auth/GetPermissionCheckMiddleware.mjs";

export const ApiCreateUserRouter = ParameterizedRouter();

ApiCreateUserRouter.post("/", EnsureApiAuthenticated, GetPermissionCheckMiddleware("editUsers"), async (req, res) => {
  
  if (!req.body.username || !req.body.password) {
    console.warn("Rejecting new user request with body:\n" + JSON.stringify(req.body));
    res.json({ success: false, error: "Missing username or password field(s) in the request body.", code: "EMISSINGARG" });
    return;
  }

  try {
    console.log("Checking for existing user before inserting.");
    const existingUser = await UsersDatabase.findOneAsync({ username: req.body.username }, {});
    if (existingUser) {
      console.warn("Rejecting new user request because a user with username " + req.body.username + " already exists.");
      console.log(JSON.stringify(existingUser));
      res.json({ success: false, error: "A user with the specified username already exists.", code: "EUSEREXISTS" });
      return;
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: "Database error.", code: "EDBFAILURE"});
    return;
  }

  try {
    const userId = randomUUID();
    const newUser = await UsersDatabase.insertAsync({
      _id: userId,
      username: req.body.username,
      password: createSaltedHash(req.body.password, userId),
      permissions: defaultPermissions
    });
    console.log("New inserted user: " + JSON.stringify(newUser));
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: "Database error.", code: "EDBFAILURE"});
    return;
  }

  res.json({ success: true, message: "User created." });
});