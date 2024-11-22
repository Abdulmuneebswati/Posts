const ApiError = require('../utils/ApiError');

const { User } = require('../models');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createJwtToken');
module.exports = {
  signup: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw new ApiError(400, 'Kindly fill all fields');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      if (createdUser) {
        const token = createToken(createdUser.id);

        createdUser.token = token;
        await createdUser.save();

        res.status(200).send({
          success: true,
          message: 'User Created Successfully',
          data: {
            name: createdUser.name,
            email: createdUser.email,
            token,
          },
        });
      }
    } catch (err) {
      next(err);
    }
  },
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new ApiError(400, 'Kindly provide both email and password');
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid credentials');
      }

      const token = createToken(user.id);

      user.token = token;
      await user.save();

      res.status(200).send({
        success: true,
        message: 'Signin successful',
        data: {
          name: user.name,
          email: user.email,
          token,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
