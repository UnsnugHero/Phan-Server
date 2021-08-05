import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || '', {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // return updated document rather than original on an update
    mongoose.set('returnOriginal', false);

    console.log('Mongo Connected...');
  } catch (error) {
    console.error(error.message);
    // Exit process with failure
    process.exit(1);
  }
};
