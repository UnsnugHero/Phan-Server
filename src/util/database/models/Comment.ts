import { Schema, model } from 'mongoose';

export const generalCommentSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const GeneralComment = model('GeneralComment', generalCommentSchema);
