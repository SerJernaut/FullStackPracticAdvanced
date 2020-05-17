const fs = require('fs');
const path = require('path');

module.exports = () => {
    const absolutePathToLogsDir = path.resolve(__dirname, '../logs');
    const absolutePathToLogFile = path.resolve(absolutePathToLogsDir, 'errorLogs.json');
    fs.access(absolutePathToLogsDir, err => {
        if (err) throw err;
        else {
            fs.readFile(absolutePathToLogFile, (err, data) => {
                if (err) throw err;
                else {
                    const jsonExistingLogs = JSON.parse(data);
                    if (Array.isArray(jsonExistingLogs)) {
                        const filteredData = jsonExistingLogs.map(({message, time, code, stackTrace}) => ({
                            message,
                            time,
                            code
                        }));
                        fs.appendFile(`${absolutePathToLogsDir}/${Date.now()}.json`, JSON.stringify(filteredData, null, 2), 'utf-8', err => {
                            if (err) throw err;
                        });
                    }
                    fs.writeFile(absolutePathToLogFile, JSON.stringify([]), err => {
                        throw err;
                    });
                }
            });
        }
    });
}


