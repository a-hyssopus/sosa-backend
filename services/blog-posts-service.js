const mongoose = require("../config/mongo-config");
const BlogPosts = require("../schemas/blog-post");
const EntityNotFoundError = require("../error/EntityNotFoundError");

const BlogPostsModel = mongoose.model('BlogPosts', BlogPosts, 'blog-posts');

// TODO Error Handling
exports.getBlogPosts = function () {
    return BlogPostsModel.find().lean();
}

exports.saveBlogPost = async function (blogPost) {
    let blogPostToSave = await BlogPostsModel.create(blogPost);
    return await blogPostToSave.save();
}

exports.getBlogPost = async function (id) {
    let blogPostById = await BlogPostsModel.findById(id).lean();
    if (!blogPostById) throw new EntityNotFoundError(`Blog: ${id} doesn't exist!`);
    return blogPostById;
}

exports.updateBlogPost = async function (id, updatedFields) {
    let updatedBlogPost = await BlogPostsModel.findOneAndUpdate({_id: id}, updatedFields);
    if (!updatedBlogPost) throw new EntityNotFoundError(`Blog: ${id} doesn't exist!`);
    return updatedBlogPost;
}

exports.deleteBlogPost = function (id) {
    BlogPostsModel.findByIdAndDelete(id);
}
