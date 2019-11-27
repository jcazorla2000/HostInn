const express = require('express');
const router  = express.Router();
const Place = require("../models/Place")
const { ensureLogin, whichRole, checkUser} = require("../middlewares/auth.middlewares")

/* GET home page */
router.get('/', checkUser, (req, res, next) => {
  res.render('index');
});

router.get("/map/locations", checkUser, async (req,res, next) => {
  places = await Place.find()
  res.render("map/locations", {places} )
  console.log(places)
})
router.get("/places/create", checkUser, ensureLogin, (req,res, next) => {
  res.render("places/create",)
})

router.get("/places/show", checkUser, ensureLogin, (req,res,next)=>{
  res.render("places/show")
})

router.get("/places/delete", checkUser, ensureLogin, (req,res,next)=>{
  res.render("places/delete")
})

router.get("/places/edit", checkUser, ensureLogin, (req,res,next)=>{
  res.render("places/edit")
})
module.exports = router;