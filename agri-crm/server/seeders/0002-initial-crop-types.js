'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CropTypes', [
      {
        name: 'Olive Trees',
        description: 'Traditional olive tree cultivation',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Avocado Trees', 
        description: 'Avocado plantation',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CropTypes', null, {});
  }
};