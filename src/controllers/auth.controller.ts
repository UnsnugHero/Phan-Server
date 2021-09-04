import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import { User } from '../util/database/models/User';
import { omit } from 'lodash';

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

      const payload = {
        role: user.role,
        userId: user.id
      };

      const loggedInUserResponse = omit(user.toObject(), ['password']);

      const accessToken = sign(payload, process.env.SECRET_KEY as string, { expiresIn: '24d' });
      res.status(200).json({ message: 'Successfully logged in', accessToken, user: loggedInUserResponse });
    } catch (error) {
      next(error);
    }
  }
}

export = new AuthController();
