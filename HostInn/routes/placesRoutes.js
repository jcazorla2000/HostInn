const express = require("express");
const router = express.Router();
const Place = require("../models/Place")

router.get("/create", (_, res) => res.render("places/create"))

router.post("/create", (req, res) => {
  const { _id } = req.user
  Place.create({hostID: _id, ...req.body})
    .then( () => res.redirect("/places/create"))
    .catch(err => console.log(err))
})

module.exports = router