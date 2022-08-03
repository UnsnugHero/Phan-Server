import { compare } from 'bcrypt';
import omit from 'lodash.omit';

import { User } from '../util/database/models/index.js';
import { signJWT } from '../util/helpers.js';

export async function login(req, res, next) {
  const { username, password } = req.body;
  try {
    // check if username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // validate password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const loggedInUserResponse = omit(user.toObject(), ['password']);
    // @ts-ignore
    const authToken = signJWT(user);

    res.status(200).json({ message: 'Successfully logged in', authToken, user: loggedInUserResponse });
  } catch (error) {
    next(error);
  }
}
