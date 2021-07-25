import { NextFunction, Request, Response } from 'express';
import { hash } from 'bcrypt';
import { omit } from 'lodash';

import { User } from '../models/User';
import { CustomError, GenericServerError } from '../util/helpers';

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

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    const userId: string = req.params.userId;

    try {
      const newUserData = { ...req.body };
      const updatedUser = await User.findByIdAndUpdate(userId, newUserData);

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      if (error.kind === 'ObjectId') {
        next(new CustomError(404, 'User not found'));
      }
      next(new GenericServerError(error));
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {}
}

export = new UserController();
