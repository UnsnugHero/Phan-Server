const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const omit = require('lodash.omit');

const User = mongoose.model('User');
const signJWT = require('../util/helpers');

async function getUser(req, res, next) {
  const userId = req.user?.id;

  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Get user success', user });
  } catch (error) {
    next(error);
  }
}

async function createNewUser(req, res, next) {
  try {
    const { username, password, role } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: encryptedPassword,
      role
    });

    // get the JS object from the returned schema object and omit the password
    const newUserResponse = omit(newUser.toObject(), ['password']);
    const authToken = signJWT(newUser);

    return res.status(200).json({ message: 'User successfully created', authToken, user: newUserResponse });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  const userId = req.params.userId;

  try {
    const newUserData = { ...req.body };
    const updatedUser = await User.findByIdAndUpdate(userId, newUserData);

    return res.status(200).json(omit(updatedUser.toObject(), ['password']));
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  const userId = req.params.userId;

  try {
    await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: 'User successfully deleted' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUser,
  createNewUser,
  updateUser,
  deleteUser
};
