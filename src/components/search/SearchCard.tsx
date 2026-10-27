import Link from "next/link";
import Avatar from "../ui/Avatar";
import { User } from "@/types/user";

export default function SearchCard({ user }: { user: User }) {
  return (
    <div className=" my-4 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <Avatar
            width={40}
            height={40}
            imgSrc={user.image || "/images/avatar.jpg"}
            alt={user.name || ""}
          />
          <div>
            <Link
              href={`/${user.username}`}
              className="text-white font-semibold text-sm hover:underline"
            >
              @{user.username}
            </Link>
            <p className="text-sm text-text-muted">{user.name}</p>
          </div>
        </div>
      </div>
      {user.bio && (
        <p className="text-white/90 my-3 text-sm">this is user bio</p>
      )}
      {user.bio}
      <div className="flex gap-2 items-center text-sm text-text-muted my-4">
        <p>{user._count.followers} Followers</p>
        <p>{user._count.following} Following</p>
        <p>{user._count.posts} Posts</p>
      </div>
    </div>
  );
}
