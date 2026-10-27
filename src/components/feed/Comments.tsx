import { getComments } from "@/server-actions/getComments";
import Avatar from "../ui/Avatar";
import Link from "next/link";
import moment from "moment";

export default async function Comments({ postId }: { postId: string }) {
  const comments = await getComments(postId);
  if (!comments.length) {
    return <div className="text-gray-400 text-sm py-4 ">No comments yet</div>;
  }
  return (
    <>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-2 ">
                <Avatar
                  height={40}
                  width={40}
                  alt="avatar"
                  imgSrc={comment.author.image || "/images/avatar.jpg"}
                />
                <Link
                  className="text-white font-semibold text-sm hover:underline"
                  href={`/${comment.author.username}`}
                >
                  {comment.author.username}
                </Link>
                <span className="text-sm text-text-muted">
                  {moment(comment.createdAt).fromNow()}
                </span>
              </div>
            </div>
            <p className="text-white/90 text-sm ">{comment.content}</p>
          </div>
        );
      })}
    </>
  );
}
