const fs = require('fs');
const path = require('path');
const {logData} = require('../utils/logs');

const writeToFile = (dirname, filename, data) => {
    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(path.join(__dirname, '..', dirname, filename));

        writeStream.write(data);
        writeStream.end();
        writeStream.on('finish', resolve)
        writeStream.on('error', (error) => {
            console.error(error);
            logData(error, 'error.log');
            reject();
        });
    });
}

const readFromFile = (dirname, filename, writeStream) => {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(path.join(__dirname, '..', dirname, filename));

        readStream.on('error', (error) => {
            console.error(error);
            logData(error, 'error.log');
            reject();
        });
        readStream.pipe(writeStream);
        readStream.on('finish', resolve);
    });
}

module.exports = {writeToFile, readFromFile}