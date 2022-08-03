import { CustomError, GenericServerError } from '../util/helpers.js';
import { Request as PhanRequest } from '../util/database/models/index.js';

export async function getRequest(req, res, next) {
  const requestId = req.params.requestId;

  try {
    const phanRequest = await PhanRequest.findById(requestId);

    if (!phanRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    return res.status(200).json(phanRequest);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      next(new CustomError(404, 'Request not found'));
    }
    next(new GenericServerError(error));
  }
}

export async function createRequest(req, res, next) {
  const { ...requestFields } = req.body;

  // construct request
  const userId = req.user?.id;
  const username = req.user?.username;
  const request = { ...requestFields, user: userId, postedBy: username };

  // attempt creating new document
  try {
    const newRequest = await PhanRequest.create(request);
    return res.status(200).json(newRequest);
  } catch (error) {
    next(new GenericServerError(error));
  }
}

export async function updateRequest(req, res, next) {
  const requestId = req.params.requestId;

  try {
    const newRequestData = { ...req.body, edited: true };
    const updatedRequest = await PhanRequest.findByIdAndUpdate(requestId, newRequestData);

    return res.status(200).json(updatedRequest);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      next(new CustomError(404, 'Request not found'));
    }
    next(new GenericServerError(error));
  }
}

export async function deleteRequest(req, res, next) {
  const requestId = req.params.requestId;

  try {
    await PhanRequest.findByIdAndDelete(requestId);
    return res.status(200).json({ message: 'Request successfully deleted' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      next(new CustomError(404, 'Request not found'));
    }
    next(new GenericServerError(error));
  }
}

export async function searchRequests(req, res, next) {
  const { subject, filters } = req.body;
  const sortOn = req.body.sortOn || 'postedDate';
  const sortDir = req.body.sortDir || 'desc';
  const pageSize = req.body.pageSize || 25;
  const page = req.body.page || 1;

  const query = { ...filters };

  if (subject !== '') {
    query['subject'] = { $regex: subject, $options: 'i' };
  }

  try {
    const results = await PhanRequest.find(query)
      .sort({ [sortOn]: sortDir })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.status(200).json({ results });
  } catch (error) {
    next(new GenericServerError(error));
  }
}

/*************************************
 * Request Likes CRUD
 *************************************/

export async function likeRequest(req, res, next) {
  const userId = req.user?.id;
  const { requestId } = req.params;

  try {
    const updatedRequest = await PhanRequest.findOneAndUpdate(
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
    console.error(error);
    if (error.kind === 'ObjectId') {
      next(new CustomError(404, 'Request not found'));
    }
    next(new GenericServerError(error));
  }
}

export async function unlikeRequest(req, res, next) {
  const userId = req.user?.id;
  const { requestId } = req.params;

  try {
    const updatedRequest = await PhanRequest.findOneAndUpdate(
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
    if (error.kind === 'ObjectId') {
      next(new CustomError(404, 'Request not found'));
    }
    next(new GenericServerError(error));
  }
}

/*************************************
 * Request Comments CRUD
 *************************************/

// comments are only shown on the frontend on a request page, so
// the GET request will have the comments needed

// TODO: needs validator, text is not empty
export async function postComment(req, res, next) {
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

    const updatedRequest = await PhanRequest.findByIdAndUpdate(requestId, {
      $push: { comments: newComment }
    });

    return res.status(200).json({ message: 'Comment added', updatedRequest });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      next(new CustomError(404, 'Request not found'));
    }
    next(new GenericServerError(error));
  }
}

// TODO needs validator on text is not empty
export async function updateComment(req, res, next) {
  const userId = req.user?.id;
  const { requestId, commentId } = req.params;

  try {
    const { text } = req.body;

    const updatedRequest = await PhanRequest.findOneAndUpdate(
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
    if (error.kind === 'ObjectId') {
      next(new CustomError(404, 'Request not found'));
    }
    next(new GenericServerError(error));
  }
}

export async function deleteComment(req, res, next) {
  const userId = req.user?.id;
  const { requestId, commentId } = req.params;

  try {
    const updatedRequest = await PhanRequest.findOneAndUpdate(
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
    if (error.kind === 'ObjectId') {
      next(new CustomError(404, 'Request not found'));
    }
    next(new GenericServerError(error));
  }
}
