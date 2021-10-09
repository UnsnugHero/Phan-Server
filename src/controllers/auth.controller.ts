import { NextFunction, Request, Response } from 'express';
import { compare } from 'bcrypt';
import { omit } from 'lodash';

import { User } from '../util/database/models/User';
import { signJWT } from '../util/helpers';

class AuthController {
  public async login(req: Request, res: Response, next: NextFunction) {
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
      const authToken = signJWT(user);

      res.status(200).json({ message: 'Successfully logged in', authToken, user: loggedInUserResponse });
    } catch (error) {
      next(error);
    }
  }
}

export = new AuthController();
