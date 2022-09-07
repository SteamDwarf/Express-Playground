const express = require('express');
const path = require('path');

const router = express.Router();

router.get('^/$|/index(.html)?', (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'client/build/view', 'index.html'));
});

router.get('/old-index(.html)?', (request, response) => {
    response.redirect(301, '/');
});

module.exports = router;