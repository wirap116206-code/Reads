"use client";

import axios from "axios";
import { Heart } from "lucide-react";
import { useState } from "react";

interface LikeButtonProps {
  postId: string;
  initialLiked: boolean;
  initialCount: number;
}

export default function LikeButton({
  postId,
  initialCount,
  initialLiked,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const handleLike = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("/api/posts/like", { postId });
      const likedState = res.data.liked;
      setLiked(likedState);
      setCount((prev) => (likedState ? prev + 1 : prev - 1));
    } catch (error) {
      console.error("LIKE_ERROR:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-1 text-sm cursor-pointer"
    >
      <Heart size={18} className={liked ? "text-pink-500 fill-pink-500" : ""} />
      <span className={liked ? "text-pink-500" : ""}>{count}</span>
    </button>
  );
}
