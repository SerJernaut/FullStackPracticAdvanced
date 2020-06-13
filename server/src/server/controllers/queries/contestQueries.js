const bd = require('../../models/index');
const ServerError = require('../../errors/ServerError');
const NotFoundError = require('../../errors/NotFoundError');

module.exports.updateContest = async (data, predicate, transaction) => {
  const [updatedCount, [updatedContest]] = await bd.Contests.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount === 1) {
    return updatedContest.dataValues;
  }
    throw new ServerError('cannot update Contest');
};


module.exports.updateContestStatus = async (data, predicate, transaction) => {
  const updateResult = await bd.Contests.update(data,
    { where: predicate, returning: true, transaction });
  if (updateResult[ 0 ] >= 1) {
    return updateResult[ 1 ][ 0 ].dataValues;
  }
  throw new ServerError('cannot update Contest');
};

module.exports.findContestByFilter = async filter => {
  const result = await bd.Contests.findOne(filter);
  if (result) {
    return result.get({ plain: true });
  }
  throw new NotFoundError(`contest with this data doesn't exist`);
};

