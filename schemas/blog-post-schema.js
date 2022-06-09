const mongoose = require("../config/mongo-config");

const Schema = mongoose.Schema;

const i18nPostField = new Schema({
    title: {type: String, required: true, trim: true},
    text: {type: String, required: true, trim: true},
    _id: false
})

const BlogPosts = new Schema({
    type: Object,
    date: {type: Date, required: true, trim: true},
    "image-src": {type: String, trim: true},
    en: i18nPostField,
    ro: i18nPostField,
    ru: i18nPostField,
});

module.exports = BlogPosts;
