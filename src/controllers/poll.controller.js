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
    const user = await User.findById(req.user.id).select('votedPolls').lean();
    const votedPolls = [...user.votedPolls];
    const { pollId } = req.params;
    let noVoteDecr = 0;

    debugger;

    // check if user has voted for this poll already
    const idx = votedPolls.findIndex((poll) => poll.pollId === pollId);
    if (idx > -1) {
      // have they already voted yes? return error
      if (votedPolls[idx].isYesVote) {
        return res.status(400).json({ message: 'You have already voted yes to this poll' });
      }
      // if they have voted no, they switch to yes. subtract 1 from no votes
      else {
        votedPolls[idx].isYesVote = true;
        noVoteDecr--;
      }
    } else {
      votedPolls.push({ pollId, isYesVote: true });
    }

    const updatedPoll = await Poll.findOneAndUpdate(
      { _id: pollId },
      {
        $inc: { yesVotes: 1, noVotes: noVoteDecr }
      }
    );

    await User.findByIdAndUpdate(req.user.id, { votedPolls });

    res.status(200).json({ message: `Successfully voted yes to poll`, poll: updatedPoll });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      next(new CustomError(404, 'Poll not found'));
    }
    next(new GenericServerError(error));
  }
}

export async function voteNoPoll(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select('votedPolls').lean();
    const votedPolls = [...user.votedPolls];
    const { pollId } = req.params;
    let yesVoteDecr = 0;

    // check if user has voted for this poll already
    const idx = votedPolls.findIndex((poll) => poll.pollId === pollId);
    debugger;
    if (idx > -1) {
      // have they already voted no? return error
      if (!votedPolls[idx].isYesVote) {
        return res.status(400).json({ message: 'You have already voted no to this poll' });
      }
      // if they have voted yes, they switch to no. subtract 1 from yes votes
      else {
        votedPolls[idx].isYesVote = false;
        yesVoteDecr--;
      }
    } else {
      votedPolls.push({ pollId, isYesVote: false });
    }

    const updatedPoll = await Poll.findOneAndUpdate(
      { _id: pollId },
      {
        $inc: { yesVotes: yesVoteDecr, noVotes: 1 }
      }
    );

    await User.findByIdAndUpdate(req.user.id, { votedPolls });

    res.status(200).json({ message: `Successfully voted no to poll`, poll: updatedPoll });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      next(new CustomError(404, 'Poll not found'));
    }
    next(new GenericServerError(error));
  }
}
