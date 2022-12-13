// 시드 생성
const Region = require("../models").region
const Year = require("../models").year

// 지역 시드 데이터
const region_data = [
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시',
    '경기도',
    '강원도',
    '충청북도',
    '충청남도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도',
    '제주특별자치도'
]

// 연도 시드 데이터
const year_data = [
  '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009',
  '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019',
  '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029',
  '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039',
  '2040'
]


export async function seed() {
    try {
      // 지역 시드 생성
      const find_region = await Region.findAll()
      if(find_region.length === 0) {
        for(const region of region_data) {
          await Region.create({ name: region })
        }
      }

      console.log('SEED CREATED : REGION')

      // 연도 생성
      const find_year = await Year.findAll();
      if(find_year.length === 0) {
        for(const year of year_data) {
          await Year.create({ name: year });
        }
      }

      console.log('SEED CREATED : YEAR')
    } catch (error) {
      console.log(error)
    }
}
