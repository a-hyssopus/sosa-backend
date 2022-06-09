const mongoose = require("../config/mongo-config");
const FAQSchema = require("../schemas/faq-schema");

const FAQModel = mongoose.model('FAQ', FAQSchema, 'faq');

exports.getFAQ = function (language) {
    return FAQModel.findOne({}).select(language).lean();
}
