const express = require("express");
const router = express.Router();
const QuestionModel = require("../models/questionModel");
// router = localhost:8080/question
//app.get() all = get + post + ..., 

//param = cắt nhỏ code xem phần nào cần thay thế, giống cái parameter trong C, param chỉ lấy 1 giá trị thôi,
router.get('/:questionID', function (req, res) {                    //dấu hai chấm ":" nhé VD: localhost:8080/question/999/88 thì ID = 999
    QuestionModel.find({ _id: req.params.questionID }, function (err, result) {
        if (err) console.log(err)
        else if (!result) console.log("Not found")
        else res.render('result', {
            ques: result[0],                    // <- this piece of shit is an object
            totalVote: result[0].yes + result[0].no
        });
    });
});

module.exports = router;






