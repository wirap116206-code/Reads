import Comments from "@/components/feed/Comments";
import Container from "@/components/general/layouts/Container";
import PostActions from "@/components/general/PostActions";
import LoadingSpinner from "@/components/search/LoadingSpinner";
import Avatar from "@/components/ui/Avatar";
import { getPostById } from "@/server-actions/getPostById";
import { Ellipsis } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

async function PostLoader({ postId }: { postId: string }) {
  const post = await getPostById(postId);

  if (!post) {
    return null;
  }
  return (
    <div>
      <div className="border-b border-white/10 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 ">
            <Avatar
              imgSrc={post.author.image || "/images/avatar.jpg"}
              alt={post.author.name || "avatar"}
              width={40}
              height={40}
            />
            <div className="text-white font-semibold text-sm hover:underline">
              {post.author.username}
            </div>
            <span className="text-text-muted text-sm">
              {moment(post.createdAt).fromNow()}
            </span>
            <Ellipsis size={18} className="text-text-muted cursor-pointer" />
          </div>
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
        <PostActions post={post} />
      </div>
      <Comments postId={post.id} />
    </div>
  );
}

export default async function PostViewPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const postId = (await params).postId;
  return (
    <Container title="Reads" showBackButton>
      <Suspense fallback={<LoadingSpinner />}>
        <PostLoader postId={postId} />
      </Suspense>
    </Container>
  );
}
