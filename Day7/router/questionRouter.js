const express = require("express");
const router = express.Router();
const QuestionModel = require("../models/questionModel");
// router = localhost:8080/question
//app.get() all = get + post + ..., 

//query localhost:8080/question?questionID=1&hello=true -> có 2 query: questionID và hello, hay dùng trong tìm kiếm
// router.get("/", function (req, res) {                           // dấu hỏi (?) là bắt đầu lấy query nhưng phải tự gõ trên link và phải sửa cả ở trong DapGon
//     let question1 = questionList[req.query.questionID - 1];
//     res.render('result', {
//         ques: question1,
//         totalVote: question1.yes + question1.no
//     });
// });

//param = cắt nhỏ code xem phần nào cần thay thế, giống cái parameter trong C, param chỉ lấy 1 giá trị thôi,
router.get('/:questionID', function (req, res) {                    //dấu hai chấm ":" nhé VD: localhost:8080/question/999/88 thì ID = 999
    QuestionModel.find({ _id: req.params.questionID }, function (err, result) {
        if (err) console.log(err)
        else res.render('result', {
            ques: result[0],                    // <- this piece of shit is an object
            totalVote: result[0].yes + result[0].no
        });
    });
});


router.post("/add", function (req, res) {
    let newQuestion = ({
        content: req.body.questionContent
    })
    QuestionModel.create(newQuestion, function (err, questionCreated) {
        if (err) console.log(err)
        else res.redirect('/question/' + questionCreated._id);        //torng mongo id là _id
    });

});



module.exports = router;






