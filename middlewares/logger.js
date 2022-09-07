const {logData} = require('../utils/logs');

const logger = (request, response, next) => {
    const message = `${request.method}\t${request.url}\t${request.headers.origin}`;

    console.log(message);
    logData(message, 'requests.log')

    next();
}

module.exports = {logger}