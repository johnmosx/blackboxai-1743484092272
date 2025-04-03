module.exports = (sequelize, DataTypes) => {
  const PhenologyStage = sequelize.define('PhenologyStage', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  PhenologyStage.associate = (models) => {
    PhenologyStage.belongsTo(models.CropType, {
      foreignKey: 'cropTypeId',
      as: 'cropType'
    });
  };

  return PhenologyStage;
};