module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('pending', 'approved'),
      allowNull: false,
      defaultValue: 'pending',
    },
    userId: DataTypes.INTEGER,
    archive: DataTypes.BOOLEAN,
  });
  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: 'userId' });
    Post.hasMany(models.Image, { foreignKey: 'postId' });
  };
  return Post;
};
