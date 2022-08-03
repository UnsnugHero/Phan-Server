import mongoose from 'mongoose';
const { Schema, model } = mongoose;

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
