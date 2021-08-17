import { NextFunction, Request, Response } from 'express';

import { Poll } from '../util/database/models/Poll';
import { CustomError, GenericServerError } from '../util/helpers';

class PollController {
  constructor() {
    this.voteYesPoll = this.voteYesPoll.bind(this);
    this.voteNoPoll = this.voteNoPoll.bind(this);
  }

  // only one poll should be active at any given time
  public async getCurrentPoll(req: Request, res: Response, next: NextFunction) {
    try {
      const activePoll = await Poll.findOne({ active: true });

      const responseMessage = activePoll ? 'Current poll successfully retrieved' : 'No poll currently active';

      res.status(200).json({
        message: responseMessage,
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

  public async voteYesPoll(req: Request, res: Response, next: NextFunction) {
    await this._votePoll(req, res, next, true);
  }

  public async voteNoPoll(req: Request, res: Response, next: NextFunction) {
    await this._votePoll(req, res, next, false);
  }

  private async _votePoll(req: Request, res: Response, next: NextFunction, vote: boolean) {
    const addVoteField = vote ? 'yesVotes' : 'noVotes';
    const pullVoteField = vote ? 'noVotes' : 'yesVotes';
    const voteType = vote ? 'yes' : 'no';

    const { userId } = req;
    const { pollId } = req.params;

    try {
      const updatedPoll = await Poll.findOneAndUpdate(
        { _id: pollId, [addVoteField]: { $ne: userId } },
        {
          $addToSet: { [addVoteField]: userId },
          $pull: { [pullVoteField]: userId }
        }
      );

      if (!updatedPoll) {
        return res.status(400).json({ message: `You have already voted ${voteType} to this poll` });
      }

      res.status(200).json({ message: `Successfully voted ${voteType} to poll`, poll: updatedPoll });
    } catch (error) {
      console.error(error);
      if (error.kind === 'ObjectId') {
        next(new CustomError(404, 'Poll not found'));
      }
      next(new GenericServerError(error));
    }
  }
}

export = new PollController();
