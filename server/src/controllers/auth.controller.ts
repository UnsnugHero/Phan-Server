import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import { User } from '../models/User';

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

      // only id is necessary for token
      const payload = {
        user: {
          id: user.id
        }
      };

      const accessToken = sign(payload, process.env.SECRET_KEY as string, { expiresIn: '24d' });
      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }
}

export = new AuthController();
