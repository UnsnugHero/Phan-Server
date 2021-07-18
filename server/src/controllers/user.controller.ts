import { NextFunction, Request, Response } from 'express';
import { hash } from 'bcrypt';

import { User } from '../models/User';

class UserController {
  public async createNewUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, isAnonymous } = req.body;
      const encryptedPassword = await hash(password, 10);

      const newUser = new User({
        username,
        password: encryptedPassword,
        isAnonymous
      });

      await newUser.save();

      res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  }
}

export = new UserController();
