const express = require('express');
const router = express.Router();
const admin = require('../controller/admin');
const isAdmin = require('../middlewares/isAdmin');
const auth = require('../middlewares/auth');

router.patch('/:userId/approve', auth, isAdmin, admin.approvePost);

module.exports = router;
