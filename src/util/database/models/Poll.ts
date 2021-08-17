import { Schema, model } from 'mongoose';

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
    yesVotes: [Schema.Types.ObjectId],
    noVotes: [Schema.Types.ObjectId]
  },
  { timestamps: true }
);

export const Poll = model('Poll', pollSchema);
