import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim() || "";
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            id: {
              not: currentUser.id,
            },
          },
          {
            followers: {
              none: {
                followerId: currentUser.id,
              },
            },
          },
          query
            ? {
                OR: [
                  {
                    username: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                  {
                    name: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {},
        ],
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
      take: 10,
    });
    return NextResponse.json(users);
  } catch (error) {
    console.log("SEARCH_USERS_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}
