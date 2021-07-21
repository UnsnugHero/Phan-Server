import { NextFunction, Request, Response } from 'express';
import { hash } from 'bcrypt';
import { omit } from 'lodash';

import { User } from '../models/User';

class UserController {
  public async getUser(req: Request, res: Response, next: NextFunction) {}

  public async createNewUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, isAnonymous } = req.body;
      const encryptedPassword = await hash(password, 10);

      const newUser = await User.create({
        username,
        password: encryptedPassword,
        isAnonymous
      });

      // get the JS object from the returned schema object and omit the password
      const newUserResponse = omit(newUser.toObject(), ['password']);

      res.status(200).json(newUserResponse);
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {}
}

export = new UserController();
