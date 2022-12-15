const YearEmissions = require('../db/models').yearEmissions;
const IndustryEmissions = require('../db/models').industryEmissions;
const Year = require('../db/models').year;

export const getAllData = async(req, res) => {
    try {
        
        const year_info = await YearEmissions.findAll({ order: [['created_at', 'DESC']] });
        const industry_info = await IndustryEmissions.findAll({ order: [['created_at', 'DESC']] });
        const year = await Year.findAll({ attributes: ['id', 'name'], });
        return res.status(200).send({ code: 200, message: '모든 차트 데이터 조회 성공', data : [industry_info, year_info, year] })
        
    } catch (error) {
        console.log(error,'error')
        return res.status(500).send({
            code : 500,
            message: '모든 차트 데이터 조회 실패'
        });
    }
}