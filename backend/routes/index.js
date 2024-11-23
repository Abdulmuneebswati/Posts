const express = require('express');
const router = express.Router();

// Routers
const userRouter = require('./user');
const postRouter = require('./post');
const adminRouter = require('./admin');

// Routes
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/admin', adminRouter);

module.exports = router;
