const YearEmissions = require('../db/models').yearEmissions;
const TargetEmissions = require('../db/models').targetEmissions;
const TradeEmissions = require('../db/models').tradeEmissions;
const IndustryEmissions = require('../db/models').industryEmissions;
const Year = require('../db/models').year;
const sequelize = require("../db/models").sequelize;

export const getAllData = async(req, res) => {
    try {
        const industry_info = await IndustryEmissions.findAll({ order: [['created_at', 'DESC']] }); // 부문별
        const year_info = await YearEmissions.findAll({
            group: ['value'],
            order: [[sequelize.fn('max', sequelize.col('value')), 'DESC']],
            raw: true
        }); // 연도별
        const year = await Year.findAll({ attributes: ['id', 'name'], order: [['name', 'DESC']] }); // 조회 연도
        // console.log(year,'year 체크')


        return res.status(200).send({ code: 200, message: '모든 차트 데이터 조회 성공', data : {industry_info, year_info, year} })

    } catch (error) {
        console.log(error,'error')
        return res.status(500).send({
            code : 500,
            message: '모든 차트 데이터 조회 실패'
        });
    }
}

export const getTargetEmissions = async(req, res) => {
  try {
    const result = await TargetEmissions.findAll({});

    return res.status(200).send({
      data: result
    })
  } catch(err) {
    console.log(err,'err')
    return res.status(400).send({
        message: '목표관리제 조회 실패'
    });
  }
}

export const getTradeEmissions = async(req, res) => {
  try {
    const result = await TradeEmissions.findAll({});

    return res.status(200).send({
      data: result
    })
  } catch(err) {
    console.log(err,'err')
    return res.status(400).send({
        message: '배출권거래제 조회 실패'
    });
  }
}

