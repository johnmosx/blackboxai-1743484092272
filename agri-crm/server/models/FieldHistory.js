module.exports = (sequelize, DataTypes) => {
  const FieldHistory = sequelize.define('FieldHistory', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    yieldAmount: DataTypes.FLOAT,
    fertilizerUsed: DataTypes.STRING,
    notes: DataTypes.TEXT
  });

  FieldHistory.associate = (models) => {
    FieldHistory.belongsTo(models.Field, {
      foreignKey: 'fieldId',
      as: 'field'
    });
    FieldHistory.belongsTo(models.CropType, {
      foreignKey: 'cropTypeId',
      as: 'cropType'
    });
  };

  return FieldHistory;
};