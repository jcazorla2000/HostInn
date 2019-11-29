const express = require('express');
const router  = express.Router();
const Place = require("../models/Place")
const User = require("../models/User")
const uploadCloud = require("../config/cloudinary")
const { ensureLogin, whichRole, checkUser, ensureAnf, isLoggedIn} = require("../middlewares/auth.middlewares")

/* GET home page */
router.get('/', checkUser, (req, res, next) => {
  Place.find()
    .then( places => {
      if (places[2]){
        res.render("index", {places})
      }
      else {
        res.render('index');
      }
    })
    .catch( err => console.error(err))
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


router.post("/places/edit/:id", uploadCloud.single("photo"),(req, res) => {
  const { id } = req.params
  if (req.file){
    const { secure_url, originalname } = req.file;
    console.log("-----------siiii")
    const { price, startDate, endDate, description, address} = req.body
    if (price === "" || startDate === "" || endDate === "" || description === "" || address === "" ){
      res.render(`places/edit`, { message: "Campos sin rellenar" });
      return;
    }
    Place.findByIdAndUpdate(id, {hostID: id, imgName: originalname, imgPath: secure_url, ...req.body})
      .then( place => res.redirect("/auth/places"))
      .catch(err => console.log(err))
  }
  else {
    const { price, startDate, endDate, description, address} = req.body
    console.log("-----------noooo")
    if (price === "" || startDate === "" || endDate === "" || description === "" || address === "" ){
      res.redirect(`/places/edit/${id}`)
      return;
    }
    Place.findByIdAndUpdate(id, {hostID: id, ...req.body})
      .then( place => res.redirect("/auth/places"))
      .catch(err => console.log(err))
  }
})

router.get("/places/:id", (req, res, next) => {
  const { id } = req.params
  const user = req.user
  Place.findById(id)
    .then( place => res.render("places/detail", {place, user}))
    .catch(err => console.log(err))
})
module.exports = router;