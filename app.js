const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const CronJob = require('cron').CronJob;
const updateCSVData = require('./config/data');
const updateData = require('./config/update');
const db = require('./config/db');

const app = express();

try {
  db.authenticate();
  console.log('Connection has been established successfully.');
  db.sync();
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

const PORT = process.env.PORT|| 5000;

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/views/index.html');
});
app.use('/covid', require('./routes/covid'));

app.listen(PORT);

//Every 5 hours
var csvJob = new CronJob('0 */5 * * *', function() {
  updateCSVData();
});
//Every 5 hours and 30min
var dataJob = new CronJob('30 */5 * * *', function() {
  updateData();
});
csvJob.start();
dataJob.start();