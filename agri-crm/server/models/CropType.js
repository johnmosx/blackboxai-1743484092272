'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const CropType = sequelize.define('CropType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.TEXT
  });

  CropType.associate = (models) => {
    CropType.hasMany(models.Field, {
      foreignKey: 'currentCropTypeId',
      as: 'fields'
    });
    CropType.hasMany(models.FieldHistory, {
      foreignKey: 'cropTypeId',
      as: 'fieldHistories'
    });
    CropType.hasMany(models.PhenologyStage, {
      foreignKey: 'cropTypeId',
      as: 'phenologyStages'
    });
  };

  return CropType;
};