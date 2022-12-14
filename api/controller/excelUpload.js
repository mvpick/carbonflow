import xlsx from 'xlsx';
import fs from 'fs';
import { excelFilter } from '../utils/excelFilter';
const Year = require('../db/models').year;
const YearEmissions = require('../db/models').yearEmissions;
const IndustryEmissions = require('../db/models').industryEmissions;

export const yearIndustry = async(req, res) => {
  try {
    const file = req.file; // 어드민이 업로드한 파일

    fs.readdir( "static/files", function( error, filelist ) { // 최신파일 유지
      for(let i = 0; i < filelist.length - 1; i++) {
        fs.unlinkSync(`static/files/${ filelist[i] }`);
      }
    });

    const excelFile = xlsx.readFile(file.path);
    const sheetNames = excelFile.SheetNames;
    const sheets = sheetNames.map(item => excelFile.Sheets[item]);
    const deleteKeys = ['구분', '분야·부문/연도'];
    const industryColumns = ['energy', 'process', 'agriculture', 'lulucf', 'waste'];

    const result = sheets.map(item => excelFilter(item, deleteKeys));
    const yearData = result[0][0];
    const industryData = result[1];


// 연도별 배출량
  // await YearEmissions.destroy({
  //   truncate: true
  // })

  //  for await(let item of Object.entries(yearData)) {
  //   const findId = await Year.findOne({
  //     attributes: ['id'],
  //     where: {
  //       name: item[0]
  //     }
  //   });

  //   await YearEmissions.create({
  //     yearId: findId.id,
  //     value: item[1]
  //   })
  //  }


// 산업별 배출량
    await IndustryEmissions.destroy({
      truncate: true
    })

    for(let item of Object.entries(industryData[0])) {
      const findId = await Year.findOne({
        attributes: ['id'],
        where: {
          name: item[0]
        }
      });

      await IndustryEmissions.create({
        yearId: findId.id,
        energy: item[1]
      })
    }

    console.log(industryData)

  //  for await(let item of Object.entries(industryData)) {
  //   console.log(item)
  //  }


    return res.status(200).send({
      message: 'success'
    })
  } catch(err) {
    console.error(err);
    return res.status(400).send({
      message: 'fail'
    })
  }
}
