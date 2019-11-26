exports.isLoggedIn = (req, res, next) => {
  !req.isAuthenticated() ? next() : res.redirect("/login");
};

exports.isNotLoggedIn = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect("./places/show");
};

exports.checkRole = role => (req, res, next) => {
  if (req.user.role === role) {
    return next();
  } else {
    return res.send("No te confundas 💁‍♀️");
  }
};

exports.whichRole = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role === "Huesped") {
      req.app.locals.isHuesped = true;
    } else if (req.user.role === "Anfitrion") {
      req.app.locals.isAnfitrion = true;
    } else {
      req.app.locals.isHuesped = false;
      req.app.locals.isAnfitrion = false;
    }
  } else {
    req.app.locals.isHuesped = false;
    req.app.locals.isAnfitrion = false;
  }
  next();
};

