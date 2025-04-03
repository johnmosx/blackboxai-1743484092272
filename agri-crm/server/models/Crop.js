'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Crop = sequelize.define('Crop', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    plantingDate: DataTypes.DATE,
    harvestDate: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM,
      values: ['planted', 'growing', 'harvested'],
      defaultValue: 'planted'
    }
  });

  Crop.associate = (models) => {
    Crop.belongsTo(models.Farmer, {
      foreignKey: 'farmerId',
      onDelete: 'CASCADE'
    });
  };

  return Crop;
};