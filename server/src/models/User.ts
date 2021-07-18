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

userSchema.set('toJSON', {
  // @ts-ignore
  transform: (_doc, ret, _options) => {
    return omit(ret, ['password']);
  }
});

export const User = model('User', userSchema);
