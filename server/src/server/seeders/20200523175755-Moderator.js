'use strict';

const {MODERATOR, SALT_ROUNDS} = require("../../constants");
const bcrypt = require('bcrypt');

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Moderator',
        lastName: 'Moderatorovich',
        displayName: 'Moderator1',
        password: await bcrypt.hash('helloWorld', SALT_ROUNDS),
        email: 'moderator1@moderation.com',
        role: MODERATOR
      }
    ], {});
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {});
  }

};