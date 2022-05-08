const mongoose = require("mongoose");
const logger = require('morgan');

//TODO from env
mongoose.connect('mongodb://localhost:27017', {user: "admin", pass:"password", dbName:"sosa"});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error:'));
db.once('open', function callback () {
    //TODO replace with proper logging
    console.log("Connected to Mongo!");
});

module.exports = mongoose;
