const fs = require('fs');
const path = require('path');
const https = require('https');
const parse = require('csv-parse/lib/sync');
const moment = require('moment');
const Covid = require('../models/Covid');

const FILENAME_CONFIRMED = "time_series_covid19_confirmed_global.csv";
const FILENAME_DEATHS = "time_series_covid19_deaths_global.csv";
const FILENAME_RECOVERED = "time_series_covid19_recovered_global.csv";

const FILEPATH = path.join(__dirname, '../data/');

function extractData(filepath) {
  const csv = fs.readFileSync(filepath);
  const [headers, ...rows] = parse(csv);
  const [state, country, lat, long, ...dates] = headers;
  let countList = {};
  const countArr = [];

  const normalDates = dates.map(date => {
    return moment(date, 'MM/DD/YY').format('YYYY-MM-DD');
  });

  rows.forEach(([state, country, lat, long, ...counts]) => {
    countList = {
      state: state,
      country: country,
      lat: lat,
      long: long,
      date: normalDates[normalDates.length-1],
      count: counts[counts.length-1],
    };
    countArr.push(countList);
  });
  return countArr;
}

function updateData() {
  let resultsList = {};
  const resultsArr = [];
  const confirmed = extractData(path.join(FILEPATH, FILENAME_CONFIRMED));
  const deaths = extractData(path.join(FILEPATH, FILENAME_DEATHS));
  const recovered = extractData(path.join(FILEPATH, FILENAME_RECOVERED));
  
  let x = 0;
  let c = 0;
  confirmed.forEach(data => {
    if(data.country === 'Canada') {
      resultsList = {
        state: data.state,
        country: data.country,
        lat: data.lat,
        long: data.long,
        date: data.date,
        confirmed: data.count,
        deaths: deaths[x].count,
        recovered: recovered[c].count,
      };
    } else {
      resultsList = {
        state: data.state,
        country: data.country,
        lat: data.lat,
        long: data.long,
        date: data.date,
        confirmed: data.count,
        deaths: deaths[x].count,
        recovered: recovered[c].count,
      };
      c++;
    }
    x++;
    resultsArr.push(resultsList);
  });
  
  resultsArr.forEach(({state, country, lat, long, date, confirmed, deaths, recovered}) => {
    try {
      Covid.destroy({
        truncate: true
      });
      Covid.create({
        id: Math.floor(Math.random() * 10000 * Math.random() * 10),
        state,
        country,
        lat, 
        long, 
        date, 
        confirmed, 
        deaths, 
        recovered
      });
    } catch(error) {
      console.log(error);
    }
  });
  console.log('Data has been updated at ' + moment().format('dddd, MMMM Do YYYY, h:mm:ss a'));
}
module.exports = updateData;
