const express = require('express');
const router = express.Router();
const report_controller = require('../controllers/report.controller');

router.get('/', report_controller.index);
router.post('/', report_controller.report_create);
router.get('/:id', report_controller.report_details); 
router.put('/:id', report_controller.report_update);
router.delete('/:id', report_controller.report_delete); 


module.exports = router;