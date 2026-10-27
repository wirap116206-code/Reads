export type Post = {
  id: string;
  content: string | null;
  image: string | null;
  createdAt: Date;
  authorId: string;
  author: {
    id: string;
    name: string;
    username: string | null;
    image: string | null;
  };

  likes: { id: string }[];
  _count: {
    likes: number;
    comments: number;
  };
};
