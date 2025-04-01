'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Admins', [{
      username: 'Superadmin',
      email: 'admin@agri-crm.com',
      password: '$2a$08$ZblffsGPf8jz4jX2fk56j.f5Os03dH5sV429C.VVJqu1kEQcBo7Hi',
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