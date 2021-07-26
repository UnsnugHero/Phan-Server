import { Schema, model } from 'mongoose';

export const requestCommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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
  },
  likes: Number
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
