const express = require('express');
const router = express.Router();
const {getPaymentDetails, updateCardInfo, saveCard, deleteCardInfo, savePaypal} = require('../services/payment-details-service')
const mongoose = require("../config/mongo-config");
const {authenticateToken} = require("../services/users-service");

router.get('/', async function (req, res, next) {
    let paymentDetails = await getPaymentDetails();
    res.send(JSON.stringify(paymentDetails));
});

router.post('/', authenticateToken, async function (req, res, next) {
    res.send(JSON.stringify(await saveCard(req.body)));
});

router.patch('/', authenticateToken, async function (req, res, next) {
    res.send(JSON.stringify(await updateCardInfo(req.body)));
});

router.delete('/', authenticateToken, async function (req, res, next) {
    await deleteCardInfo(req.body);
    res.sendStatus(204);
});

router.post('/paypal', authenticateToken, async function (req, res, next) {
    res.send(JSON.stringify(await savePaypal(req.body)));
});


module.exports = router;
