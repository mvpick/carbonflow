const YearEmissions = require('../db/models').yearEmissions;
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


        return res.status(200).send({ code: 200, message: '모든 차트 데이터 조회 성공', data : {industry_info, year_info, year} })
        
    } catch (error) {
        console.log(error,'error')
        return res.status(500).send({
            code : 500,
            message: '모든 차트 데이터 조회 실패'
        });
    }
}