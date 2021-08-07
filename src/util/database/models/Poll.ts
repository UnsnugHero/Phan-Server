import { Schema, model } from 'mongoose';

export const voteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  answer: {
    type: Boolean,
    required: true
  }
});

export const pollSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    votes: [voteSchema]
  },
  { timestamps: true }
);

export const Poll = model('Poll', pollSchema);
