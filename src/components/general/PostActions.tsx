"use client";

import { useModalStore } from "@/store/useModalStore";
import { usePostStore } from "@/store/usePostStore";
import { Post } from "@/types/post";
import { MessageCircle } from "lucide-react";
import LikeButton from "./LikeButton";

export default function PostActions({ post }: { post: Post }) {
  const { openReplyPost } = useModalStore();
  const { setSelectedPost } = usePostStore();
  return (
    <div className="flex items-center text-xs text-text-muted mt-2">
      <LikeButton
        postId={post.id}
        initialCount={post._count.likes}
        initialLiked={post.likes.length > 0}
      />
      <div
        onClick={() => {
          openReplyPost();
          setSelectedPost(post);
        }}
        className=" flex items-center gap-1 px-2 py-2 rounded-full hover:bg-surface-hover cursor-pointer"
      >
        <MessageCircle size={20} />
        {post._count.comments}
      </div>
    </div>
  );
}
