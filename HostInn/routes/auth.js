const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const { ensureLogin, whichRole, checkUser, ensureAnf} = require("../middlewares/auth.middlewares")
const Place = require("../models/Place")

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/auth/profile",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const { username, email, password, telephoneNumber, role } = req.body
  if (username === "" || password === "" || email === "" || telephoneNumber === "") {
    res.render("auth/signup", { message: "Campos sin rellenar" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email,
      telephoneNumber,
      role
    });

    newUser.save()
    .then(() => {
      res.redirect("/auth/login");
    })
    .catch(err => {
      console.log(err)
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  req.app.locals.isHuesped = false;
  req.app.locals.isAnfitrion = false;
  res.redirect("/");
});

router.get("/profile", whichRole,checkUser, ensureLogin, (req,res, next) => {
  let data = {...req.user}
  data = data._doc
  res.render("auth/profile", {data})
})

router.get("/places" , checkUser, ensureLogin, ensureAnf, async (req, res) => {
  const { id } = req.user
  const { places } = await User.findById(id).populate('places')
  res.render("auth/places", {places})
})

module.exports = router;
