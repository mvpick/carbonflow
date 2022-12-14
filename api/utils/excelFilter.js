import xlsx from 'xlsx';

export const excelFilter = ( sheet, deleteKeys ) => {
  const jsonData = xlsx.utils.sheet_to_json( sheet, { defval : "" } );

  for(let item of jsonData) {
    for(let keyItem of deleteKeys){
      delete item[keyItem];
    }
  }

  return jsonData;
}
