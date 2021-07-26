import { Schema, model } from 'mongoose';

import { requestCommentSchema } from './Comment';

const requestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [requestCommentSchema],
  postedDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
  edited: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  }
});

export const Request = model('Request', requestSchema);
