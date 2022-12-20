const express = require('express');
const router = express.Router();
const allData = require('../controller/allData');

router.get('/getAllData', allData.getAllData);
router.get('/getRegionEmissionYear', allData.getRegionEmissionYear); // 지역배출량 연도
router.post('/getRegionEmission', allData.getRegionEmission); // 지역배출량
router.get('/getRegionVariationYear', allData.getRegionVariationYear); // 증감량 연도
router.post('/getRegionVariation', allData.getRegionVariation); // 증감량
router.get('/getEnterpriseEmission', allData.getEnterpriseEmission); // 참여기업 조회
router.post('/postLatLng', allData.postLatLng); // 위, 경도 저장
router.get('/getInternationalEmission', allData.getInternationalEmission); // 국제 배출량

router.get('/getTargetEmissions', allData.getTargetEmissions);
router.get('/getTradeEmissions', allData.getTradeEmissions);

module.exports = router
