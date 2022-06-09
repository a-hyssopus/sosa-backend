const express = require('express');
const path = require('path');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const mongoose = require('./config/mongo-config')
const logger = require('./config/log-config')
const bodyParser = require("body-parser")
const cors = require('cors');

const blogPostsRouter = require('./routes/blog-posts-route');
const i18nRouter = require('./routes/i18n-route');
const sharedUiElementsRouter = require('./routes/shared-ui-elements-route')
const paymentDetailsRouter = require('./routes/payment-details-route')
const usersRouter = require('./routes/users-route')
const reportsRouter = require('./routes/reports-route')
const faqRouter = require('./routes/faq-route')
const aboutRouter = require('./routes/about-us-route')
const handleError = require("./routes/error-handler-route");
const compression = require("compression");
const helmet = require("helmet");

const app = express();

app.use(morgan('combined'));
app.use(compression());
app.use(helmet())
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
//TODO insert from env
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));

// TODO insert from env
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use((req, res, next) => {
    // NOTE: Exclude TRACE and TRACK methods to avoid XST attacks.
    const allowedMethods = [
        "OPTIONS",
        "HEAD",
        "CONNECT",
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH",
    ];

    if (!allowedMethods.includes(req.method)) {
        res.status(405).send(`${req.method} not allowed.`);
    }

    next();
});

app.use(function (req, res, next) {
    res.contentType('application/json');
    next();
});

app.use('/shared-ui-elements', sharedUiElementsRouter);
app.use('/i18n', i18nRouter);
app.use('/payment-details', paymentDetailsRouter);
app.use('/blog-posts', blogPostsRouter);
app.use('/reports', reportsRouter);
app.use('/faq', faqRouter);
app.use('/about', aboutRouter);
app.use('/users', usersRouter);
app.use(handleError)

module.exports = app;
