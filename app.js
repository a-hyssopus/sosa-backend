const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('./config/mongo-config')
const cors = require('cors');

const blogPostsRouter = require('./routes/blog-posts');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//TODO insert from env
app.use(cookieParser('password'));
app.use(express.static(path.join(__dirname, 'public')));

// TODO insert from env
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(function (req, res, next) {
    res.contentType('application/json');
    next();
});

app.use('/blog-posts', blogPostsRouter);

module.exports = app;
