const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const GameModel = require("./models/gameModels");
const apiRouter = require("./router/apiRouter");
const gameRouter = require("./router/gameRouter");

let app = express();

app.engine("handlebars", hbs({ defaultLayout: "header" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use("/game",gameRouter);
app.use("/api",apiRouter);

app.get("/", function (req, res) {
    res.render("DangKi");
});

mongoose.connect("mongodb://localhost:27017/App", { useNewUrlParser: true }, function (err) {
    if (err) console.log(err)
    else console.log("DB connect success!");
});

app.listen(8080, function (err) {
    if (err) console.error(err)
    else console.log("Server is listening at port 8080");
});


