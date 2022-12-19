const express = require('express');
const router = express.Router();
const allData = require('../controller/allData');

router.get('/getAllData', allData.getAllData);
router.get('/getTargetEmissions', allData.getTargetEmissions);
router.get('/getTradeEmissions', allData.getTradeEmissions);



module.exports = router
