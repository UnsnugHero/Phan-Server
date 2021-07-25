import { ObjectId } from 'mongoose';

declare global {
  namespace NodeJS {}

  namespace Express {
    interface Request {
      user?: { id: string | ObjectId };
    }
  }
}