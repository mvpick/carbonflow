const YearEmissions = require('../db/models').yearEmissions;
const TargetEmissions = require('../db/models').targetEmissions;
const TradeEmissions = require('../db/models').tradeEmissions;
const IndustryEmissions = require('../db/models').industryEmissions;
const Year = require('../db/models').year;
const RegionEmissions = require('../db/models').regionEmissions;
const Region = require('../db/models').region;
const EnterpriseEmissions = require('../db/models').enterpriseEmissions;
const InternationalEmissions = require('../db/models').internationalEmissions;
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

// 지역배출량 연도
export const getRegionEmissionYear = async(req, res) => {
    try {
        const find_year = await Year.findAll({
            include: {
                model: RegionEmissions
            },
            order: [['name', 'DESC']],
        })
        console.log(find_year)
        let years = []
        find_year.map(item => {
            if(item.regionEmissions.length > 0) {
                years.push(item.name)
            }
        })

        return res.status(200).send({ code: 200, message: '지역배출량 연도 조회 성공', data: years })

    } catch (error) {
        console.log(error,'error')
        return res.status(500).send({ code : 500, message: '지역배출량 연도 조회 실패' });
    }
}


// 지역 배출량 조회
export const getRegionEmission = async(req, res) => {

    const { year } = req.body
    try {
        const find_year = await Year.findOne({
            where: { name: year },
            include: {
                model: RegionEmissions,
                include: [{
                    model: Year,
                }, {
                    model: Region,
                }]
            },
            order: [['createdAt', 'DESC']],
        })

        let data = []
        find_year.regionEmissions.map(item => {
            data.push({
                name: item.region.name,
                value: item.value
            })
        })

        return res.status(200).send({ code: 200, message: '지역배출량 조회 성공', data: data })

    } catch (error) {
        console.log(error,'error')
        return res.status(500).send({ code : 500, message: '지역배출량 조회 실패' });
    }
}


// 증감량 연도
export const getRegionVariationYear = async(req, res) => {
    try {
        const find_year = await Year.findAll({
            include: {
                model: RegionEmissions
            },
            order: [['name', 'DESC']],
        })
        console.log(find_year)
        let years = []
        find_year.map(item => {
            if(item.regionEmissions.length > 0) {
                years.push(item.name)
            }
        })
        years.pop() // 증감량이므로 처음 연도 제거

        return res.status(200).send({ code: 200, message: '증감량 연도 조회 성공', data: years })
    } catch (error) {
        console.log(error,'error')
        return res.status(500).send({ code : 500, message: '증감량 연도 조회 실패' })
    }
}


// 증감량
export const getRegionVariation = async(req, res) => {

    const { year } = req.body
    try {
        const find_year1 = await Year.findOne({
            where: { name: year },
            include: {
                model: RegionEmissions,
                include: [{
                    model: Region,
                }]
            },
            order: [
                ['createdAt', 'DESC'],
                [RegionEmissions, 'region_id', 'ASC'],
            ],
        })

        console.log(find_year1)
        const current_year_data = find_year1.regionEmissions

        const find_year2 = await Year.findOne({
            where: { name: year - 1},
            include: {
                model: RegionEmissions,
                include: [{
                    model: Year,
                }, {
                    model: Region,
                }]
            },
            order: [
                ['createdAt', 'DESC'],
                [RegionEmissions, 'region_id', 'ASC'],
            ],
        })

        console.log(find_year2)
        const last_year_data = find_year2.regionEmissions

        let data = []
        for(let index = 0; index < current_year_data.length; index++) {
            data.push({
                name: current_year_data[index].region.name,
                value: current_year_data[index].value - last_year_data[index].value >= 0 ? true : false
            })
        }

        return res.status(200).send({ code: 200, message: '증감량 조회 성공', data })

    } catch (error) {
        console.log(error,'error')
        return res.status(500).send({ code : 500, message: '증감량 조회 실패' });
    }
}


// 증감량
export const getEnterpriseEmission = async(req, res) => {
    try {
        const findEnterpriseEmission = await EnterpriseEmissions.findAll({
            include: {
                model: Year
            }
        })

        return res.status(200).send({ code: 200, message: '증감량 연도 조회 성공', data: findEnterpriseEmission })
    } catch (error) {
        console.log(error,'error')
        return res.status(500).send({ code : 500, message: '증감량 연도 조회 실패' })
    }
}




// 위, 경도 주입
export const postLatLng = async(req, res) => {
    const { id, lat, lng } = req.body
    try {
        const findEnterpriseEmission = await EnterpriseEmissions.update({
            lat,
            lng
        }, {
            where: { id }
        })

        console.log(findEnterpriseEmission)

        return res.status(200).send({ code: 200, message: '위, 경도 주입 성공' })
    } catch (error) {
        console.log(error,'error')
        return res.status(500).send({ code : 500, message: '위, 경도 주입 실패' })
    }
}


// 국제 배출량
export const getInternationalEmission = async(req, res) => {
    try {
        const findInternationalEmissions = await InternationalEmissions.findAll({
            order: [
                ['value', 'DESC'],
            ],
        })

        console.log(findInternationalEmissions)

        return res.status(200).send({ code: 200, message: '국제 배출량 조회 성공', data: findInternationalEmissions })
    } catch (error) {
        console.log(error,'error')
        return res.status(500).send({ code : 500, message: '국제 배출량 조회 실패' })
    }
}
