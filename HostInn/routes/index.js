const express = require('express');
const router  = express.Router();
const Place = require("../models/Place")
const User = require("../models/User")
const { ensureLogin, whichRole, checkUser, ensureAnf, isLoggedIn} = require("../middlewares/auth.middlewares")

/* GET home page */
router.get('/', checkUser, (req, res, next) => {
  res.render('index');
});

router.post("/", (req, res) => {
  res.render("places/searchedPlaces")
})

router.post("/search", (req, res) => {
  const { search } = req.body
  Place.find({name: { $regex: `${search}.*`, $options: 'i' } })
    .then(places => {
      console.log(places)
      res.render("places/searchedPlaces", {places})
    })
    .catch(err => console.log(err))
})

router.post("/searchedPlaces/:result", (req, res) => {
  const { result } = req.params
  console.log(result)
})

router.get("/map/locations", checkUser, async (req,res, next) => {
  places = await Place.find()
  res.render("map/locations", {places} )
})
router.get("/places/create", isLoggedIn, checkUser, ensureAnf, ensureLogin, whichRole,  (req,res, next) => {
  res.render("places/create",)
})

router.get("/places/delete/:id", isLoggedIn,checkUser, ensureAnf, ensureLogin, whichRole, (req,res,next)=>{
  const { id } = req.params
  const { _id } = req.user
  console.log(id)
  Place.findByIdAndRemove(id)
    .then( () => User.findByIdAndUpdate(_id, {$pull: {places: { $in: id }}})
            .then( () => res.redirect("/auth/places"))
            .catch( err => console.error(err))
    )
    .catch(err => console.log(err))
})

router.get("/places/edit/:id", isLoggedIn,checkUser, ensureAnf,  ensureLogin,whichRole, (req,res,next)=>{
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