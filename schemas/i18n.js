const mongoose = require("../config/mongo-config");

const Schema = mongoose.Schema;

const languageSchema = new Schema({
    type: Object,
    "navbar": Array,
    "hero-message": String,
    "sterilization-text": String,
    "donate-button": String,
    "save-button": String,
    "delete-button": String,
})

const I18n = new Schema({
    "en": languageSchema,
    "ro": languageSchema,
    "ru": languageSchema
});

module.exports = I18n;
