const mongoose = require('mongoose');
const Request = mongoose.model('Request');

async function getRequest(req, res, next) {
  const requestId = req.params.requestId;

  try {
    const phanRequest = await Request.findById(requestId);

    if (!phanRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    return res.status(200).json(phanRequest);
  } catch (error) {
    next(error);
  }
}

async function createRequest(req, res, next) {
  const { ...requestFields } = req.body;

  // construct request
  const userId = req.user?.id;
  const username = req.user?.username;
  const request = { ...requestFields, user: userId, postedBy: username };

  // attempt creating new document
  try {
    const newRequest = await Request.create(request);
    return res.status(200).json(newRequest);
  } catch (error) {
    next(error);
  }
}

async function updateRequest(req, res, next) {
  const requestId = req.params.requestId;

  try {
    const newRequestData = { ...req.body, edited: true };
    const updatedRequest = await Request.findByIdAndUpdate(requestId, newRequestData);

    return res.status(200).json(updatedRequest);
  } catch (error) {
    next(error);
  }
}

async function deleteRequest(req, res, next) {
  const requestId = req.params.requestId;

  try {
    await Request.findByIdAndDelete(requestId);
    return res.status(200).json({ message: 'Request successfully deleted' });
  } catch (error) {
    next(error);
  }
}

async function searchRequests(req, res, next) {
  const { subject, completed } = req.body;
  const sortOn = req.body.sortOn || 'postedDate';
  const sortDir = req.body.sortDir || 'desc';
  const pageSize = req.body.pageSize || 25;
  const page = req.body.page || 1;

  const query = {};

  if (subject !== '') {
    query['subject'] = { $regex: subject, $options: 'i' };
  }

  if (req.body.hasOwnProperty('completed')) {
    query['completed'] = completed;
  }

  try {
    const results = await Request.find(query)
      .sort({ [sortOn]: sortDir })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.status(200).json({ results });
  } catch (error) {
    next(error);
  }
}

/*************************************
 * Request Likes CRUD
 *************************************/

async function likeRequest(req, res, next) {
  const userId = req.user?.id;
  const { requestId } = req.params;

  try {
    const updatedRequest = await Request.findOneAndUpdate(
      { _id: requestId, likes: { $ne: userId } },
      {
        $addToSet: { likes: userId },
        $inc: { likesCount: 1 }
      }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request has already been liked' });
    }

    res.status(200).json({ message: 'Request successfully liked', request: updatedRequest });
  } catch (error) {
    next(error);
  }
}

async function unlikeRequest(req, res, next) {
  const userId = req.user?.id;
  const { requestId } = req.params;

  try {
    const updatedRequest = await Request.findOneAndUpdate(
      { _id: requestId, likes: { $in: userId } },
      {
        $pull: { likes: userId },
        $inc: { likesCount: -1 }
      }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request has already been unliked' });
    }

    res.status(200).json({ message: 'Request successfully unliked', request: updatedRequest });
  } catch (error) {
    next(error);
  }
}

/*************************************
 * Request Comments CRUD
 *************************************/

// comments are only shown on the frontend on a request page, so
// the GET request will have the comments needed

// TODO: needs validator, text is not empty
async function postComment(req, res, next) {
  const userId = req.user?.id;
  const username = req.user?.username;
  const { requestId } = req.params;

  try {
    const { text } = req.body;

    const newComment = {
      userId: userId || '',
      username,
      text,
      edited: false
    };

    const updatedRequest = await Request.findByIdAndUpdate(requestId, {
      $push: { comments: newComment }
    });

    return res.status(200).json({ message: 'Comment added', updatedRequest });
  } catch (error) {
    next(error);
  }
}

// TODO needs validator on text is not empty
async function updateComment(req, res, next) {
  const userId = req.user?.id;
  const { requestId, commentId } = req.params;

  try {
    const { text } = req.body;

    const updatedRequest = await Request.findOneAndUpdate(
      {
        _id: requestId,
        comments: {
          $elemMatch: {
            _id: commentId,
            userId
          }
        }
      },
      {
        $set: { 'comments.$.text': text, 'comments.$.edited': true }
      }
    );

    // either user can't update this comment or comment doesn't exist
    if (!updatedRequest) {
      return res.status(400).json({ message: 'Error updating request comment' });
    }

    return res.status(200).json({ message: 'Comment updated', updatedRequest });
  } catch (error) {
    next(error);
  }
}

async function deleteComment(req, res, next) {
  const userId = req.user?.id;
  const { requestId, commentId } = req.params;

  try {
    const updatedRequest = await Request.findOneAndUpdate(
      {
        _id: requestId,
        comments: {
          $elemMatch: {
            _id: commentId,
            userId
          }
        }
      },
      { $pull: { comments: { _id: commentId } } }
    );

    if (!updatedRequest) {
      return res.status(400).json({ message: 'Error deleting request comment' });
    }

    return res.status(200).json({ message: 'Comment deleted', updatedRequest });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest,
  searchRequests,
  likeRequest,
  unlikeRequest,
  postComment,
  updateComment,
  deleteComment
};
