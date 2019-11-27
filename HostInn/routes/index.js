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
})
router.get("/places/create", checkUser, ensureLogin, (req,res, next) => {
  res.render("places/create",)
})

router.get("/places/show", checkUser, ensureLogin, (req,res,next)=>{
  res.render("places/show")
})

router.get("/places/delete/:id", checkUser, ensureLogin, (req,res,next)=>{
  res.render("places/delete")
})

router.get("/places/edit/:id", checkUser, ensureLogin, (req,res,next)=>{
  const { id } = req.params
  Place.findById(id)
    .then( place => res.render("places/edit", {place}))
    .catch( err => console.error(err))
})

router.post("/places/edit/:id", (req, res) => {
  const { id } = req.params
  Place.findByIdAndUpdate(id, {...req.body})
    .then( place => res.redirect("/"))
    .catch(err => console.log(err))
})

router.get("/places/:id", (req, res, next) => {
  const { id } = req.params
  Place.findById(id)
    .then( place => res.render("places/detail", {place}))
    .catch(err => console.log(err))
})
module.exports = router;