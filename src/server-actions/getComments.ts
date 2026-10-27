import { prisma } from "@/lib/prisma";

export async function getComments(postId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });
    return comments;
  } catch (error) {
    console.error("GET_COMMENTS_ERROR:", error);
    return [];
  }
}
