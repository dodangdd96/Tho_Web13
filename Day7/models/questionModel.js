const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let QuestionSchema = new Schema({
    content: { type: String, required: true, unique: true}, //require: neu khong co question thi khong duoc, unique: khong co 2 cau hoi giong nhau
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.model("Question", QuestionSchema);





