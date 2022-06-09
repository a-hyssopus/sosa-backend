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

        const cookiesOptions = {
            httpOnly: true,
            expires: dayjs().add(7, "days").toDate(),
            path: '/'
        };

        if (process.env.NODE_ENV !== "dev") {
            cookiesOptions.sameSite = 'None';
            cookiesOptions.secure = true
        }

        res.cookie("jwtToken", token, cookiesOptions);

        res.cookie("isLoggedIn", true, {
            httpOnly: false,
            expires: dayjs().add(7, "days").toDate(),
        });

        res.status(200).send('Logged in');
    } else {
        res.status(401).send('Wrong login or password!');
    }
});

router.post("/logout", async function (req, res, next) {
    const cookiesOptions = {
        httpOnly: true,
        path: '/'
    };
    if (process.env.NODE_ENV !== "dev") {
        cookiesOptions.sameSite = 'None';
        cookiesOptions.secure = true
    }

    res.clearCookie('jwtToken', cookiesOptions).send();
    res.clearCookie('isLoggedIn', {
        httpOnly: false,
    }).send();

    res.status(200).send('Logged out');
});

module.exports = router;
