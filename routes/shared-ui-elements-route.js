const express = require('express');
const router = express.Router();
const {getSharedUiElements, updateSterilizationCounter} = require("../services/shared-ui-elements-service");
const mongoose = require("../config/mongo-config");
const {authenticateToken} = require("../services/users-service");

router.get('/', async function (req, res, next) {
    let sharedUiElements = await getSharedUiElements();
    res.send(JSON.stringify(sharedUiElements));
});

router.patch('/:id', authenticateToken, async function (req, res, next) {
    res.send(JSON.stringify(await updateSterilizationCounter(req.params.id, req.body)));
});

module.exports = router;
