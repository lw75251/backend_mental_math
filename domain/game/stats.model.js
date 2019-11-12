const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let gameStatSchema = new Schema({
    userId: Schema.Types.ObjectId,
    date: {type: Date, default: Date.now},
    type: {type: String, enum: ["Add", "Subtract", "Multiply", "Divide"]},
    difficulty: {type: String, enum: ["Easy", "Medium", "Hard"]},
    stats: {
        score: Number,
        correct: Number,
        wrong: Number,
    },
});

module.exports = mongoose.model('GameStat', gameStatSchema);