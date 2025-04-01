'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Admins', [{
      username: 'Superadmin',
      email: 'admin@agri-crm.com',
      password: 'admin', // Note: In production, use bcrypt hashed password
      role: 'Administrator',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};