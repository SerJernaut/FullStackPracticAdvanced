const fs = require('fs');
const path = require('path');

module.exports = (err, req, res, next) => {
    const absolutePathToLogsDir = path.resolve(__dirname, '../logs');
    const absolutePathToLogFile = path.resolve(absolutePathToLogsDir, 'errorLogs.json');
    const errorData = {
        message: err.message,
        time: Date.now(),
        code: err.code,
        stackTrace: err.stack
    }

    fs.access(absolutePathToLogsDir, err => {
        if (err) {
            fs.mkdir(absolutePathToLogsDir, {recursive: true}, err => {
                if (err) throw err;
                else {
                    fs.appendFile(absolutePathToLogFile, JSON.stringify([errorData]), err => {
                        if (err) throw err;
                    })
                }
            })
        }
        else {
            fs.access(absolutePathToLogFile, err => {
                if (err) {
                    fs.appendFile(absolutePathToLogFile, JSON.stringify([errorData], null, 2), 'utf-8', err => {
                        if (err) throw err;
                    })
                } else {
                    fs.readFile(absolutePathToLogFile, (err, data) => {
                        if (err) throw err;
                        else {
                            const jsonExistingLogs = JSON.parse(data);
                            if (Array.isArray(jsonExistingLogs)) {
                                jsonExistingLogs.push(errorData);
                                fs.writeFile(absolutePathToLogFile, JSON.stringify(jsonExistingLogs, null, 2), 'utf-8', err => {
                                    if (err) throw err;
                                })
                            }
                        }
                    });
                }
            });
        }
    });

    next(err);
}

