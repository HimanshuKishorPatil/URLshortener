'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('url_details', {
      GUID: {
        type: Sequelize.STRING(36),
        allowNull: false,
        references: {
          model: 'user',
          key: 'UUID'
        },
        onDelete: 'CASCADE'
      },
      originalURL: {
        type: Sequelize.STRING(767),
        unique: true,
        allowNull: false
      },
      shortURL: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false
      },
      isdeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      modified_on: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('url_details');
  }
};
