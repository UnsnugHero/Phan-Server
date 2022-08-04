const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    yesVotes: {
      type: Number,
      default: 0
    },
    noVotes: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

mongoose.model('Poll', pollSchema);
