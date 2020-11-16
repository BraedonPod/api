const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const Covid = db.define('covid', {
  id: { type: DataTypes.STRING, allowNull: false, primaryKey: true},
  state: { type: DataTypes.STRING, allowNull: true },
  country: { type: DataTypes.STRING, allowNull: false },
  lat: { type: DataTypes.STRING, allowNull: false },
  long: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  confirmed: {type: DataTypes.BIGINT(11), allowNull: false },
  deaths: {type: DataTypes.BIGINT(11), allowNull: false },
  recovered: {type: DataTypes.BIGINT(11), allowNull: false },
});

module.exports = Covid;