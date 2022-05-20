const express = require('express');
const path = require('path');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const mongoose = require('./config/mongo-config')
const logger = require('./config/log-config')
const bodyParser = require("body-parser")
const cors = require('cors');

const blogPostsRouter = require('./routes/blog-posts');
const i18nRouter = require('./routes/i18n');
const sharedUiElementsRouter = require('./routes/shared-ui-elements')
const handleError = require("./routes/error-handler");


const app = express();

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
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

app.use('/shared-ui-elements', sharedUiElementsRouter);
app.use('/i18n', i18nRouter);
app.use('/blog-posts', blogPostsRouter);

app.use(handleError)

module.exports = app;
