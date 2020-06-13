const bd = require('../../models/index');
const UserNotFoundError = require('../../errors/UserNotFoundError');
const ServerError = require('../../errors/ServerError');
const PasswordAffiliationError = require('../../errors/PasswordAffiliationError')
const bcrypt = require('bcrypt');

module.exports.updateUser = async (data, userId, transaction) => {
  const [updatedCount, [updatedUser]] = await bd.Users.update(data,
    { where: { id: userId }, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update user');
  }
  return updatedUser.dataValues;
};

module.exports.updateUserByEmail = async (data, email) => {
  const [updatedCount, [updatedUser]] = await bd.Users.update(data,
      { where: { email }, returning: true });
  if (updatedCount === 1) {
    return updatedUser.dataValues;
  }
  throw new ServerError('cannot update user');
};


module.exports.findUser = async (predicate, attributes, transaction) => {
  const result = await bd.Users.findOne({ where: predicate, attributes: attributes, transaction });
  if (result) {
    return result.get({ plain: true });
  }
    throw new UserNotFoundError(`user with this data doesn't exist`);
};

module.exports.userCreation = async (data) => {
  const newUser = await bd.Users.create(data);
  if (newUser) {
    return newUser.get({plain: true});
  }
  throw new ServerError('server error on user creation');

};

module.exports.passwordCompare = async (pass1, pass2) => {
  const passwordCompare = await bcrypt.compare(pass1, pass2);
  if ( !passwordCompare) {
    throw new UserNotFoundError('Wrong password');
  }
};

module.exports.comparePasswordWithCurrent = async (pass1, pass2) => {
  const passwordCompare = await bcrypt.compare(pass1, pass2);
  if ( passwordCompare) {
    throw new PasswordAffiliationError();
  }
  return passwordCompare;
};



module.exports.findTransactionHistory = async (userId) => {
  const transactions = await bd.Transactions.findAll({
    where: {
      userId
    }
  });
  if (transactions) {
    return transactions;
  }
  throw new ApplicationError('can not find transactions')

}

module.exports.findTransactionStatementsByFilter = async (filter) => {
  try{
    const filteredTransactions = await bd.Transactions.findAll(filter);
    if (filteredTransactions) {
      return filteredTransactions;
    }
  }
  catch (e) {
    throw e;
  }
}

module.exports.createTransactionByFilter = async (filter) => {
  const result = await bd.Transactions.create(filter);
  if (result) {
    return result;
  }
  throw new ServerError('can not create transaction');
}