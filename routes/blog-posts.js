const express = require('express');
const router = express.Router();
const {getBlogPosts, saveBlogPost, getBlogPost, deleteBlogPost, updateBlogPost} = require("../services/blog-posts-service");

router.get('/', async function (req, res, next) {
    let blogPosts = await getBlogPosts();
    res.send(JSON.stringify({data: blogPosts}));
});

router.post('/', async function (req, res, next) {
    res.send(JSON.stringify(await saveBlogPost(req.body)));
});

router.get('/:id', async function (req, res, next) {
    let blogPost = await getBlogPost(req.params.id);
    res.send(JSON.stringify({data: blogPost}));
});

router.delete('/:id', async function (req, res, next) {
    deleteBlogPost(req.params.id);
    res.status(204).send();
})

router.patch('/:id', async function (req, res, next) {
    res.send(JSON.stringify(await updateBlogPost(req.params.id, req.body)))
});

module.exports = router;
