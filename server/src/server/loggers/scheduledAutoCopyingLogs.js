const path = require('path');
const {promises: {readFile, writeFile, appendFile}} = require('fs');
const {exists} = require('../utils/promisifiedFunctions')

module.exports = async () => {
    const absolutePathToLogsDir = path.resolve(__dirname, '../logs');
    const absolutePathToLogFile = path.resolve(absolutePathToLogsDir, 'errorLogs.json');
    try {
        if (await exists(absolutePathToLogsDir)) {
            const logFileData = await readFile(absolutePathToLogFile);
            if (logFileData) {
                const jsonExistingLogs = JSON.parse(logFileData);
                if (Array.isArray(jsonExistingLogs)) {
                    const filteredData = jsonExistingLogs.map(({message, time, code, stackTrace}) => ({
                        message,
                        code,
                        time
                    }));
                    await appendFile(`${absolutePathToLogsDir}/${Date.now()}.json`, JSON.stringify(filteredData, null, 2), 'utf-8')
                }
                await writeFile(absolutePathToLogFile, JSON.stringify([]))
            }
        }
    }
    catch (e) {
        throw e;
    }
}

