import { Poll, User } from '../util/database/models/index.js';
import { CustomError, GenericServerError } from '../util/helpers.js';

// only one poll should be active at any given time
export async function getCurrentPoll(req, res, next) {
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

export async function createNewPoll(req, res, next) {
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

export async function archivePoll(req, res, next) {
  const pollId = req.params.pollId;

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

export async function voteYesPoll(req, res, next) {
  try {
    const { votedPolls } = await User.findById(req.user.id).select('votedPolls').lean();
    const { pollId } = req.params;
    let noVoteInc = 0;

    // check if user has voted for this poll already
    const votedPoll = votedPolls.find((poll) => poll.pollId === pollId);
    if (votedPoll) {
      // have they already voted yes? return error
      if (votedPoll.isYesVote) {
        return res.status(400).json({ message: 'You have already voted yes to this poll' });
      }
      // if they have voted no, they switch to yes. subtract 1 from no votes
      else {
        noVoteInc--;
      }
    }

    // check

    const updatedPoll = await Poll.findOneAndUpdate(
      { _id: pollId },
      {
        $inc: { yesVotes: 1, noVotes: noVoteInc }
      }
    );

    await User.findByIdAndUpdate(
      { _id: req.user.id },
      {
        $push: {
          votedPolls: {
            pollId,
            isYesVote: true
          }
        }
      }
    );

    res.status(200).json({ message: `Successfully voted yes to poll`, poll: updatedPoll });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      next(new CustomError(404, 'Poll not found'));
    }
    next(new GenericServerError(error));
  }
}

export async function voteNoPoll(req, res, next) {
  await _votePoll(req, res, next, false);
}

async function _votePoll(req, res, next, vote) {
  const hasVoted = req.body.hasVoted;
  const voteType = vote ? 'yes' : 'no';
  let yesVoteIncValue = vote ? 1 : 0;
  let noVoteIncValue = vote ? 0 : 1;

  if (hasVoted) {
    vote ? noVoteIncValue-- : yesVoteIncValue--;
  }

  try {
  } catch (error) {
    if (error.kind === 'ObjectId') {
      next(new CustomError(404, 'Poll not found'));
    }
    next(new GenericServerError(error));
  }
}
