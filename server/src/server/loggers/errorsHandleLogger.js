const path = require('path');
const {promises: {readFile, writeFile, appendFile, mkdir}} = require('fs');
const {exists} = require('../utils/promisifiedFunctions')

module.exports = async (err, req, res, next) => {
    const {message, code, stack} = err;
    const absolutePathToLogsDir = path.resolve(__dirname, '../logs');
    const absolutePathToLogsFile = path.resolve(absolutePathToLogsDir, 'errorLogs.json');
    const errorData = {
        message: message,
        time: Date.now(),
        code: code,
        stackTrace: stack
    }
    try {
        if (await exists(absolutePathToLogsDir)) {
            if (await exists(absolutePathToLogsFile)) {
                const data = await readFile(absolutePathToLogsFile);
                if (data) {
                    const jsonExistingLogs = JSON.parse(data);
                    if (Array.isArray(jsonExistingLogs)) {
                        jsonExistingLogs.push(errorData);
                        await writeFile(absolutePathToLogsFile, JSON.stringify(jsonExistingLogs, null, 2));
                    }
                }
            }
            else {
                await appendFile(absolutePathToLogsFile, JSON.stringify([errorData], null, 2));
            }
        } else {
            await mkdir(absolutePathToLogsDir);
            if (await exists(absolutePathToLogsDir))
                await appendFile(absolutePathToLogsFile, JSON.stringify([errorData], null, 2));
        }
        next(err)
    } catch (e) {
        next(e);
    }
}