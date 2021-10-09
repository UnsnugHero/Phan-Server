import { Schema, model } from 'mongoose';
import { ROLES } from '../../helpers';

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
      enum: [ROLES.USER, ROLES.ADMIN],
      default: 'user'
    }
  },
  { timestamps: true }
);

export const User = model('User', userSchema);
