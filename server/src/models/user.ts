import { ObjectId, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password?: string;
  isAnonymous: boolean;
  dateCreated: Date;
  likedRequests: Array<ObjectId | string>;
}
