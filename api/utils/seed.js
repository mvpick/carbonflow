// 시드 생성
const Region = require("../db/models").region
const Year = require("../db/models").year

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
const yearData = [];

export async function seed() {
    try {
      // 지역 시드 생성
      const find_region = await Region.findAll()
      if(find_region.length === 0) {
        for await(const region of region_data) {
          await Region.create({ name: region })
        }
      }

      console.log('SEED CREATED : REGION')

      // 연도 생성
      for(let i = 1970; i <= 2040; i++) {
        yearData.push(i);
      }

      const find_year = await Year.findAll();
      if(find_year.length === 0) {
        for await(const year of yearData) {
          await Year.create({ name: year });
        }
      }

      console.log('SEED CREATED : YEAR')
    } catch (error) {
      console.log(error)
    }
}
