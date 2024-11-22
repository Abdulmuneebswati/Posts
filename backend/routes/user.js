const express = require('express');
const router = express.Router();
const user = require('../controller/user');
router.post('/', user.signup);
router.post('/signin', user.signin);

module.exports = router;
