const mongoose = require("../config/mongo-config");

const Schema = mongoose.Schema;

const BlogPosts = new Schema({
    author: {type: String, required: true},
    //date: {type: Date, required: true},
    title: {type: String, required: true},
    text: {type: String}
});

module.exports = BlogPosts;
