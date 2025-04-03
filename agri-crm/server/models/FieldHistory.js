'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const FieldHistory = sequelize.define('FieldHistory', {
    plantingDate: DataTypes.DATE,
    harvestDate: DataTypes.DATE,
    yieldAmount: DataTypes.FLOAT,
    fertilizerUsed: DataTypes.STRING,
    notes: DataTypes.TEXT
  });

  FieldHistory.associate = (models) => {
    FieldHistory.belongsTo(models.Field);
    FieldHistory.belongsTo(models.CropType);
  };

  return FieldHistory;
};