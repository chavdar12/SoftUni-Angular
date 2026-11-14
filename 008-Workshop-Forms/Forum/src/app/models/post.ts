import { Theme } from './theme';
import { User } from './user';

export interface Post {
  _id: string;
  text: string;
  likes: string[];
  userId: Pick<User, '_id' | 'username'>;
  themeId: Pick<Theme, '_id' | 'themeName'>;
  created_at: string;
  updatedAt: string;
}
