import { Types } from 'mongoose';

declare global {
  namespace NodeJS {}

  namespace Express {
    interface Request {
      userId?: Types.ObjectId;
    }
  }
}
