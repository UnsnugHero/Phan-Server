import { Types, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password?: string;
  isAnonymous: boolean;
  dateCreated: Date;
}
