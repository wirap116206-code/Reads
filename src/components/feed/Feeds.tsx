"use client";

import { usePosts } from "@/custom-hooks/usePost";
import Container from "../general/layouts/Container";
import CreatePostsAction from "./CreatePostsAction";
import LoadingSpinner from "../search/LoadingSpinner";
import Feed from "./Feed";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Feeds() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePosts();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  if (status === "pending") {
    return (
      <Container title="For your page">
        <LoadingSpinner />
      </Container>
    );
  }

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <Container title="For your page">
      <CreatePostsAction />
      {posts.map((post) => {
        return <Feed post={post} key={post.id} action />;
      })}
      <div ref={ref} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </Container>
  );
}
