"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FollowButtonProps {
  userId: string;
  isFollowing?: boolean;
}

export default function FollowButton({
  userId,
  isFollowing = false,
}: FollowButtonProps) {
  const [following, setFollowing] = useState(isFollowing);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleFollow = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/users/follow", {
        userId,
      });

      setFollowing(res.data.following);
      router.refresh();
    } catch (error) {
      console.error("FOLLOW_ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`w-full py-1.5 rounded-lg cursor-pointer transition ${
        following
          ? "border border-border text-white bg-transparent"
          : "bg-white text-black"
      }`}
    >
      {loading ? "..." : following ? "Following" : "Follow"}
    </button>
  );
}
