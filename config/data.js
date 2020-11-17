const fs = require('fs');
const path = require('path');
const moment = require('moment');
const axios = require('axios');

const FILENAME_CONFIRMED = "time_series_covid19_confirmed_global.csv";
const FILENAME_DEATHS = "time_series_covid19_deaths_global.csv";
const FILENAME_RECOVERED = "time_series_covid19_recovered_global.csv";

const CSVPATH_CONFIRMED = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
const CSVPATH_DEATHS = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';
const CSVPATH_RECOVERED = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv';

const FILEPATH = path.join(__dirname, '../data/');

async function getData(filename, url) {
  const file = fs.createWriteStream(path.join(FILEPATH, filename));
  await axios({ method: 'get', url: url, responseType: 'stream' })
  .then(res => {
    res.data.pipe(file);
  })
  .catch(err => console.log('Unable to retrive CSV Data' + err));
}

function updateCSVData() {
  getData(FILENAME_CONFIRMED, CSVPATH_CONFIRMED);
  getData(FILENAME_DEATHS, CSVPATH_DEATHS);
  getData(FILENAME_RECOVERED, CSVPATH_RECOVERED);

  console.log('CSV has been updated at ' + moment().format('dddd, MMMM Do YYYY, h:mm:ss a'))
}
//updateCSVData();
module.exports = updateCSVData;