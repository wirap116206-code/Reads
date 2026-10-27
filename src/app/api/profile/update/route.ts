import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import {
  CloudinaryUploadResult,
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/services/cloudinary";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await req.formData();
    const username = formData.get("name") as string;
    const name = formData.get("username") as string;
    const bio = formData.get("bio") as string;
    const avatarFile = formData.get("image") as File | null;

    let imageData: null | CloudinaryUploadResult = null;

    if (avatarFile && avatarFile.size > 0) {
      imageData = await uploadToCloudinary(avatarFile);

      if (imageData && currentUser.imagePublicId) {
        await deleteFromCloudinary(currentUser.imagePublicId);
      }
    }

    if (username) {
      const formattedUsername = username.toLowerCase();
      const existingUser = await prisma.user.findUnique({
        where: {
          username: formattedUsername,
        },
      });
      if (existingUser && existingUser.id !== currentUser.id) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 400 },
        );
      }
    }
    const updateduser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        ...(username && { username: username.toLocaleLowerCase() }),
        ...(name && { name }),
        ...(bio && { bio }),
        ...(imageData && {
          image: imageData.secure_url,
          imagePublicId: imageData.public_id,
        }),
      },
    });

    return NextResponse.json(updateduser);
  } catch (error) {
    console.log("PROFILE_UPDATE_ERROR", error);
    return NextResponse.json(
      { error: "failed to update profile" },
      { status: 500 },
    );
  }
}
