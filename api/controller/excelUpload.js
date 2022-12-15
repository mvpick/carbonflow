import xlsx from 'xlsx';
import fs from 'fs';
import { excelFilter } from '../utils/excelFilter';
import { NULL } from 'node-sass';
const Year = require('../db/models').year;
const Region = require('../db/models').region;
const YearEmissions = require('../db/models').yearEmissions;
const IndustryEmissions = require('../db/models').industryEmissions;
const RegionEmissions = require('../db/models').regionEmissions;
const EnterpriseEmissions = require('../db/models').enterpriseEmissions;
const sequelize = require("../db/models").sequelize

// ----------------------------------------------------------- 산업별 / 연도별 배출량 -----------------------------------------------------------
export const uploadYearIndustryEmissions = async(req, res) => {
  try {
    await sequelize.transaction(async (t) => {
      const file = req.file;

      fs.readdir( "static/files", function( error, filelist ) {
        for(let i = 0; i < filelist.length - 1; i++) {
          fs.unlinkSync(`static/files/${ filelist[i] }`);
        }
      });

      const excelFile = xlsx.readFile(file.path);
      const sheetNames = excelFile.SheetNames;
      const sheets = sheetNames.map(item => excelFile.Sheets[item]);
      const deleteKeys = ['구분', '분야·부문/연도'];

      const result = sheets.map(item => excelFilter(item, deleteKeys));
      const yearData = result[0][0];
      const industryData = result[1];


  // 연도별 배출량
      await YearEmissions.destroy({
        truncate: true
      })

      await Promise.all(
        Object.entries(yearData).map(async item => {
          const findId = await Year.findOne({
            attributes: ['id'],
            where: {
              name: item[0]
            }
          })

          await YearEmissions.create({
            year_id: findId.id,
            value: item[1]
          }, { transaction: t })
        })
      );


  // 산업별 배출량
      await IndustryEmissions.destroy({
        truncate: true
      })

      const industryKeys = ['energy', 'process', 'agriculture', 'lulucf', 'waste'];
      let industryArray = [];

      for(let i = 0; i < industryData.length; i++) {
        const innerItem = Object.entries(industryData[i]);

        for(let j = 0; j < innerItem.length; j++) {
          if(i === 0) {
            industryArray.push({
              year: innerItem[j][0],
              [industryKeys[i]]: innerItem[j][1]
            })
          } else {
            industryArray[j][industryKeys[i]] = innerItem[j][1]
          }
        }
      }

      await Promise.all(
        industryArray.map(async item => {
          const findId = await Year.findOne({
            attributes: ['id'],
            where: {
              name: item.year
            }
          })

          await IndustryEmissions.create({
            year_id: findId.id,
            energy: item.energy,
            process: item.process,
            agriculture: item.agriculture,
            lulucf: item.lulucf,
            waste: item.waste
          }, { transaction: t })
        })
      );
    });

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

// ----------------------------------------------------------- 지역별 배출량 -----------------------------------------------------------
export const uploadRegionEmissions = async (req, res) => {
  try {
    const file = req.file;

    fs.readdir( "static/files", function( error, filelist ) {
      for(let i = 0; i < filelist.length - 1; i++) {
        fs.unlinkSync(`static/files/${ filelist[i] }`);
      }
    });

    const excelFile = xlsx.readFile(file.path);
    const sheetNames = excelFile.SheetNames;
    const sheets = sheetNames.map(item => excelFile.Sheets[item]);
    const result = sheets.map(item => excelFilter(item));

    for(let i = 0; i < result.length; i++) {
      const year = sheetNames[i];

      const findYear = await Year.findOne({
        attributes: ['id'],
        where: {
          name: year
        }
      })

      await RegionEmissions.destroy({
        truncate: true
      })

      await Promise.all(
        result[i].map(async innerItem => {
          const findRegion = await Region.findOne({
            attributes: ['id'],
            where: {
              name: innerItem['시도']
            }
          });

          await RegionEmissions.create({
            year_id: findYear.id,
            region_id: findRegion.id,
            value: innerItem['배출량']
          });
        })
      );
    }

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

// ------------------------------------------- 참여기업 배출량 ---------------------------------------
export const uploadEnterpriseEmissions = async(req, res) => {
  try {
    const file = req.file;

    fs.readdir( "static/files", function( error, filelist ) {
      for(let i = 0; i < filelist.length - 1; i++) {
        fs.unlinkSync(`static/files/${ filelist[i] }`);
      }
    });

    const excelFile = xlsx.readFile(file.path);
    const sheetNames = excelFile.SheetNames;
    const sheets = sheetNames.map(item => excelFile.Sheets[item]);
    const result = sheets.map(item => excelFilter(item));
    const addressFilter = {};

    for(let item of result[0]) {
      addressFilter[item['업체명']] = item['소재지']
    }

    for(let j = 0; j < result[1].length; j++) {
      result[1][j]['소재지'] = addressFilter[result[1][j]['업체명']] || null;
    }

    const enterpriseData = result[1];

    await EnterpriseEmissions.destroy({
      truncate: true
    })

    // connection 해결 전까지 보류

    // await Promise.all(
    //   enterpriseData.map(async innerItem => {
    //     const findYear = await Year.findOne({
    //       attributes: ['id'],
    //       where: {
    //         name: innerItem['연도']
    //       }
    //     });

    //     await EnterpriseEmissions.create({
    //       year_id: findYear.id,
    //       name: innerItem['업체명'],
    //       value: innerItem['배출량'],
    //       address: innerItem['소재지']
    //     });
    //   })
    // );
      for await(let innerItem of enterpriseData) {
        console.log(innerItem['소재지'])
        const findYear = await Year.findOne({
          attributes: ['id'],
          where: {
            name: innerItem['연도']
          }
        });

        await EnterpriseEmissions.create({
          year_id: findYear.id,
          name: innerItem['업체명'],
          value: innerItem['배출량'],
          address: innerItem['소재지']
        });
      }

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
