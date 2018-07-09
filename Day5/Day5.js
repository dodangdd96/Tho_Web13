const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const fs = require('fs');

let app = express();

app.engine("handlebars", hbs({ defaultLayout: "header" }));
app.set("view engine", "handlebars");

Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

app.get('/', function (req, res) {
    var arr = JSON.parse(fs.readFileSync("question.JSON"));
    let random = Math.floor(Math.random() * (Object.size(arr)-1))+1;    
    res.render("DapGon", {
        string: arr[random]
    });
});


app.get('/ask', function (req, res) {
    res.render("HoiNhanh");
});

app.use(express.static("public"));

app.listen(8080, function (err) {
    if (err) console.error(err)
    else console.log("Server is listening at port 8080");
});




