import { Schema, model } from 'mongoose';

import { omit } from 'lodash';

const likedCommentSchema = new Schema({
  request: {
    type: Schema.Types.ObjectId,
    ref: 'Request'
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'RequestComment'
  }
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  likedRequests: [Schema.Types.ObjectId],
  likedComments: [likedCommentSchema]
});

export const User = model('User', userSchema);
