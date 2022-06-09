const mongoose = require("../config/mongo-config");
const I18n = require("../schemas/i18n-schema");
const HttpClientError = require("../error/HttpClientError");

const i18nUIElementsModel = mongoose.model("I18nElements", I18n, "i18n")

exports.getI18nUiElements = async function (language) {
    let i18nUiElements = await i18nUIElementsModel.findOne({}).select(language).lean();

    if (!i18nUiElements[language]) {
        throw new HttpClientError(`No such language: ${language} supported!`)
    }

    return i18nUiElements;
}
