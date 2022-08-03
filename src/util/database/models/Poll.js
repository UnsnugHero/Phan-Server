import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export const pollSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    yesVotes: {
      type: Number,
      default: 0
    },
    noVotes: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const Poll = model('Poll', pollSchema);
