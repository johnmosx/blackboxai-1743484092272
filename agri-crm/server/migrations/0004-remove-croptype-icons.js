'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('CropTypes', 'icon');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('CropTypes', 'icon', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};