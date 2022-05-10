const express = require('express');
const {getI18nUiElements} = require("../services/i18n-ui-elements-service");

const router = express.Router();

router.get('/', async function (req, res, next) {
    let i18nUiElements = await getI18nUiElements(req.query.lang);
    res.send(JSON.stringify(i18nUiElements));
});

module.exports = router;
