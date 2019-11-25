const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/map/locations", (req,res, next) => {
  res.render("map/locations")
})

module.exports = router;
