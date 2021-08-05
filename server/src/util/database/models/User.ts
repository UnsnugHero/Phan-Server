import { Schema, model } from 'mongoose';

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
    isAnonymous: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const User = model('User', userSchema);
