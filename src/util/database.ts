import mongoose from 'mongoose';

export default async () => {
  // Here is where we check if there is an active connection.
  if (mongoose.connections[0].readyState) return;

  try {
    // Here is where we create a new connection.
    await mongoose.connect(process.env.MONGO_URL || '', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database.');
  } catch (error) {
    console.log('DB error', error);
  }
};
