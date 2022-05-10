const mongoose = require("../config/mongo-config");

const Schema = mongoose.Schema;

const SharedUIElements = new Schema({
    "sterilization-counter": Number,
})

module.exports = SharedUIElements;
