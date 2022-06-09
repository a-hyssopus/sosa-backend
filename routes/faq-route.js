const express = require('express');
const router = express.Router();

const mongoose = require("../config/mongo-config");
const {getFAQ} = require('../services/faq-service')

router.get('/', async function (req, res, next) {
    let faqText = await getFAQ(req.query.lang);
    res.send(JSON.stringify((faqText)));
})

module.exports = router;
