module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    url: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    archive: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    postId: DataTypes.INTEGER,
  });
  Image.associate = function (models) {
    Image.belongsTo(models.Post, { foreignKey: 'postId' });
  };
  Image.findOneImage = async (postId) => {
    return await Image.findOne({
      where: { postId },
    });
  };
  return Image;
};
