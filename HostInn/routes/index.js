const express = require('express');
const router  = express.Router();

// Middleware to ensure the login
function ensureLogin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/auth/login');
  }
}

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



/* GET home page */
router.get('/', (req, res, next) => {
  let isAuthenticated = req.isAuthenticated()
  res.render('index', {isAuthenticated});
});

router.get("/map/locations", (req,res, next) => {
  let isAuthenticated = req.isAuthenticated()
  res.render("map/locations",{isAuthenticated})
})

router.get("/places/create",ensureLogin, (req,res, next) => {
  let isAuthenticated = req.isAuthenticated()
  res.render("places/create",{isAuthenticated})
})

router.get("/places/delete",ensureLogin, (req,res,next)=>{
  res.render("places/delete")
})

router.get("/places/show", ensureLogin, (req,res,next)=>{
  let isAuthenticated = req.isAuthenticated()
  res.render("places/show", {isAuthenticated})
})

router.get("/places/edit", ensureLogin, (req,res,next)=>{
  res.render("places/edit")
})

module.exports = router;
