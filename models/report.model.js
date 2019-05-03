const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReportSchema = new Schema({
        name: {type: String, required: true, max: 100},
        description: {type: String, required: true},
        severity: {type: String, required: true, max: 100},
        assignedto: {type: String, required: true, max: 100},
        status: {type: String, required: true}
});

module.exports = mongoose.model('Report', ReportSchema);