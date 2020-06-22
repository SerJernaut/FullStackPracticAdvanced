const {promises: {appendFile, writeFile}} = require('fs');


const stringifyDataAndAppendFile = async (path, data) => {
    await appendFile(path, JSON.stringify(data, null, 2), 'utf-8');
}

const stringifyDataAndWriteFile = async (path, data) => {
    await writeFile(path, JSON.stringify(data, null, 2));
}

module.exports = {
    stringifyDataAndAppendFile,
    stringifyDataAndWriteFile
}