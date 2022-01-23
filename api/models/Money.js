const mongoose = require('mongoose');

let moneySchema = new mongoose.Schema({
    coin: Number,
    cash: Number,
}, { timestamps: true, usePushEach: true });

const Money = new mongoose.model('Money', moneySchema);
module.exports = Money;