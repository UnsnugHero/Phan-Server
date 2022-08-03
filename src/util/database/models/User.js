import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user'],
      default: 'user'
    },
    votedPolls: [
      new Schema({
        pollId: Schema.Types.ObjectId,
        isYesVote: Boolean
      })
    ]
  },
  { timestamps: true }
);

export const User = model('User', userSchema);
