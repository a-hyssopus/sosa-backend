const mongoose = require("../config/mongo-config");

const Schema = mongoose.Schema;

const SharedUiElementsSchema = new Schema({
    "sterilization-counter": {type: Number},
})

module.exports = SharedUiElementsSchema


