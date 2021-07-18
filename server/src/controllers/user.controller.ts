import { Request, Response } from 'express';
import { hash } from 'bcrypt';

import { User } from '../models/User';
import { handleError } from '../util/helpers';

class UserController {
  public getTest(req: Request, res: Response) {
    res.status(200).json({ classic: 'wow' });
  }

  public async createNewUser(req: Request, res: Response) {
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
      handleError(res, error.message, 500, 'Server Error');
    }
  }
}

export = new UserController();
