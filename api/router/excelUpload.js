const express = require('express');
const router = express.Router();
const excelUpload = require('../controller/excelUpload');
const multer = require('multer');

// 파일 업로드
const file_storage = multer.diskStorage({
  destination: function (req, file, cb) {
      switch(file.mimetype){
        case "application/vnd.ms-excel":
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            cb(null, 'static/files');
            break;
        default:
            cb(new Error("rejected"), 'static/files');
            break;
    }
  },
  filename: function (req, file, cb) {
      let fileName = "";
      const original_name = Buffer.from(file.originalname, 'latin1').toString('utf8');
      fileName = `${Date.now() + Math.floor(Math.random() * 1000)}_${original_name}`;
      cb(null, fileName)
  }
});

const file_upload = multer({
  storage: file_storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
    fieldSize: 1024 * 1024 * 11
  }
});

router.post('/uploadYearIndustryEmissions', file_upload.single('file'), excelUpload.uploadYearIndustryEmissions);
router.post('/uploadRegionEmissions', file_upload.single('file'), excelUpload.uploadRegionEmissions);
router.post('/uploadEnterpriseEmissions', file_upload.single('file'), excelUpload.uploadEnterpriseEmissions);
router.post('/uploadTargetTradeEmissions', file_upload.single('file'), excelUpload.uploadTargetTradeEmissions);

module.exports = router
