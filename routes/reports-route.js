const express = require('express');
const router = express.Router();

const mongoose = require("../config/mongo-config");
const {authenticateToken} = require("../services/users-service");
const {getReports, saveReport, getReport, updateReport, deleteReport} = require("../services/reports-service");

router.get('/', async function (req, res, next) {
    let reports = await getReports(req.query.lang);
    res.send(JSON.stringify(reports));
});

router.post('/', authenticateToken, async function (req, res, next) {
    res.send(JSON.stringify(await saveReport(req.body, req.query.lang)));
});

router.get('/:id', async function (req, res, next) {
    let report = await getReport(req.params.id, req.query.lang);
    res.send(JSON.stringify(report))
});

router.patch('/:id', authenticateToken, async function (req, res, next) {
    res.send(JSON.stringify(await updateReport(req.params.id, req.body)))
});

router.delete('/:id', authenticateToken, async function (req, res, next) {
    await deleteReport(req.params.id);
    res.sendStatus(204);
})

module.exports = router;
