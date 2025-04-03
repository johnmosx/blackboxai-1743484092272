'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn('PhenologyStages', 'durationDays');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('PhenologyStages', 'durationDays', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 7
    });
  }
};