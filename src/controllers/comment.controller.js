const mongoose = require('mongoose');
const GeneralComment = mongoose.model('GeneralComment');

async function postGeneralComment(req, res, next) {
  try {
    const newGeneralComment = await GeneralComment.create(req.body);
    return res.status(200).json(newGeneralComment);
  } catch (error) {
    next(error);
  }
}

module.exports = { postGeneralComment };
