const { Post } = require('../models');

module.exports = {
  approvePost: async (req, res, next) => {
    try {
      const { id, status } = req.body;

      const post = await Post.findOne({ where: { id } });

      if (!post) {
        return next(new ApiError(404, 'Post not found'));
      }

      const updatedPost = await post.update({ status });

      return res.status(200).json({
        message: 'Post Approved successfully',
        post: updatedPost,
      });
    } catch (error) {
      next(error);
    }
  },
};
