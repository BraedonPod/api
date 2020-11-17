const fs = require('fs');
const path = require('path');
const moment = require('moment');
const axios = require('axios');

//Filename format MM-DD-YYYY.csv
const CSVPATH_DAILY = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/";

const FILEPATH = path.join(__dirname, '../../data/');

async function getData(url) {
  url = url + moment().subtract(1, 'days').format('MM-DD-YYYY') + '.csv';
  
  const file = fs.createWriteStream(path.join(FILEPATH, moment().subtract(1, 'days').format('MM-DD-YYYY') + '.csv'));
  await axios({ method: 'get', url: url, responseType: 'stream' })
  .then(res => {
    res.data.pipe(file);
  })
  .catch(err => console.log('Unable to retrive CSV Data' + err));
}

function updateCSVData() {
  getData(CSVPATH_DAILY);

  console.log('CSV has been updated at ' + moment().format('dddd, MMMM Do YYYY, h:mm:ss a'))
}
updateCSVData();
module.exports = updateCSVData;