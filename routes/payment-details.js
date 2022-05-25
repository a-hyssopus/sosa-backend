const express = require('express');
const router = express.Router();
const {getPaymentDetails, updateCardInfo, saveCard, saveBank} = require('../services/payment-details-service')
const mongoose = require("../config/mongo-config");
const {authenticateToken} = require("../services/users-service");

router.get('/', async function (req, res, next) {
    let paymentDetails = await getPaymentDetails();
    res.send(JSON.stringify(paymentDetails));
});

router.post('/', authenticateToken, async function (req, res, next) {
    res.send(JSON.stringify(await saveCard(req.body)));
});

router.patch('/:id', authenticateToken, async function (req, res, next) {
    res.send(JSON.stringify(await updateCardInfo(req.params.id, req.body)));
});

module.exports = router;
