const express = require('express');
const router = express.Router();
const allData = require('../controller/allData');

router.get('/getAllData', allData.getAllData);

module.exports = router
