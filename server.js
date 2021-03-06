var express = require("express");

require("dotenv").config();
var db = require("./models");

var app = express();

app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var routes = require("./controllers/burger.js");

app.use(routes);


var PORT = process.env.PORT || 3000;
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App now listening on port:", PORT);
  });
});
