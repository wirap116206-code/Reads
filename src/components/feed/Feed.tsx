import { Post } from "@/types/post";
import Avatar from "../ui/Avatar";
import Link from "next/link";
import moment from "moment";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import PostActions from "../general/PostActions";

interface FeedProps {
  post: Post;
  action?: boolean;
}

export default function Feed({ post, action }: FeedProps) {
  return (
    <div className="border-b border-white/10 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <Avatar
            imgSrc={post.author.image || "/image/avatar.jpg"}
            alt={post.author.name || "avatar"}
            width={40}
            height={40}
          />
          <Link
            href={post.author.username || ""}
            className="text-white font-semibold text-sm hover:underline"
          >
            {post.author.username}
          </Link>
          <span className="text-text-muted text-sm">
            {moment(post.createdAt).fromNow()}
          </span>
        </div>
        <Ellipsis size={18} className="text-text-muted cursor-pointer" />
      </div>
      <Link href={`/feed/${post.id}`} className="space-y-3">
        {post.content && (
          <p className="text-white/80 text-sm leading-relaxed">
            {post.content}
          </p>
        )}
        {post.image && (
          <div className="relative h-80 aspect-square rounded-xl overflow-hidden">
            <Image
              src={post.image}
              alt="post image"
              fill
              className="object-cover"
            />
          </div>
        )}
      </Link>
      {action && <PostActions post={post} />}
    </div>
  );
}
