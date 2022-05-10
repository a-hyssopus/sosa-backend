const mongoose = require("mongoose");
const config = require("config");
const logger = require("./log-config");

mongoose.connect(config.get("db.url"), {user: config.get("db.user"), pass: config.get("db.password"), dbName: "sosa"});

const db = mongoose.connection;
db.on('error', function callback(err) {
    logger.error('Failed to connect to Mongo!')
});
db.once('open', function callback() {
    logger.info("Connected to Mongo!");
});

module.exports = mongoose;
