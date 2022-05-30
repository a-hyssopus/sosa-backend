const express = require('express');
const router = express.Router();
const {
    getBlogPosts,
    saveBlogPost,
    getBlogPost,
    deleteBlogPost,
    updateBlogPost
} = require("../services/blog-posts-service");
const mongoose = require("../config/mongo-config");
const {authenticateToken} = require("../services/users-service");

router.get('/', async function (req, res, next) {
    let blogPosts = await getBlogPosts(req.query.lang);
    res.send(JSON.stringify(blogPosts));
});

router.post('/', authenticateToken, async function (req, res, next) {
    res.send(JSON.stringify(await saveBlogPost(req.body, req.query.lang)));
});

router.get('/:id', async function (req, res, next) {
    let blogPost = await getBlogPost(req.params.id, req.query.lang);
    res.send(JSON.stringify(blogPost));
});

router.delete('/:id', authenticateToken, async function (req, res, next) {
    await deleteBlogPost(req.params.id);
    res.sendStatus(204);
})

router.patch('/:id', authenticateToken, async function (req, res, next) {
    res.send(JSON.stringify(await updateBlogPost(req.params.id, req.body)))
});

module.exports = router;
