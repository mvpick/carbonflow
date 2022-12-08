import excelToJson from 'convert-excel-to-json'

export const upload = async (req, res) => {
  try {
    const file = req.file;

    const result = excelToJson({
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

    const createdArray = Object.keys(result)

    for(let keyItem of createdArray) {
      for(let item of result[keyItem]) {
        console.log(item)
      }
    }

    return res.status(200).send({
      message: 'success'
    })
  } catch(err) {
    return res.status(400).send({
      message: 'fail'
    })
  }
}
