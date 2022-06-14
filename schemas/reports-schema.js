const mongoose = require("../config/mongo-config");

const Schema = mongoose.Schema;

const ReportLanguageField = new Schema({
    title: {type: String, required: true, trim: true},
    text: {type: String, required: true, trim: true},
    _id: false
})

const Report = new Schema({
    type: Object,
    sterilized: {type: Object, trim: true},
    images: {type: Array},
    period: {type: Array},
    money: Number,
    en: ReportLanguageField,
    ro: ReportLanguageField,
    ru: ReportLanguageField,
});

module.exports = Report;
