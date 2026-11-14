export interface User {
  _id: string;
  username: string;
  email: string;
  tel?: string;
  themes: string[];
  posts: string[];
  created_at: string;
  updatedAt: string;
}
