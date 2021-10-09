import { Types, Document } from 'mongoose';

import { SortDir } from './general.model';

export type RequestSortOn = 'postedDate';

export interface RequestComment {
  id?: string | Types.ObjectId;
  userId: string | Types.ObjectId;
  username?: string;
  text: string;
  postedDate?: Date;
  edited: boolean;
}

export interface RequestSearchQuery {
  subject?: string;
  sortOn?: RequestSortOn;
  sortDir?: SortDir;
  pageSize?: number;
  page?: number;
  completed?: boolean;
}

export interface IPhanRequest extends Document {
  user: Types.ObjectId;
  subject: string;
  description: string;
  location: string;
  likes: number;
  comments: RequestComment[];
  postedDate: Date;
  updatedDate: Date;
  edited: boolean;
  completed: boolean;
}
