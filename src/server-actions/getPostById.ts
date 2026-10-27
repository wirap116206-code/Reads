import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./getCurrentUser";

export async function getPostById(id: string) {
  try {
    const currentUser = await getCurrentUser();
    const post = await prisma.post.findUnique({
      where: { id },
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
            userId: currentUser?.id,
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
    });

    if (!post) {
      return null;
    }
    return post;
  } catch (error) {
    console.error("GET_POST_ERROR", error);
    return null;
  }
}
