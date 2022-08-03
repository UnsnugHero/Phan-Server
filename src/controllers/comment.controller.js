import { GeneralComment } from '../util/database/models/index.js';
import { GenericServerError } from '../util/helpers.js';

export async function postGeneralComment(req, res, next) {
  try {
    const newGeneralComment = await GeneralComment.create(req.body);
    return res.status(200).json(newGeneralComment);
  } catch (error) {
    next(new GenericServerError(error));
  }
}
