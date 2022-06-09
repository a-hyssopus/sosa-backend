const mongoose = require("../config/mongo-config");
const ReportsSchema = require("../schemas/reports-schema");
const EntityNotFoundError = require("../error/EntityNotFoundError");

const ReportModel = mongoose.model('Reports', ReportsSchema, 'reports');

exports.getReports = function (language) {
    return ReportModel.find().select(['_id', 'images', 'sterilized', 'period', 'money', language]).lean();
}

exports.saveReport = async function (reportDTO) {
    let reportToSave = await ReportModel.create(reportDTO);
    return await reportToSave.save();
}

exports.getReport = async function (id, language) {
    let report = await ReportModel.findById(id).select(['_id', 'images', 'sterilized', 'period', 'money',language]).lean();
    if (!report) throw new EntityNotFoundError(`Blog: ${id} doesn't exist!`);
    return report;
}

exports.updateReport = async function (id, updatedFields) {
    let updatedReport = await ReportModel.findOneAndUpdate({_id: id}, updatedFields);
    if (!updatedReport) throw new EntityNotFoundError(`Blog: ${id} doesn't exist!`);
    return updatedReport;
}

exports.deleteReport = async function (id) {
    await ReportModel.deleteOne({_id: id});
}
