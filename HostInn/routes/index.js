const express = require('express');
const router  = express.Router();
const Place = require("../models/Place")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/map/locations", async (req,res, next) => {
  places = await Place.find()
  res.render("map/locations", {places})
  console.log(places)
})

module.exports = router;
