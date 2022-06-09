const mongoose = require("../config/mongo-config");
const AboutUsSchema = require("../schemas/about-us-schema");

const AboutUsModel = mongoose.model('AboutUs', AboutUsSchema, 'about-us');

exports.getAboutUs = function (language) {
    return AboutUsModel.findOne({}).select(language).lean();
}

