function getPermission(s, permissions) {return s.split('.').reduce((o,i)=> o[i], { ...permissions })};

/**
 * Get a middleware function that checks requests for the specified permission.
 * @param {string} permission The permission you wish to check for. E.g. "admin" or "users.addUsers"
 * @returns {Function} The middleware function.
 */
export const GetPermissionCheckMiddleware = (permission) => {
  return (req, res, next) => {
    if (getPermission("admin", req.user.permissions) === true || getPermission(permission, req.user.permissions)) {
      req.hasPermission = true;
      return next();
    } else {
      res.status(403).json({ success: false, error: "You do not have permission to perform operations on that resource.", code: "ENOACCESS" });
    }
  }
}