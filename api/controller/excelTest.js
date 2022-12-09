import { assert } from 'console';
import excelToJson from 'convert-excel-to-json';
import fs from 'fs';
import excelData from '../../json/excelData.json';

export const upload = async (req, res) => {
  try {
    const file = req.file; // 어드민이 업로드한 파일
    const selectedYear = req.body.selectedYear; // 어드민이 선택한 연도

    const result = excelToJson({ // 엑셀 파일 읽어들이기
      sourceFile: file.path,
      sheets: [
        {
          name: '지역별배출량',
          header:{
              rows: 1
          },
          columToKey: {
            A: 'sdsdf',
            B: 'sdfdsf',
            C: 'sdfdsfsdf',
          }
        },
        {
          name: '지역별증감량',
          header:{
              rows: 1
          },
          columToKey: {
            A: 'sdfsdf',
            B: 'sdfsdf',
            C: 'sdfsdf',
            D: 'dsfdsf',
          }
        },
      ],
    });

    excelData[selectedYear] = result; // 해당 연도에 읽어들인 데이터 주입 (없으면 생성, 있으면 덮어쓰기)

    const convertedJSON = JSON.stringify(excelData); // 엑셀 파일을 JSON형식으로 변환

    fs.writeFileSync('json/excelData.json', convertedJSON, (err) => { // JSON파일 생성
      console.error(err);
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
