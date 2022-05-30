const mongoose = require("../config/mongo-config");
const {PaymentDetailsSchema, CardSchema, BanksSchema} = require("../schemas/payment-details");
const EntityNotFoundError = require("../error/EntityNotFoundError");

const PaymentDetailsModel = mongoose.model('PaymentDetails', PaymentDetailsSchema, 'payment-details');

exports.getPaymentDetails = function () {
    return PaymentDetailsModel.findOne().lean();
}

exports.saveCard = async function (cardInfoDTO) {
    const paymentDetails = await PaymentDetailsModel.findOne().lean();
    const bankIndex = paymentDetails.banks.map(bank => bank.name).indexOf(cardInfoDTO.bank.name);
    if (bankIndex === -1) {
        paymentDetails.banks.push(cardInfoDTO.bank);
        delete cardInfoDTO.bank;
        paymentDetails.banks[paymentDetails.banks.length-1].cards.push(cardInfoDTO);
    } else {
        delete cardInfoDTO.bank;
        paymentDetails.banks[bankIndex].cards.push(cardInfoDTO);
    }
    return PaymentDetailsModel.updateOne(paymentDetails);
}

exports.updateCardInfo = async function (cardInfoDTO) {
    const paymentDetails = await PaymentDetailsModel.findOne().lean();
    const bankIndex = paymentDetails.banks.map(bank => bank.name).indexOf(cardInfoDTO.bank.name);
    const cardToUpdateIndex = paymentDetails.banks[bankIndex].cards.map(card => card._id.toString()).indexOf(cardInfoDTO.id)
    paymentDetails.banks[bankIndex].cards[cardToUpdateIndex] = cardInfoDTO;
    return PaymentDetailsModel.updateOne(paymentDetails);
}

exports.deleteCardInfo = async function (cardInfoDTO) {
    const paymentDetails = await PaymentDetailsModel.findOne().lean();
    const bankIndex = paymentDetails.banks.map(bank => bank.name).indexOf(cardInfoDTO.name);
    const cardToDeleteIndex = paymentDetails.banks[bankIndex].cards.map(card => card._id.toString()).indexOf(cardInfoDTO.id)
    paymentDetails.banks[bankIndex].cards.splice(cardToDeleteIndex, 1);
    return PaymentDetailsModel.updateOne(paymentDetails);
}

exports.savePaypal = async function (paypalInfoDTO) {
    const paymentDetails = await PaymentDetailsModel.findOne().lean();
    paymentDetails.PayPal.counts.push(paypalInfoDTO);
    return PaymentDetailsModel.updateOne(paymentDetails);
}
