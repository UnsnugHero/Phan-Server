import { NextFunction, Request, Response } from 'express';
import { hash } from 'bcrypt';
import { omit } from 'lodash';

import { User } from '../util/database/models/User';
import { CustomError, GenericServerError } from '../util/helpers';

class UserController {
  /*************************************
   * User CRUD
   *************************************/

  public async getUser(req: Request, res: Response, next: NextFunction) {
    const userId: string = req.params.userId;

    try {
      const user = await User.findById(userId).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      if (error.kind === 'ObjectId') {
        next(new CustomError(404, 'User not found'));
      }
      next(new GenericServerError(error));
    }
  }

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

      return res.status(200).json(omit(updatedUser.toObject(), ['password']));
    } catch (error) {
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
    } catch (error) {
      console.error(error);
      if (error.kind === 'ObjectId') {
        next(new CustomError(404, 'User not found'));
      }
      next(new GenericServerError(error));
    }
  }

  /*************************************
   * User Liked Comments/Request CRUD
   *************************************/
}

export = new UserController();
