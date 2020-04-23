'use strict';

module.exports = {
  up: (queryInterface) => {

    return queryInterface.bulkInsert('Transactions', [
      {
        typeOperation: "INCOME",
        sum: 10000,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        typeOperation: "CONSUMPTION",
        sum: 5000,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Transactions', null, {});
  }
};