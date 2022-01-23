const mongoose = require('mongoose');

let inventoriesSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
}, { timestamps: true, usePushEach: true });

const Inventories = new mongoose.model('Inventories', inventoriesSchema);
module.exports = Inventories;