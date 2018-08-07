const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let GameSchema = new Schema({
    player1: {
        name: { type: String, require: true },
        point: { type: Array, default: [0] },
        total: { type: Number, default: 0 }
    },

    player2: {
        name: { type: String, require: true },
        point: { type: Array, default: [0] },
        total: { type: Number, default: 0 }
    },

    player3: {
        name: { type: String, require: true },
        point: { type: Array, default: [0] },
        total: { type: Number, default: 0 }
    },

    player4: {
        name: { type: String, require: true },
        point: { type: Array, default: [0] },
        total: { type: Number, default: 0 }
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model("Game", GameSchema);