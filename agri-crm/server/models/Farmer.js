module.exports = (sequelize, DataTypes) => {
  const Farmer = sequelize.define('Farmer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Farmer.associate = (models) => {
    Farmer.hasMany(models.Crop, {
      foreignKey: 'farmerId',
      as: 'crops'
    });
  };

  return Farmer;
};