const fsPromises = require('fs').promises;
const path = require('path');
const uuid = require('uuid');

const logData = (message, file) => {
    const time = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\t`;
    const id = uuid.v4();

    fsPromises.appendFile(path.join(__dirname, '..', 'logs', file), `${id}\t${time}\t${message}\n`)
    .catch(error => console.error(error));
}

module.exports = {logData};