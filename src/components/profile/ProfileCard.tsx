"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, LoaderCircle } from "lucide-react";

import { useModalStore } from "@/store/useModalStore";
import { authClient } from "@/lib/auth-client";
import Avatar from "../ui/Avatar";
import { User } from "@/types/user";
import FollowButton from "../ui/FollowButton";

interface ProfileCardPost {
  userProfile: User;
  currentUserId: string;
}

export default function ProfileCard({
  userProfile,
  currentUserId,
}: ProfileCardPost) {
  const { openEditProfile } = useModalStore();
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isOwnProfile = userProfile.id === currentUserId;

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.replace("/login");
            router.refresh();
          },
          onError: (ctx) => {
            console.error("LOGOUT_ERROR:", ctx.error);
            setIsLoggingOut(false);
          },
        },
      });
    } catch (error) {
      console.error("LOGOUT_ERROR:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl text-white font-semibold">{userProfile.name}</p>

          <p className="text-sm text-white/70 mt-1">@{userProfile.username}</p>
        </div>

        <Avatar
          imgSrc={userProfile.image || "/images/avatar.jpg"}
          width={80}
          height={80}
          alt={userProfile.name || ""}
        />
      </div>

      <div className="flex gap-2 items-center text-sm text-text-muted my-4">
        <p>{userProfile._count.followers} Follower</p>
        <p>{userProfile._count.following} Following</p>
        <p>{userProfile._count.posts} Post</p>
      </div>

      {userProfile.bio ? (
        <p className="text-white/80 my-6 text-sm">{userProfile.bio}</p>
      ) : isOwnProfile ? (
        <p
          className="text-blue-500 text-sm my-4 cursor-pointer"
          onClick={openEditProfile}
        >
          Add bio
        </p>
      ) : null}

      {isOwnProfile ? (
        <button
          type="button"
          className="w-full p-2 border border-border text-white/90 rounded-lg cursor-pointer hover:bg-surface/50 transition"
          onClick={openEditProfile}
        >
          Edit Profile
        </button>
      ) : (
        <FollowButton
          userId={userProfile.id}
          isFollowing={userProfile.isFollowing}
        />
      )}

      {isOwnProfile && (
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="md:hidden mt-4 w-full p-2 border border-border text-white/90 rounded-lg cursor-pointer hover:bg-surface/50 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? (
            <LoaderCircle size={20} className="animate-spin" />
          ) : (
            <LogOut size={20} />
          )}

          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </button>
      )}
    </>
  );
}
