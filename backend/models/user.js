module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('default', 'admin'),
      allowNull: false,
      defaultValue: 'default',
    },
  });

  User.associate = function (models) {
    User.hasMany(models.Post, { foreignKey: 'userId' });
  };

  return User;
};
