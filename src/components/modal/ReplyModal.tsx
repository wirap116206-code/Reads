"use client";
import { useState } from "react";
import Modal from "./Modal";
import { useModalStore } from "@/store/useModalStore";
import { usePostStore } from "@/store/usePostStore";
import Feed from "../feed/Feed";
import Avatar from "../ui/Avatar";
import { authClient } from "@/lib/auth-client";
import AutoSizeTextarea from "../ui/AutoSizeTextarea";
import PostButton from "../ui/PostButton";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function ReplyModal() {
  const { closeReplyPost, isReplyPostOpen } = useModalStore();
  const { selectedPost } = usePostStore();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleReply = async () => {
    if (!content.trim() || !selectedPost) {
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/comments", { content, postId: selectedPost.id });
      setContent("");
      closeReplyPost();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.refresh();
    } catch (error) {
      console.error("COMMENT_ERROR:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal title="Reply" isOpen={isReplyPostOpen} onClose={closeReplyPost}>
      {selectedPost && <Feed post={selectedPost} />}
      <div className="flex items-center gap-3 mt-3 ">
        <Avatar
          imgSrc={session?.user.image || "/images/avatar.jpg"}
          alt="avatar"
          width={40}
          height={40}
        />
        <div className="w-full ">
          <p className=" text-white font-semibold mb-1">{session?.user.name}</p>
          <AutoSizeTextarea
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <PostButton
          title={loading ? "Replying..." : "Reply"}
          onClick={handleReply}
          disabled={loading || !content.trim}
        />
      </div>
    </Modal>
  );
}
