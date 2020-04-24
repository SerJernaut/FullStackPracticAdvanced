const fs = require('fs');
const path = require('path');

module.exports = (err, req, res, next) => {
    const absolutePathToLogsDir = path.resolve(__dirname, '../logs');
    const errorData = {
        message: err.message,
        time: Date.now(),
        code: err.code,
        stackTrace: err.stack
    }
    if (!fs.existsSync(absolutePathToLogsDir)) {
        fs.mkdirSync(absolutePathToLogsDir, {recursive: true})
    }
    const absolutePathToLogFile = path.resolve(absolutePathToLogsDir, 'errorLogs.json');
    if (fs.existsSync(absolutePathToLogFile)) {
        const existingLogs = fs.readFileSync(absolutePathToLogFile);
        if(existingLogs) {
            const jsonExistingLogs = JSON.parse(existingLogs);
            jsonExistingLogs.push(errorData);
            fs.writeFileSync(absolutePathToLogFile, JSON.stringify(jsonExistingLogs, null, 2), 'utf-8')
        }
    }
        else {
        fs.appendFileSync(absolutePathToLogFile, JSON.stringify([errorData], null, 2), 'utf-8')
    }
    next(err);
}

