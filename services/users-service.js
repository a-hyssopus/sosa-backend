const mongoose = require("../config/mongo-config");
const UserSchema = require("../schemas/users-schema");
const config = require("config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UsersModel = mongoose.model('Users', UserSchema, 'users');

exports.signup = async function (user) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    (await UsersModel.create(user)).save();
}

exports.login = async function (user) {
    console.log(user)
    console.log(user.password)
    console.log(user['password'])
    const persistedUser = await UsersModel.findOne({username: user.username});
    if (persistedUser) {
        return await bcrypt.compare(user.password, persistedUser.password);
    }
    return false;
}

exports.generateAccessToken = function (username) {
    return jwt.sign(username, config.get("auth.secret"));
}

exports.authenticateToken = function (req, res, next) {
    const cookies = req.cookies;

    if ( !('jwtToken' in cookies) ) {
        return res.status(401).send("Not authenticated!")
    }

    jwt.verify(cookies.jwtToken, config.get("auth.secret"), (err, user) => {
        if (err) {
            return res.status(403).send("Invalid jwt token!");
        }
        req.user = user
        next()
    });
}
