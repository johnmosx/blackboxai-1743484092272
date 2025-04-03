module.exports = (sequelize, DataTypes) => {
  const Field = sequelize.define('Field', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    geoJson: {
      type: DataTypes.JSONB,
      allowNull: false
    }
  });

  Field.associate = (models) => {
    Field.belongsTo(models.Farmer);
    Field.hasMany(models.FieldHistory);
    Field.belongsTo(models.CropType, {
      as: 'currentCropType'
    });
  };

  return Field;
};