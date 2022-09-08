const express = require('express');
const usersController = require('../../controllers/usersController');

const router = express.Router();

router.route('/')
    .get(usersController.getAllUsers)
    .delete(usersController.deleteUser)

router.get('/:id', usersController.getUser);

module.exports = router;