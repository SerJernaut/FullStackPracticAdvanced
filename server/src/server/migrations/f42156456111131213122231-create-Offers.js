'use strict';
const {
  OFFER_MODERATION_EXPECTED_STATUS,
  OFFER_MODERATION_REJECTED_STATUS,
  OFFER_MODERATION_RESOLVED_STATUS
} = require("../../constants");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      contestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Contests',
          key: 'id',
        },
      },
      text: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      originalFileName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'pending',
      },
      moderationStatus: {
        allowNull: false,
        type: Sequelize.ENUM(OFFER_MODERATION_EXPECTED_STATUS, OFFER_MODERATION_RESOLVED_STATUS, OFFER_MODERATION_REJECTED_STATUS),
        defaultValue: OFFER_MODERATION_EXPECTED_STATUS
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      }
      },
      {timestamps: true},
    );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Offers');
  },
};
