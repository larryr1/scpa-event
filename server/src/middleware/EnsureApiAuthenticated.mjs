export const EnsureApiAuthenticated = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.status(401).json({ success: false, error: "Not logged in. Please authenticate.", code: 401 })
  } else {
    return next();
  }
}