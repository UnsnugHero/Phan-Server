import { NextFunction, Request, Response } from 'express';

import { GeneralComment } from '../util/database/models/Comment';
import { CustomError, GenericServerError } from '../util/helpers';

class CommentController {
  // All comments here refer to the comments posted on the main page
  // under the current poll

  // want this to act similar to search where we implement a inifinite
  // loading situation
  // public getComments(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     GeneralComment.find({});
  //   } catch (error) {}
  // }

  public async postGeneralComment(req: Request, res: Response, next: NextFunction) {
    try {
      const newGeneralComment = await GeneralComment.create(req.body);
      return res.status(200).json(newGeneralComment);
    } catch (error: any) {
      console.error(error);
      next(new GenericServerError(error));
    }
  }
}

export = new CommentController();
