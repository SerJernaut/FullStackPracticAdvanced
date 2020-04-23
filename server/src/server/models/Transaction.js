'use strict';

module.exports = (sequelize, DataTypes) => {
  const Transaction= sequelize.define('Transactions', {
    typeOperation: {
      type: DataTypes.ENUM("INCOME", "CONSUMPTION"),
      allowNull: false,
    },
    sum: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0.1,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      }
    }
  }, {
    timestamps: true
  });
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User, {foreignKey: 'user_id', sourceKey: 'id'});
  };
  return Transaction;
};