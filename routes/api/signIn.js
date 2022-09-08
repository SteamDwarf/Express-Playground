const express = require('express');
const { logIn } = require('../../controllers/signInController');

const router = express.Router();

router.post('/', logIn);

module.exports = router;