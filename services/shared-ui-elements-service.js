const mongoose = require("../config/mongo-config");
const SharedUIElements = require("../schemas/shared-ui-elements");

const SharedUIElementsModel = mongoose.model('SharedUIElements', SharedUIElements, 'shared-ui-elements')

exports.getSharedUiElements = function () {
    return SharedUIElementsModel.find({}).lean();
}