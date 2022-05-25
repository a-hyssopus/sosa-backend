const express = require('express');
const router = express.Router();
const {getSharedUiElements} = require("../services/shared-ui-elements-service");
const mongoose = require("../config/mongo-config");

router.get('/', async function (req, res, next) {
    let sharedUiElements = await getSharedUiElements();
    res.send(JSON.stringify(sharedUiElements));
});

module.exports = router;
