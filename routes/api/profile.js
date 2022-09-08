const express = require('express');
const { updateUser } = require('../../controllers/profileController');

const router = express.Router();

router.put('/', updateUser);

module.exports = router;