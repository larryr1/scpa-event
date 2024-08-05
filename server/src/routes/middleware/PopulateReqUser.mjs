import { UsersDatabase } from "../../database.mjs";
import { defaultPermissions } from "../../lib/permissions/DefaultPermissions.mjs";
import { isUUIDV4 } from "../../lib/string/IsUUIDv4.mjs";

/**
 * If the request is from a logged-in session, PopulateReqUser copies the user's profile into the req.user object.
 * If the request session is not logged in, it does nothing.
 */
export const populateReqUser = async (req, res, next) => {
  if (!req.session.loggedIn ||  !isUUIDV4(req.session.userId)) return next();

  const user = await UsersDatabase.findOneAsync({ _id: req.session.userId });
  if (!user) return next();

  req.user = {
    _id: user._id,
    username: user.username,
    permissions: { ...defaultPermissions, ...user.permissions}, // Must spread the defaults BEFORE applying the actual permissions, so the actual values overwrite.
  };
  
  return next();
};