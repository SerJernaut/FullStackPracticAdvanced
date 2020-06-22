const path = require('path');

const absolutePathToLogsDir = path.resolve(__dirname, '../logs');
const absolutePathToLogsFile = path.resolve(absolutePathToLogsDir, 'errorLogs.json');

module.exports = {
    absolutePathToLogsDir,
    absolutePathToLogsFile
}