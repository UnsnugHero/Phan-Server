const bcrypt = require('bcrypt');
const omit = require('lodash.omit');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const signJWT = require('../util/helpers');

async function login(req, res, next) {
  const { username, password } = req.body;
  try {
    // check if username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const loggedInUserResponse = omit(user.toObject(), ['password']);
    const authToken = signJWT(user);

    return res.status(200).json({ message: 'Successfully logged in', authToken, user: loggedInUserResponse });
  } catch (error) {
    next(error);
  }
}

module.exports = { login };
