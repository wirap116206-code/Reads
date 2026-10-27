import Feed from "@/components/feed/Feed";
import Container from "@/components/general/layouts/Container";
import LoadingSpinner from "@/components/search/LoadingSpinner";
import { getLikedPosts } from "@/server-actions/getLikedPost";
import { Heart } from "lucide-react";
import { Suspense } from "react";

async function FavoritesContent() {
  const posts = await getLikedPosts();
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-text-muted space-y-4">
        <Heart size={36} className="mb-3 opacity-70" />
        <p className="text-sm font-medium">You have no favorite posts</p>
      </div>
    );
  }
  return (
    <>
      {posts.map((post) => {
        return <Feed key={post.id} post={post} action />;
      })}
    </>
  );
}

export default function page() {
  return (
    <Container title="Favorites">
      <Suspense fallback={<LoadingSpinner />}>
        <FavoritesContent />
      </Suspense>
    </Container>
  );
}
