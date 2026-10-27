export interface User {
  id: string;
  name: string | null;
  username: string | null;
  email: string | null;
  bio: string | null;
  image: string | null;
  createdAt: Date;
  isFollowing?: boolean;
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
}
