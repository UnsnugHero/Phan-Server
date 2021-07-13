import mongoose from 'mongoose';

export const connectDB = async () => {
  // wrap try/catch in case of connection failure
  try {
    await mongoose.connect(process.env.MONGO_URL || '', {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Mongo Connected...');
  } catch (error) {
    console.error(error.message);
    // Exit process with failure
    process.exit(1);
  }
};
