const {logData} = require('../utils/logs');

const errorHandler = (error, request, response, next) => {
    console.error(error);

    logData(error, 'error.log');
    response.status(500).send(error.message); 
}

module.exports = {errorHandler};