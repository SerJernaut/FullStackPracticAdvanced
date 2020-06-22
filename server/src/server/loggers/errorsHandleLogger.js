const {promises: {readFile}} = require('fs');
const {absolutePathToLogsFile} = require('./paths');
const {stringifyDataAndAppendFile, stringifyDataAndWriteFile} = require('../utils/fileUtils')

const parseJsonAndWriteLogsToFile = async (json, path, errorData) => {
    try{
        let newLogs = [];
        const jsonExistingLogs = JSON.parse(json);
        if (Array.isArray(jsonExistingLogs)) {
            newLogs = [...jsonExistingLogs]
        }
        newLogs.push(errorData);
        await stringifyDataAndWriteFile(path, newLogs);
    }
    catch(e) {
        await stringifyDataAndWriteFile(path, [errorData]);
    }
}

module.exports.errorsHandleLogger = async (err, req, res, next) => {
    const {message, code, stack} = err;
    const errorData = {
        message: message,
        time: Date.now(),
        code: code,
        stackTrace: stack
    }
    try {
        const oldLogs = await readFile(absolutePathToLogsFile);
        await parseJsonAndWriteLogsToFile(oldLogs, absolutePathToLogsFile, errorData)
        next(err);
    } catch (e) {
        if (e.code === 'ENOENT') {
            await stringifyDataAndAppendFile(absolutePathToLogsFile, [errorData]);
        }
        next(e);
    }
}