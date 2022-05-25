const express = require('express');
const router = express.Router();

const dayjs = require("dayjs");
const {signup, login, generateAccessToken} = require('../services/users-service');

router.post('/signup', async function (req, res, next) {
    await signup(req.body)
    res.sendStatus(200);
});

router.post("/login", async function (req, res, next) {
    const loginResult = await login(req.body);
    if (loginResult) {
        const token = generateAccessToken(req.body.username);

        res.cookie("jwtToken", token, {
            secure: process.env.NODE_ENV !== "dev",
            httpOnly: true,
            expires: dayjs().add(7, "days").toDate(),
        });

        res.send();
    } else {
        res.status(401).send('Wrong login or password!');
    }
});

module.exports = router;
