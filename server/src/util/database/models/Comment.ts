import { Schema, model } from 'mongoose';

export const requestCommentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  requestId: {
    type: Schema.Types.ObjectId,
    ref: 'Request'
  },
  text: {
    type: String,
    required: true
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  edited: {
    type: Boolean,
    default: false
  }
});

export const generalPollCommentSchema = new Schema({
  username: {
    type: String,
    default: 'Anon'
  },
  text: {
    type: String,
    required: true
  }
});

export const RequestComment = model('RequestComment', requestCommentSchema);
export const GeneralComment = model('GeneralComment', generalPollCommentSchema);
