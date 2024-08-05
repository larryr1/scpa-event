import { SettingsDatabase } from "../../database.mjs";
import { GetPermissionCheckMiddleware } from "../../lib/auth/GetPermissionCheckMiddleware.mjs";
import { EnsureApiAuthenticated } from "../../middleware/EnsureApiAuthenticated.mjs";
import { ParameterizedRouter } from "../../serverside/ParameterizedRouter.mjs";

export const MessagesRouter = ParameterizedRouter();

MessagesRouter.get("/", async (req, res) => {
  

  try {
    var doc = await SettingsDatabase.findOneAsync({ key: "messages" });
    if (!doc) {
      doc = await SettingsDatabase.insertAsync({ key: "messages", value: [] });
    }
    res.json(doc.value);
  } catch (error) {
    res.status(500).json({ success: false, error: "Database error.", code: "EDBFAILURE" });
    console.error(error);
  }
});

MessagesRouter.post("/", EnsureApiAuthenticated, GetPermissionCheckMiddleware("editMessages"), async (req, res) => {

  try {
    await SettingsDatabase.updateAsync(
      { key: "messages" },
      { key: "messages", value: req.body.messages},
      { upsert: true }
    );
    
  } catch (error) {
    res.json({ success: false, error: "Database error.", code: "EDBFAILURE"});
    return;
  }

  res.json({ success: true });
});