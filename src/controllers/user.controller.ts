import { NextFunction, Request, Response } from 'express';
import { hash } from 'bcrypt';
import { omit } from 'lodash';

import { User } from '../util/database/models/User';
import { CustomError, GenericServerError, signJWT } from '../util/helpers';

class UserController {
  public async getUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.id;

    try {
      const user = await User.findById(userId).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'Get user success', user });
    } catch (error: any) {
      console.error(error);
      if (error.kind === 'ObjectId') {
        next(new CustomError(404, 'User not found'));
      }
      next(new GenericServerError(error));
    }
  }

  public async createNewUser(req: Request, res: Response, next: NextFunction) {
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

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    const userId: string = req.params.userId;

    try {
      const newUserData = { ...req.body };
      const updatedUser = await User.findByIdAndUpdate(userId, newUserData);

      return res.status(200).json(omit(updatedUser.toObject(), ['password']));
    } catch (error: any) {
      console.error(error);
      if (error.kind === 'ObjectId') {
        next(new CustomError(404, 'User not found'));
      }
      next(new GenericServerError(error));
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    const userId: string = req.params.userId;

    try {
      await User.findByIdAndDelete(userId);
      return res.status(200).json({ message: 'User successfully deleted' });
    } catch (error: any) {
      console.error(error);
      if (error.kind === 'ObjectId') {
        next(new CustomError(404, 'User not found'));
      }
      next(new GenericServerError(error));
    }
  }
}

export = new UserController();
