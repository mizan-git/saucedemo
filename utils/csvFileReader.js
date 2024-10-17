const fs = require('fs'); 
const csv = require('csv-parser');


async function readCsv(filePath) {
  const records = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => records.push(data))
      .on('end', () => resolve(records))
      .on('error', (err) => reject(err));
  });
}

module.exports = {readCsv};
