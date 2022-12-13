import excelToJson from 'convert-excel-to-json';
import fs from 'fs';

export const upload = async (req, res) => {
  try {
    const file = req.file; // 어드민이 업로드한 파일
    const selectedYear = req.body.selectedYear; // 어드민이 선택한 연도
    const excelData = JSON.parse(fs.readFileSync('json/excel_data.json', { encoding: 'utf8', flag: 'r' }));

    fs.readdir( "static/files", function( error, filelist ) { // 최신파일 유지
      for(let i = 0; i < filelist.length - 1; i++) {
        fs.unlinkSync(`static/files/${ filelist[i] }`);
      }
    });

    const result = excelToJson({ // 엑셀 파일 읽어들이기
      sourceFile: file.path,
      sheets: [
        {
          name: '지역별배출량',
          header:{
              rows: 1
          },
          columToKey: {}
        },
        {
          name: '지역별증감량',
          header:{
              rows: 1
          },
          columToKey: {}
        },
        {
          name: '참여기업배출량',
          header:{
              rows: 1
          },
          columToKey: {}
        },
        {
          name: '국제배출량순위',
          header:{
              rows: 1
          },
          columToKey: {}
        },
        {
          name: '산업별배출량',
          header:{
              rows: 1
          },
          columToKey: {}
        },
        {
          name: '연도별배출량',
          header:{
              rows: 1
          },
          columToKey: {}
        },
        {
          name: '목표관리제',
          header:{
              rows: 1
          },
          columToKey: {}
        },
        {
          name: '배출권거래제',
          header:{
              rows: 1
          },
          columToKey: {}
        }
      ],
    });

    excelData[selectedYear] = result; // 해당 연도에 읽어들인 데이터 주입 (없으면 생성, 있으면 덮어쓰기)

    const convertedJSON = JSON.stringify(excelData); // JSON파일 생성을 위해 JSON 문자열로 변환

    fs.writeFileSync('json/excel_data.json', convertedJSON, (err) => { // JSON파일 생성
      console.error(err);
      throw new Error('json 파일 생성 실패')
    })

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
