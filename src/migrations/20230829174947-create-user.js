'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password:{ 
        type:Sequelize.STRING,
      allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};