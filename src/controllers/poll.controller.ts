import { NextFunction, Request, Response } from 'express';

import { Poll } from '../util/database/models/Poll';
import { GenericServerError } from '../util/helpers';

class PollController {
  // only one poll should be active at any given time
  public async getCurrentPoll(req: Request, res: Response, next: NextFunction) {
    try {
      const activePoll = await Poll.findOne({ active: true });

      console.log(activePoll);

      res.status(200).json({
        message: 'Current poll successfully retrieved',
        poll: 'nee'
      });
    } catch (error) {
      console.error(error);
      next(new GenericServerError(error));
    }
  }

  public async createNewPoll(req: Request, res: Response, next: NextFunction) {}

  public async archivePoll(req: Request, res: Response, next: NextFunction) {}

  public async voteYesPoll(req: Request, res: Response, next: NextFunction) {}

  public async voteNoPoll(req: Request, res: Response, next: NextFunction) {}
}

export = new PollController();
