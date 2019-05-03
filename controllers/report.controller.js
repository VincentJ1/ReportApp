const Report = require('../models/report.model');
var appRoot = require('app-root-path');
const mongoose = require('mongoose');
const db = mongoose.connection;

//Simple version, without validation or sanitation
exports.index = function (req, res) {
    res.sendFile(appRoot + '/index.html');
};

exports.report_create = function (req, res) {
    let report = new Report(
        {
            name: req.body.name,
            description: req.body.description,
            severity: req.body.severity,
            assignedto: req.body.assignedto,
            status: 'open'
           
        }
    );
    console.log(report);
    report.save(function (err) {
        if (err) {
            return (err);
        }
        res.sendFile(appRoot + '/index.html');
    })
};


exports.report_details = function (req, res, next) {
    Report.findById(req.params.id, function (err, report) {
        if (err) return next(err);
        res.send(report);
    })
};


exports.report_update = function (req, res) {
    Report.findByIdAndUpdate(req.params.id, {$set: {status: 'closed'}}, function (err, report, next) {
        if (err) return (err);
        res.send('Report updated.');
    });
};

exports.report_delete = function (req, res) {
    Report.findByIdAndRemove(req.params.id, function (err) {
        if (err) return (err);
        res.send('Deleted successfully!');
    });
};


