const express = require('express');
const router = express.Router();
const post = require('../controller/post');
const auth = require('../middlewares/auth');
const isPostAvailable = require('../middlewares/isPostAvailable');
router.post('/:userId', auth, post.create);
router.get('/:userId/all', auth, post.getAllPosts);
router.get('/:userId', auth, post.getMyPosts);
router.get('/:userId/:postId', auth, isPostAvailable, post.get);
router.patch('/:userId/:postId', auth, isPostAvailable, post.update);
router.delete('/:userId/:postId', auth, isPostAvailable, post.delete);

module.exports = router;
