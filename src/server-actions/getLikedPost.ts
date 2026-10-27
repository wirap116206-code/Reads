import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./getCurrentUser";

export async function getLikedPosts() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return [];
    }
    const likes = await prisma.like.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        post: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                name: true,
                image: true,
              },
            },
            likes: {
              where: {
                userId: currentUser.id,
              },
              select: {
                id: true,
              },
            },
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
          },
        },
      },
    });
    return likes.map((like) => like.post);
  } catch (error) {
    console.error("GET_LIKED_POSTS_ERROR:", error);
    return [];
  }
}
