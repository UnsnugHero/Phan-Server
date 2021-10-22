import { Schema, model } from 'mongoose';

const requestCommentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    username: {
      type: String,
      default: 'Anon'
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
  },
  { timestamps: true }
);

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
    type: String
  },
  location: {
    type: String,
    required: true
  },
  likes: [Schema.Types.ObjectId],
  likesCount: {
    type: Number,
    default: 0
  },
  postedBy: {
    type: String,
    required: true
  },
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
  },
  comments: [requestCommentSchema]
});

export const Request = model('Request', requestSchema);
