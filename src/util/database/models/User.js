const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
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
    votedPolls: {
      type: Array
    }
  },
  { timestamps: true }
);

mongoose.model('User', userSchema);
