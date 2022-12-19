const express = require('express');
const router = express.Router();
const allData = require('../controller/allData');

router.get('/getAllData', allData.getAllData);
router.get('/getRegionEmissionYear', allData.getRegionEmissionYear); // 지역배출량 연도
router.post('/getRegionEmission', allData.getRegionEmission); // 지역배출량

module.exports = router
