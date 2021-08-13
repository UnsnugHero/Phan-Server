import { Schema, model } from 'mongoose';

export const generalCommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      default: 'Anon'
    }
  },
  { timestamps: true }
);

export const GeneralComment = model('GeneralComment', generalCommentSchema);
