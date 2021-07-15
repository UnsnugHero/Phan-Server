import { Schema, model } from 'mongoose';

// Return to this - I don't think this is right
// This cannot simply be an array of OIDs since all requests will have comments
// that have OIDs that start from 0
const likedCommentSchema = new Schema({
  request: {
    type: Schema.Types.ObjectId,
    ref: 'Request'
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
  dateCreated: {
    type: Date,
    default: Date.now
  },
  likedRequests: [Schema.Types.ObjectId],
  likedComments: [likedCommentSchema]
});

export const User = model('User', userSchema);
