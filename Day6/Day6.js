const express = require("express");
const hbs = require("express-handlebars");
const fs = require('fs');
const questionList = require("./question.json");
const bodyParser = require('body-parser');

let app = express();

app.engine("handlebars", hbs({ defaultLayout: "header" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
// Object.size = function (obj) {                                           //dùng fs
//     var size = 0, key;
//     for (key in obj) {
//         if (obj.hasOwnProperty(key)) size++;
//     }
//     return size;
// };

// app.get('/', function (req, res) {
//     var arr = JSON.parse(fs.readFileSync("question.JSON"));
//     let random = Math.floor(Math.random() * (Object.size(arr)-1))+1;    
//     res.render("DapGon", {
//         string: arr[random]
//     });
// });

app.get('/', function (req, res) {
    let questionRandom = questionList[(Math.floor(Math.random() * questionList.length))];
    res.render("DapGon", {
        ques: questionRandom
    });
});

app.get('/ask', function (req, res) {
    res.render("HoiNhanh");
});

//param = cắt nhỏ code xem phần nào cần thay thế, giống cái parameter trong C, param chỉ lấy 1 giá trị thôi,
app.get('/question/:questionID', function (req, res) {                    //dấu hai chấm ":" nhé VD: localhost:8080/question/999/88 thì ID = 999
    let question1 = questionList[req.params.questionID - 1];
    res.render('result', {
        ques: question1,
        totalVote: question1.yes + question1.no
    });
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/question/add", function (req, res) {
    let newQuestion = ({
        content: req.body.questionContent,
        yes: 0,
        no: 0,
        id: questionList.length + 1
    })
    questionList.push(newQuestion);
    res.redirect('/question/' + newQuestion.id);
});

// //query localhost:8080/question?questionID=1&hello=true -> có 2 query: questionID và hello, hay dùng trong tìm kiếm
// app.get('/question', function(req, res){                   // dấu hỏi (?) là bắt đầu lấy query nhưng phải tự gõ trên link và phải sửa cả ở trong DapGon
//     let question1 = questionList[req.params.questionID-1];
//     res.render('result', {
//         ques: question1,
//         totalVote: question1.yes + question1.no
//     });
// });

app.get("/answer/:questionID/:vote", function (req, res) {
    // let question = questionList[req.params.questionID];
    // question[req.params.vote] += 1;
    questionList[req.params.questionID - 1][req.params.vote] += 1;                  //cái -1 op 
    fs.writeFileSync("./question.json", JSON.stringify(questionList));
    res.redirect("/question/" + req.params.questionID);
});

app.listen(8080, function (err) {
    if (err) console.error(err)
    else console.log("Server is listening at port 8080");
});




