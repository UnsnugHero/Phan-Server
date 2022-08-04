const mongoose = require('mongoose');

const requestCommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: {
      type: String,
      default: 'Anon'
    },
    text: {
      type: String,
      required: true
    },
    postedDate: {
      type: Date,
      default: Date.now
    },
    edited: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  likes: [mongoose.Schema.Types.ObjectId],
  likesCount: {
    type: Number,
    default: 0
  },
  postedBy: {
    type: String,
    required: true
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
  edited: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  comments: [requestCommentSchema]
});

mongoose.model('Request', requestSchema);
