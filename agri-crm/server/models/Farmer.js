'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Farmer = sequelize.define('Farmer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: DataTypes.STRING,
    email: DataTypes.STRING
  });

  Farmer.associate = (models) => {
    Farmer.hasMany(models.Field, {
      foreignKey: 'farmerId',
      as: 'fields',
      onDelete: 'CASCADE' // Add cascade delete
    });
  };

  return Farmer;
};