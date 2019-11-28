const express = require("express");
const router = express.Router();
const Place = require("../models/Place")
const User = require("../models/User")
const uploadCloud = require("../config/cloudinary")

router.get("/create", (_, res) => res.render("places/create"))

router.post("/create", uploadCloud.single("photo"),  (req, res) => {
  const { id } = req.user
  const { secure_url, originalname } = req.file;

  Place.create({hostID: id, imgName: originalname, imgPath: secure_url, ...req.body})
    .then( result => {
      User.findByIdAndUpdate(id, {$push: {places : result.id}})
        .then( user => res.redirect("/places/create"))
        .catch(err => console.error(err))
    })
    .catch(err => console.log(err))
})

module.exports = router