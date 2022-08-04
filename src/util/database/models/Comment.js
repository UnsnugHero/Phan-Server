const mongoose = require('mongoose');

export const generalCommentSchema = new mongoose.Schema(
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

mongoose.model('GeneralComment', generalCommentSchema);
