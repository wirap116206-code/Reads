import { Post } from "@/types/post";
import { create } from "zustand";

type PostStore = {
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
};

export const usePostStore = create<PostStore>((set) => ({
  selectedPost: null,
  setSelectedPost: (post) => set({ selectedPost: post }),
}));
