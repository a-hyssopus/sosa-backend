const mongoose = require("../config/mongo-config");
const SharedUIElements = require("../schemas/shared-ui-elements-schema");

const SharedUIElementsModel = mongoose.model('SharedUIElements', SharedUIElements, 'shared-ui-elements')

exports.getSharedUiElements = function () {
    return SharedUIElementsModel.findOne().lean();
}

exports.updateSterilizationCounter = async function (id, counter) {
    let updatedCounterValue = await SharedUIElementsModel.findOneAndUpdate({_id: id}, counter)
    return updatedCounterValue;
}
