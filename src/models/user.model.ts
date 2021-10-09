import { Types, Document } from 'mongoose';

export interface User {
  username: string;
  password?: string;
  dateCreated: Date;
  role: 'admin' | 'user';
  id: string;
}

export interface IUser extends Document {
  username: string;
  password?: string;
  dateCreated: Date;
  role: 'admin' | 'user';
}
