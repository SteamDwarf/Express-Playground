const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'client/build/view/about', 'index.html'));
});

module.exports = router;