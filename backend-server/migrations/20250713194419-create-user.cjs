'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      UUID: {
        type: Sequelize.STRING(36),
        primaryKey: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      user_type: {
        type: Sequelize.STRING(20)
      },
      otp: {
        type: Sequelize.STRING(10)
      },
      token: {
        type: Sequelize.STRING
      },
      isdeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      modified_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      last_login_date: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  }
};
