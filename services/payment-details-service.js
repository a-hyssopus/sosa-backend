const mongoose = require("../config/mongo-config");
const {PaymentDetailsSchema} = require("../schemas/payment-details-schema");
const EntityNotFoundError = require("../error/EntityNotFoundError");

const PaymentDetailsModel = mongoose.model('PaymentDetails', PaymentDetailsSchema, 'payment-details');

exports.getPaymentDetails = function () {
    return PaymentDetailsModel.findOne().lean();
}

exports.saveCard = async function (cardInfoDTO) {
    // TODO check whether can be implemented with .filter() instead of map + indexOf
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

// TODO update bank info

exports.deleteCardInfo = async function (cardInfoDTO) {
    const paymentDetails = await PaymentDetailsModel.findOne().lean();
    const bankIndex = paymentDetails.banks.map(bank => bank.name).indexOf(cardInfoDTO.name);
    const cardToDeleteIndex = paymentDetails.banks[bankIndex].cards.map(card => card._id.toString()).indexOf(cardInfoDTO.id)
    if (paymentDetails.banks[bankIndex].cards.length === 1) {
        paymentDetails.banks.splice(bankIndex, 1)
    } else {
        paymentDetails.banks[bankIndex].cards.splice(cardToDeleteIndex, 1);
    }
    return PaymentDetailsModel.updateOne(paymentDetails);
}

exports.savePaypal = async function (paypalInfoDTO) {
    const paymentDetails = await PaymentDetailsModel.findOne({}).lean();
    paymentDetails.PayPal.counts.push(paypalInfoDTO);
    return PaymentDetailsModel.updateOne(paymentDetails);
}

exports.updatePaypal = async function (id, paypalInfoDTO) {
    const paymentDetails = await PaymentDetailsModel.findOne({}).lean();
    const paypalToUpdateIndex = paymentDetails.PayPal.counts.map(count => count._id.toString()).indexOf(id)
    paymentDetails.PayPal.counts[paypalToUpdateIndex] = paypalInfoDTO;
    return PaymentDetailsModel.updateOne(paymentDetails);
}

exports.deletePaypal = async function (id) {
    const paymentDetails = await PaymentDetailsModel.findOne().lean();
    const paypalToDeleteIndex = paymentDetails.PayPal.counts.map(count => count._id.toString()).indexOf(id)
    paymentDetails.PayPal.counts.splice(paypalToDeleteIndex, 1);
    return PaymentDetailsModel.updateOne(paymentDetails);
}

exports.savePerson = async function (personInfoDTO) {
    const paymentDetails = await PaymentDetailsModel.findOne().lean();
    paymentDetails.inPerson.push(personInfoDTO);
    return PaymentDetailsModel.updateOne(paymentDetails);
}

exports.updatePerson = async function (id, personInfoDTO) {
    const paymentDetails = await PaymentDetailsModel.findOne().lean();
    const personToUpdateIndex = paymentDetails.inPerson.map(person => person._id.toString()).indexOf(id)
    paymentDetails.inPerson[personToUpdateIndex] = personInfoDTO;
    return PaymentDetailsModel.updateOne(paymentDetails);
}

exports.deletePerson = async function (id) {
    const paymentDetails = await PaymentDetailsModel.findOne().lean();
    const personToDeleteIndex = paymentDetails.inPerson.map(person => person._id.toString()).indexOf(id)
    paymentDetails.inPerson.splice(personToDeleteIndex, 1);
    return PaymentDetailsModel.updateOne(paymentDetails);
}
