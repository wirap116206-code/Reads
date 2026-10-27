"use client";
import Link from "next/link";
import Avatar from "../ui/Avatar";
import { authClient } from "@/lib/auth-client";
import PostButton from "../ui/PostButton";
import { useModalStore } from "@/store/useModalStore";

export default function CreatePostsAction() {
  const { data: session } = authClient.useSession();
  const { openCreatePost } = useModalStore();
  return (
    <div className="flex items-center gap-4 border-b border-white/10 py-2 ">
      <Link href="/profile">
        <Avatar
          imgSrc={session?.user.image || "/images/avatar.jpg"}
          alt={session?.user.name || ""}
          width={40}
          height={40}
        />
      </Link>
      <div className="w-full flex justify-between items-center">
        <p
          onClick={openCreatePost}
          className="text-text-muted text-sm cursor-pointer"
        >
          What&apos;s new?
        </p>
        <PostButton title="Post" onClick={openCreatePost} />
      </div>
    </div>
  );
}
