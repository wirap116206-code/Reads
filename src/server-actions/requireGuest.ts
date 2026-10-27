import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./getCurrentUser";
import { redirect } from "next/navigation";

export async function requireGuest() {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
    select: {
      username: true,
    },
  });
  if (!user?.username) {
    redirect("/setup-username");
  }
  redirect("/feed");
}
