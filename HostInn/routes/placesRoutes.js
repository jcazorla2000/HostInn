const express = require("express");
const router = express.Router();
const Place = require("../models/Place")
const User = require("../models/User")

router.get("/create", (_, res) => res.render("places/create"))

router.post("/create", (req, res) => {
  const { id } = req.user
  //const { secure_url, originalname } = req.file;
  Place.create({hostID: id, ...req.body})
    .then( result => {
      User.findByIdAndUpdate(id, {$push: {places : result.id}})
        .then( user => res.redirect("/places/create"))
        .catch(err => console.error(err))
    })
    .catch(err => console.log(err))
})

module.exports = router