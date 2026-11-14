import { User } from './user';

export interface Theme {
  _id: string;
  themeName: string;
  subscribers: string[];
  posts: string[];
  userId: Pick<User, '_id' | 'username' | 'email'>;
  created_at: string;
  updatedAt: string;
}
