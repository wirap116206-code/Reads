import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./getCurrentUser";

export async function getUserProfileByUsername(username: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    throw new Error("Unauthorized");
  }
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      image: true,
      id: true,
      name: true,
      username: true,
      bio: true,
      createdAt: true,
      email: true,
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
      followers: {
        where: {
          followerId: currentUser.id,
        },
        select: {
          id: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }
  return {
    id: user.id,
    name: user.name,
    bio: user.bio,
    email: user.email,
    image: user.image,
    createdAt: user.createdAt,
    username: user.username,

    isFollowing: user.followers.length > 0,
    _count: {
      posts: user._count.posts,
      followers: user._count.followers,
      following: user._count.following,
    },
  };
}
