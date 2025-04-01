module.exports = (sequelize, DataTypes) => {
  const CropType = sequelize.define('CropType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false
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
  };

  return CropType;
};