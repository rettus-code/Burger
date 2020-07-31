
var express = require("express");

var router = express.Router();

var db = require("../models");


router.get("/", function(req, res) {
  
  res.redirect("/burgers");
});


router.get("/burgers", function(req, res) {

  db.Burger.findAll()

    .then(function(data) {
      console.log(data);
      const burgJson = data.map(burger=>burger.toJSON());
      var hbsObject = { burger: burgJson };
      return res.render("index", hbsObject);
    });
});

router.post("/burgers/create", function(req, res) {
  db.Burger.create({
    name: req.body.name
  }).then(function(data) {
      console.log(data);
      res.redirect("/burgers");
    });
});


router.put("/burgers/update/:id", function(req, res) {
  db.Burger.update({
    devoured: true
  },
  {
    where: {
      id: req.params.id
    }
  }
  ).then(function(data) {
    res.json("/burgers");
  });
});

module.exports = router;
