const express = require('express');
const router = express.Router();

// Routers
const userRouter = require('./user');
const postRouter = require('./post');

// Routes
router.use('/users', userRouter);
router.use('/posts', postRouter);

module.exports = router;
