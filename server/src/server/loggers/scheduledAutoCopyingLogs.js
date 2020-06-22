const {promises: {readFile}} = require('fs');
const {absolutePathToLogsDir, absolutePathToLogsFile} = require('./paths');
const {stringifyDataAndAppendFile, stringifyDataAndWriteFile} = require('../utils/fileUtils')

const parseJsonAndCreateFileWithFilteredLogs = async (json, path) => {
    try{
        let filteredLogs = [];
        const jsonExistingLogs = JSON.parse(json);
        if (Array.isArray(jsonExistingLogs)) {
            filteredLogs = jsonExistingLogs.map(({message, time, code, stackTrace}) => ({
                message,
                code,
                time
            }));
        }
        await stringifyDataAndAppendFile(path, filteredLogs);
    }
    catch(e) {
        await stringifyDataAndAppendFile(path, []);
    }
}

module.exports.scheduledAutoCopyingLogs = async () => {
    try {
            const existingLogs = await readFile(absolutePathToLogsFile);
            await parseJsonAndCreateFileWithFilteredLogs(existingLogs, `${absolutePathToLogsDir}/${Date.now()}.json`);
            await stringifyDataAndWriteFile(absolutePathToLogsFile, []);
    }
    catch (e) {
        if (e.code === 'ENOENT') {
            await stringifyDataAndAppendFile(absolutePathToLogsFile, []);
            await stringifyDataAndAppendFile(`${absolutePathToLogsDir}/${Date.now()}.json`, []);
        }
        throw e;
    }
}

