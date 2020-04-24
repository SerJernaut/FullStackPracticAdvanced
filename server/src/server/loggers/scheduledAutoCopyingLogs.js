const fs = require('fs');
const path = require('path');

module.exports = () => {
    const absolutePathToLogsDir = path.resolve(__dirname, '../logs');
    const absolutePathToLogFile = path.resolve(absolutePathToLogsDir, 'errorLogs.json');
    if (fs.existsSync(absolutePathToLogFile)) {
        const existingLogs = fs.readFileSync(absolutePathToLogFile);
        const jsonExistingLogs = JSON.parse(existingLogs);
        if (Array.isArray(jsonExistingLogs)) {
            const filteredData = jsonExistingLogs.map(({message, time, code, stackTrace}) => ({message, time, code}));
            fs.appendFileSync(`${absolutePathToLogsDir}/${Date.now()}.json`, JSON.stringify(filteredData, null, 2), 'utf-8');
        }
        fs.writeFileSync(absolutePathToLogFile, JSON.stringify([]));
    }
}

