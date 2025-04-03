// Create a new migration file (e.g., 0004-remove-icon-from-crop-types.js)
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('CropTypes', 'icon');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('CropTypes', 'icon', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};