const mongoose = require("../config/mongo-config");

const Schema = mongoose.Schema;


const CardSchema = new Schema({
    count: {type: String, required: true},
    person: {type: String, required: true},
    currency: {type: String, required: true},
})

const BanksSchema = new Schema({
    "name": {type: String, required: true},
    "primary-color": {type: String, required: true},
    "secondary-color": {type: String, required: true},
    "text-color": {type: String, required: true},
    link: {type: String},
    "cards": [CardSchema],
    _id: false
})

const PayPalSchema = new Schema({
    "primary-color": {type: String, required: true},
    "secondary-color": {type: String, required: true},
    "text-color": {type: String, required: true},
    link: {type: String},
    "counts": {
        type:
            [{
                country: {type: String, required: true},
                email: {type: String, required: true},
            }]
    }
})

const InPersonSchema = new Schema({
    person: {type: String, required: true},
    "mobile-number": {type: String, required: true}
})

const PaymentDetailsSchema = new Schema({
    banks: [BanksSchema],
    PayPal: PayPalSchema,
    inPerson: [InPersonSchema],
})

module.exports = {
    CardSchema,
    BanksSchema,
    PaymentDetailsSchema
};
