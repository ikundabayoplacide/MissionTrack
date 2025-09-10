'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("ExpenseLogs",{
      id:{
        type:Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true
      },
      missionId:{
        type:Sequelize.UUID,
        allowNull:false,
        references:{
          model:'missions',
          key:'id'
        }
      },
      date:{
        type:Sequelize.DATE,
        allowNull:false
      },
      accommodationFile:{
        type:Sequelize.STRING,
        allowNull:true
      },
      mealsFile:{
        type:Sequelize.STRING,
        allowNull:true
      },
      transportFile:{
        type:Sequelize.STRING,
        allowNull:true
      },
      description:{
        type:Sequelize.TEXT,
        allowNull:true
      },
      createdAt:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.NOW
      },
      updatedAt:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.NOW
      },
      deletedAt:{
        type:Sequelize.DATE,
        allowNull:true
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("ExpenseLogs");
  }
};
