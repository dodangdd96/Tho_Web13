const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const apiRouter = require('./routers/apiRouter');

let app = express();

app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json()); //<- nani? we are using mongoose right?

app.use("/api", apiRouter);

app.get("/", function (req, res) {
    res.send("<p>Banana</p>");
});

const port = 8080;

mongoose.connect("mongodb://localhost:27017/techkids-hotgirl",  {useNewUrlParser: true}, function (err) {
    if (err) console.log(err)
    else console.log("DB connect success!");
});

app.listen(port, function (err) {
    if (err) console.log(err)
    else console.log(`Server is listening at ${port}`);
});


