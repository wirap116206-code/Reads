import { redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";
import { prisma } from "@/lib/prisma";

export async function requireAuth() {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
    select: {
      id: true,
      username: true,
    },
  });
  if (!user?.username) {
    redirect("/setup-username");
  }
  return user;
}
