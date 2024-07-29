export const EnsureAuthenticated = (req, res, next) => {
  if (!req.session.loggedIn) {
    req.session.redirectAfterLogin = req.path;
    res.redirect("/auth/login");
  } else {
    return next();
  }
}