const mongoose = require("../config/mongo-config");

const Schema = mongoose.Schema;

const FAQ = new Schema({
    en: String,
    ro: String,
    ru: String
})

module.exports = FAQ;
