import { Schema, model } from 'mongoose';

export const generalPollCommentSchema = new Schema({
  username: {
    type: String,
    default: 'Anon'
  },
  text: {
    type: String,
    required: true
  }
});

export const GeneralComment = model('GeneralComment', generalPollCommentSchema);
