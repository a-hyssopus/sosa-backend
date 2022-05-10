const mongoose = require("../config/mongo-config");

const Schema = mongoose.Schema;

const PaymentMethods = new Schema({
    text: {type: String},
    primaryColor: {type: String, required: true},
    secondaryColor: {type: String, required: true}, // string with hex value
});

module.exports = PaymentMethods;
