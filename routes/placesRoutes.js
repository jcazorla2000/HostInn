const express = require("express");
const router = express.Router();
const Place = require("../models/Place")
const User = require("../models/User")
const uploadCloud = require("../config/cloudinary")

router.get("/create", (_, res) => res.render("places/create"))

router.post("/create", uploadCloud.single("photo"),  (req, res) => {
  const { id } = req.user
  if (req.file) {
    const { secure_url, originalname } = req.file;
    const { price, startDate, endDate, description, address} = req.body
    if (price === "" || startDate === "" || endDate === "" || description === "" || address === "" ){
      res.render(`places/create`, { message: "Campos sin rellenar" });
      return;
    }
    Place.create({hostID: id, imgName: originalname, imgPath: secure_url, ...req.body})
      .then( result => {
        User.findByIdAndUpdate(id, {$push: {places : result.id}})
          .then( user => res.redirect("/places/create"))
          .catch(err => console.error(err))
      })
      .catch(err => console.log(err))
  }
  else {
    const { price, startDate, endDate, description, address} = req.body
    if (price === "" || startDate === "" || endDate === "" || description === "" || address === "" ){
      res.render("places/create", { message: "Campos sin rellenar" });
      return;
    }
    Place.create({hostID: id, ...req.body})
      .then( result => {
        User.findByIdAndUpdate(id, {$push: {places : result.id}})
          .then( user => res.redirect("/places/create"))
          .catch(err => console.error(err))
      })
      .catch(err => console.log(err))
  }
})

module.exports = router