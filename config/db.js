const { Sequelize } = require('sequelize');

module.exports =  sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: './database.sqlite',
  define: {
    freezeTableName: true
  }
});

