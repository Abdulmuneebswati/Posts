const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

const isPostAvailable = async (req, res, next) => {
  try {
    const { postId, userId } = req.params;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.archive) {
      return next(
        new ApiError(
          403,
          'The post has been archived and cannot be modified/deleted'
        )
      );
    }
    if (post.userId.toString() !== userId) {
      return next(
        new ApiError(
          403,
          'You do not have permission to perform any operation on this post'
        )
      );
    }
    req.post = post;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = isPostAvailable;
