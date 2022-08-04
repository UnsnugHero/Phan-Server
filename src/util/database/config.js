const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || '');

    // return updated document rather than original on an update
    mongoose.set('returnOriginal', false);

    console.log(chalk.green('Mongo Connected...\n'));
  } catch (error) {
    console.error(error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
