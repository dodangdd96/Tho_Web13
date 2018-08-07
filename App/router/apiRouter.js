const express = require("express");
const router = express.Router();
const GameModel = require("../models/gameModels");

router.use(function (req, res, next) {
    console.log("Api Router");
    next();
});

router.post("/create", function (req, res) {
    let newGame = ({
        player1: {
            name: req.body.name1
        },

        player2: {
            name: req.body.name2
        },

        player3: {
            name: req.body.name3
        },

        player4: {
            name: req.body.name4
        }
    });
    GameModel.create(newGame, function (err, gameCreated) {
        if (err) res.status(500).send({ success: 0, errMsg: err })
        else res.status(201).send({ success: 1, gameID: gameCreated._id });
    });
});

module.exports = router;