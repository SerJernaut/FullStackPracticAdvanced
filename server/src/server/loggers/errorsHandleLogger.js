const path = require('path');
const {promises: {readFile, appendFile, writeFile}} = require('fs');

const writeLogFile = async (path, data) => {
    await writeFile(path, JSON.stringify(data, null, 2));
}

const parseJsonAndAppendLogsToFile = async (json, path, errorData) => {
    try{
        let newLogs = [];
        const jsonExistingLogs = JSON.parse(json);
        if (Array.isArray(jsonExistingLogs)) {
            newLogs = [...jsonExistingLogs]
        }
        newLogs.push(errorData);
        await writeLogFile(path, newLogs)
    }
    catch(e) {
        await writeLogFile(path, [errorData]);
    }
}

const absolutePathToLogsDir = path.resolve(__dirname, '../logs');
const absolutePathToLogsFile = path.resolve(absolutePathToLogsDir, 'errorLogs.json');

module.exports = async (err, req, res, next) => {
    const {message, code, stack} = err;
    const errorData = {
        message: message,
        time: Date.now(),
        code: code,
        stackTrace: stack
    }
    try {
        const oldLogs = await readFile(absolutePathToLogsFile);
        await parseJsonAndAppendLogsToFile(oldLogs, absolutePathToLogsFile, errorData)
        next(err);
    } catch (e) {
        if (e.code === 'ENOENT') {
            await appendFile(absolutePathToLogsFile, JSON.stringify([errorData], null, 2));
        }
        next(e);
    }
}