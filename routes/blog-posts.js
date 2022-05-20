const express = require('express');
const router = express.Router();
const {getBlogPosts, saveBlogPost, getBlogPost, deleteBlogPost, updateBlogPost} = require("../services/blog-posts-service");
const mongoose = require("../config/mongo-config");

router.get('/', async function (req, res, next) {
    let blogPosts = await getBlogPosts(req.query.lang);
    res.send(JSON.stringify(blogPosts));
});

router.post('/', async function (req, res, next) {
    const id = new mongoose.Types.ObjectId();
    const postWithId = {...req.body, id};
    res.send(JSON.stringify(await saveBlogPost(req.body, req.query.lang)));
});

router.get('/:id', async function (req, res, next) {
    let blogPost = await getBlogPost(req.params.id, req.query.lang);
    res.send(JSON.stringify(blogPost));
});

router.delete('/:id', async function (req, res, next) {
    deleteBlogPost(req.params.id);
    res.status(204).send();
})

router.patch('/:id', async function (req, res, next) {
    res.send(JSON.stringify(await updateBlogPost(req.params.id, req.query.lang, req.body)))
});

module.exports = router;
