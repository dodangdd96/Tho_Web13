const express = require("express");
const router = express.Router();
const GameModel = require("../models/gameModels");

router.get("/:gameID", function (req, res) {
    GameModel.find({ _id: req.params.gameID }, function (err, result) {
        if (err) console.log(err)
        else if (!result) console.log("Not found")
        else {
            res.render('KetQua', {
                game: result[0]
            });
        };
    });
});

router.get("/:gameID/load", function (req, res) {
    GameModel.find({ _id: req.params.gameID }, function (err, result) {
        if (err) console.log(err)
        else if (!result) console.log("Not found")
        else {
            res.send(result[0]);
        };
    });
});

router.post("/:gameID/save", function (req, res) {
    GameModel.findById({ _id: req.params.gameID }, function (err, gameFound) {

        if (err) console.log(err)
        else if (!gameFound) console.log("Not found")
        else {
            gameFound.player1.point.push(req.body.score1);
            gameFound.player1.total = gameFound.player1.total + parseInt(req.body.score1);

            gameFound.player2.point.push(req.body.score2);
            gameFound.player2.total = gameFound.player2.total + parseInt(req.body.score2);

            gameFound.player3.point.push(req.body.score3);
            gameFound.player3.total = gameFound.player3.total + parseInt(req.body.score3);

            gameFound.player4.point.push(req.body.score4);
            gameFound.player4.total = gameFound.player4.total + parseInt(req.body.score4);

            gameFound.save(function (err) {
                if (err) res.status(500).send({ success: 0, errMsg: err })
                else res.status(201).send({ success: 1, gameID: gameFound._id });
            });
        }
    });
});

module.exports = router;


