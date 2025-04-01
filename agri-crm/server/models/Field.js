module.exports = (sequelize, DataTypes) => {
  const Field = sequelize.define('Field', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    geoJson: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  Field.associate = (models) => {
    Field.belongsTo(models.Farmer, {
      foreignKey: 'farmerId',
      as: 'farmer'
    });
    Field.hasMany(models.FieldHistory, {
      foreignKey: 'fieldId',
      as: 'history'
    });
    Field.belongsTo(models.CropType, {
      foreignKey: 'currentCropTypeId',
      as: 'currentCropType'
    });
  };

  return Field;
};