import { Types } from 'mongoose';

declare global {
  namespace NodeJS {}

  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        username: string;
      };
    }
  }
}
