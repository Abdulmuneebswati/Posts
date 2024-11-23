'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('default', 'admin'),
        allowNull: false,
        defaultValue: 'default',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const config = require('../../config');

    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const adminToken = jwt.sign({ id: 1 }, config.get('signInJwtSecret'));

    const hashedSarahPassword = await bcrypt.hash('sarah123', 10);
    const sarahToken = jwt.sign({ id: 2 }, config.get('signInJwtSecret'));

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedAdminPassword,
        role: 'admin',
        token: adminToken,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sarah',
        email: 'sarah@example.com',
        password: hashedSarahPassword,
        role: 'default',
        token: sarahToken,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
