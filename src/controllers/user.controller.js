import { hash } from 'bcrypt';
import omit from 'lodash.omit';

import { User } from '../util/database/models/index.js';
import { CustomError, GenericServerError, signJWT } from '../util/helpers.js';

export async function getUser(req, res, next) {
  const userId = req.user?.id;

  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Get user success', user });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      next(new CustomError(404, 'User not found'));
    }
    next(new GenericServerError(error));
  }
}

export async function createNewUser(req, res, next) {
  try {
    const { username, password, role } = req.body;
    const encryptedPassword = await hash(password, 10);

    const newUser = await User.create({
      username,
      password: encryptedPassword,
      role
    });

    // get the JS object from the returned schema object and omit the password
    const newUserResponse = omit(newUser.toObject(), ['password']);
    const authToken = signJWT(newUser);

    res.status(200).json({ message: 'User successfully created', authToken, user: newUserResponse });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req, res, next) {
  const userId = req.params.userId;

  try {
    const newUserData = { ...req.body };
    const updatedUser = await User.findByIdAndUpdate(userId, newUserData);

    return res.status(200).json(omit(updatedUser.toObject(), ['password']));
  } catch (error) {
    if (error.kind === 'ObjectId') {
      next(new CustomError(404, 'User not found'));
    }
    next(new GenericServerError(error));
  }
}

export async function deleteUser(req, res, next) {
  const userId = req.params.userId;

  try {
    await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: 'User successfully deleted' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      next(new CustomError(404, 'User not found'));
    }
    next(new GenericServerError(error));
  }
}
