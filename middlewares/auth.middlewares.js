function isLoggedIn(req, res, next) {
  if (req.session.user === undefined) {
    res.redirect("/auth/login");
  } else {
    next();
  }
}

function updateLocals(req, res, next) {
  if (req.session.user === undefined) {
    res.locals.isSessionActive = false;
  } else {
    res.locals.isSessionActive = true;
    if (req.session.user.role === "admin") {
      res.locals.isAdmin = true;
    } else {
      res.locals.isAdmin = false;
    }
    if (req.session.user.role === "user") {
      res.locals.isUser = true;
    } else {
      res.locals.isUser = false;
    }
  }
  next();
}

function isAdmin(req, res, next) {
  if (req.session.user.role === "admin") {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = {
  isLoggedIn,
  updateLocals,
  isAdmin,
};
