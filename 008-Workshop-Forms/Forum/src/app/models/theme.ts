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

export interface ThemePost {
  _id: string;
  text: string;
  likes: string[];
  userId: Pick<User, '_id' | 'username'>;
  themeId: string;
  created_at: string;
}

export interface ThemeDetails extends Omit<Theme, 'posts'> {
  posts: ThemePost[];
}
