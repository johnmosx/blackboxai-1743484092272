'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('PhenologyStages', 'startDay', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
    await queryInterface.addColumn('PhenologyStages', 'durationDays', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 7
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('PhenologyStages', 'startDay');
    await queryInterface.removeColumn('PhenologyStages', 'durationDays');
  }
};