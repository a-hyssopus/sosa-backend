const express = require('express');
const router = express.Router();

const mongoose = require("../config/mongo-config");
const {getAboutUs} = require('../services/about-us-service')

router.get('/', async function (req, res, next) {
    let aboutUsText = await getAboutUs(req.query.lang);
    res.send(JSON.stringify((aboutUsText)));
})

module.exports = router;
