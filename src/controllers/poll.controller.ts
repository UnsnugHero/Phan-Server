import { NextFunction, Request, Response } from 'express';

import { Poll } from '../util/database/models/Poll';
import { CustomError, GenericServerError } from '../util/helpers';

class PollController {
  // only one poll should be active at any given time
  public async getCurrentPoll(req: Request, res: Response, next: NextFunction) {
    try {
      const activePoll = await Poll.findOne({ active: true });

      const responseMessage = activePoll ? 'Current poll successfully retrieved' : 'No poll currently active';

      res.status(200).json({
        message: 'Current poll successfully retrieved',
        poll: activePoll
      });
    } catch (error) {
      console.error(error);
      next(new GenericServerError(error));
    }
  }

  public async createNewPoll(req: Request, res: Response, next: NextFunction) {
    try {
      const existingPoll = await Poll.findOne({ active: true });

      if (existingPoll) {
        return res.status(400).json({
          message: 'There is already an active poll. To create a new one, first archive the current poll'
        });
      }

      const newPoll = await Poll.create({ ...req.body });

      return res.status(200).json({
        message: 'New poll created',
        poll: newPoll
      });
    } catch (error) {
      console.error(error);
      next(new GenericServerError(error));
    }
  }

  public async archivePoll(req: Request, res: Response, next: NextFunction) {
    const pollId: string = req.params.pollId;

    try {
      const updatedPoll = await Poll.findByIdAndUpdate(pollId, { active: false });

      return res.status(200).json({
        message: 'Poll successfully archived',
        poll: updatedPoll
      });
    } catch (error) {
      console.error(error);
      if (error.kind === 'ObjectId') {
        next(new CustomError(404, 'Poll not found'));
      }
      next(new GenericServerError(error));
    }
  }

  public async voteYesPoll(req: Request, res: Response, next: NextFunction) {}

  public async voteNoPoll(req: Request, res: Response, next: NextFunction) {}
}

export = new PollController();
