'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Farmers', 'phone', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '0000000000'
    });
    await queryInterface.addColumn('Farmers', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'default@example.com'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Farmers', 'phone');
    await queryInterface.removeColumn('Farmers', 'email');
  }
};