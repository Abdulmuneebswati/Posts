const ApiError = require('../utils/ApiError');
const { Post, Image } = require('../models');
const upload = require('../services/multer');
const { whereArchiveClause } = require('../constants');
module.exports = {
  create: async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          return next(new ApiError(400, 'Error uploading file'));
        }
        const { id } = req.user;

        const { title, content } = req.body;
        const imageFile = req.file;

        if (!title || !content) {
          return next(
            new ApiError(400, 'Title, content, and userId are required')
          );
        }

        const base64Image = imageFile
          ? imageFile.buffer.toString('base64')
          : null;
        const createdPost = await Post.create({
          title,
          content,
          userId: id,
        });
        console.log(base64Image);

        if (base64Image) {
          await Image.create({
            url: base64Image,
            postId: createdPost.id,
          });
        }
        res.status(200).send({
          success: true,
          message: 'Post created successfully',
          data: {
            title: createdPost.title,
            content: createdPost.content,
            status: createdPost.status,
            userId: createdPost.userId,
            archive: createdPost.archive,
            image: base64Image,
          },
        });
      });
    } catch (err) {
      next(err);
    }
  },
  getAllPosts: async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        whereArchiveClause,
        include: [
          {
            model: Image,
            attributes: ['url'],
            whereArchiveClause,
          },
        ],
        attributes: ['id', 'title', 'content', 'userId', 'status', 'createdAt'],
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json({
        success: true,
        data: posts,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          return next(new ApiError(400, 'Error uploading file'));
        }
        const { title, content } = req.body;
        const imageFile = req.file;

        const post = req.post;

        const updateData = {};
        if (title) updateData.title = title;
        if (content) updateData.content = content;
        const updatedPost = await post.update(updateData);
        if (imageFile) {
          const base64Image = imageFile.buffer.toString('base64');
          const existingImage = await Image.findOneImage(updatedPost.id);
          if (existingImage) {
            await existingImage.update({ url: base64Image });
          } else {
            await Image.create({
              url: base64Image,
              postId: updatedPost.id,
            });
          }
        }

        res.status(200).send({
          success: true,
          message: 'Post updated successfully',
          data: {
            title: updatedPost.title,
            content: updatedPost.content,
            status: updatedPost.status,
            userId: updatedPost.userId,
            archive: updatedPost.archive,
            image: imageFile ? imageFile.buffer.toString('base64') : null, // If a new image is uploaded, return it
          },
        });
      });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { postId } = req.params;

      const post = req.post;

      await post.update({
        archive: true,
      });

      const image = await Image.findOneImage(postId);
      if (image) {
        await image.update({
          archive: true,
        });
      }

      res.status(200).send({
        success: true,
        message: 'Post and associated image (if any) archived successfully',
      });
    } catch (err) {
      next(err);
    }
  },
};
