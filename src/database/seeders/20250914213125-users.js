'use strict';
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(), 
        companyId: uuidv4(), 
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        password: hashedPassword,
        role: 'Employee',
        department: 'IT',
        phone: '+250789123456',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        companyId: uuidv4(),
        fullName: 'Jane Manager',
        email: 'jane.manager@example.com',
        password: hashedPassword,
        role: 'Manager',
        department: 'HR',
        phone: '+250788765432',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
