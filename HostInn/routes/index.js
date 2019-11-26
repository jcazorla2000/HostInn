const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/map/locations", (req,res, next) => {
  res.render("map/locations")
})

router.get("/places/create", (req,res, next) => {
  res.render("places/create")
})

router.get("/places/delete", (req,res,next)=>{
  res.render("places/delete")
})

router.get("/places/show", (req,res,next)=>{
  res.render("places/show")
})

router.get("/places/edit", (req,res,next)=>{
  res.render("places/edit")
})

module.exports = router;
