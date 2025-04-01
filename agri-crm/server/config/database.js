const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize({
  dialect: config.development.dialect,
  storage: config.development.storage,
  logging: config.development.logging
});

module.exports = sequelize;