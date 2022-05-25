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
    if (bankIndex !== -1 && paymentDetails.banks[bankIndex].cards.length === 1) {
         paymentDetails.banks.splice(bankIndex, 1);
    }

    let updatedCardsInfo = await PaymentDetailsModel.findOneAndUpdate({"card.count": cardInfoDTO.count}, {"banks.cards": cardInfoDTO});
    if (!updatedCardsInfo) throw new EntityNotFoundError(`Card: ${cardInfoDTO.count} doesn't exist!`);
    return updatedCardsInfo;
}


