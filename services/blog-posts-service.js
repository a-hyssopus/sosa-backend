const mongoose = require("../config/mongo-config");
const BlogPosts = require("../schemas/blog-post");

const BlogPostsModel = mongoose.model('BlogPosts', BlogPosts, 'blog-posts');

// TODO Error Handling
exports.getBlogPosts = function() {
    return BlogPostsModel.find().lean();
}

exports.saveBlogPost = async function (blogPost) {
    let blogPostToSave = await BlogPostsModel.create(blogPost);
    return await blogPostToSave.save();
}

exports.getBlogPost = function (id) {
    return BlogPostsModel.findById(id);
}

exports.updateBlogPost = function (id, updatedFields) {
    return BlogPostsModel.findOneAndUpdate({_id: id}, updatedFields);
}

exports.deleteBlogPost = function (id) {
    BlogPostsModel.findByIdAndDelete(id);
}
