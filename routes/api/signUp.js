const express = require('express');
const { addNewUser } = require('../../controllers/signUpController');

const router = express.Router();

router.post('/', addNewUser);

module.exports = router;