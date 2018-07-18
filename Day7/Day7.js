const express = require("express");
const hbs = require("express-handlebars");
const fs = require('fs');
// const questionList = require("./question.json");
const bodyParser = require('body-parser');
const questionRouter = require('./router/questionRouter');
const QuestionModel = require('./models/questionModel');
const mongoose = require('mongoose');

let app = express();

app.engine("handlebars", hbs({ defaultLayout: "header" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));    //cỨ dùng, đừng hỏi, kiểu cho client bắt được HTML của mình

app.use(express.static("public"));
app.use("/question", questionRouter);

app.get('/', function (req, res) {
    // let questionRandom = questionList[(Math.floor(Math.random() * questionList.length))];
    // res.render("DapGon", {
    //     ques: questionRandom
    // });

    QuestionModel.countDocuments({}, function (err, count) {
        if (err) console.log(err)
        else {
            var random = Math.floor(Math.random()*count);
        }
        QuestionModel.find({}, function (err, result) {
            if (err) console.log(err)
            else res.render("DapGon", {
                ques: result[random]
            });
        });
    });
});

app.get('/ask', function (req, res) {
    res.render("HoiNhanh");
});

app.get("/answer/:questionID/:vote", function (req, res) {
    // let question = questionList[req.params.questionID];
    // question[req.params.vote] += 1;
    // questionList[req.params.questionID - 1][req.params.vote] += 1;                  //cái -1 op 
    // fs.writeFileSync("./question.json", JSON.stringify(questionList));
    // res.redirect("/question/" + req.params.questionID);
    if (req.params.vote == "yes") {
        QuestionModel.findByIdAndUpdate({ _id: req.params.questionID }, { $inc: { 'yes': 1 } }, function (result) {
            if (result) console.log(result)
            else res.redirect("/question/" + req.params.questionID);
        });
    }
    else {
        QuestionModel.findByIdAndUpdate({ _id: req.params.questionID }, { $inc: { 'no': 1 } }, function (result) {
            if (err) console.log(result)
            else res.redirect("/question/" + req.params.questionID);
        });
    }
});

mongoose.connect("mongodb://localhost:27017/quyetde", { useNewUrlParser: true }, function (err) {
    if (err) console.log(err)
    else console.log("DB connect success!");
});

app.listen(8080, function (err) {
    if (err) console.error(err)
    else console.log("Server is listening at port 8080");
});





