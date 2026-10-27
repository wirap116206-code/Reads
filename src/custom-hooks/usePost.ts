import { Post } from "@/types/post";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface FeedResponse {
  posts: Post[];
  nextCursor: string | null;
}

export function usePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }: { pageParam: string | null }) => {
      const res = await axios.get<FeedResponse>("/api/posts", {
        params: {
          cursor: pageParam,
          limit: 3,
        },
      });
      return res.data;
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastpage) => lastpage.nextCursor,
  });
}
