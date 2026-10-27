"use client";
import { useModalStore } from "@/store/useModalStore";
import Modal from "./Modal";
import Avatar from "../ui/Avatar";
import { authClient } from "@/lib/auth-client";
import AutoSizeTextarea from "../ui/AutoSizeTextarea";
import { useRef, useState } from "react";
import { ImageIcon, Smile, X } from "lucide-react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import Image from "next/image";
import PostButton from "../ui/PostButton";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export default function CreatePostModal() {
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState<null | string>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { isCreatePostOpen, closeCreatePost } = useModalStore();
  const { data: session } = authClient.useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setImageFile(file);
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setContent((prev) => prev + emojiData.emoji);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (content) {
        formData.append("content", content);
      }
      if (imageFile) {
        formData.append("image", imageFile);
      }
      await axios.post("api/posts", formData);
      setContent("");
      setImageFile(null);
      setImagePreview(null);

      queryClient.invalidateQueries({queryKey:["posts"]})

      closeCreatePost();
    } catch (error) {
      console.error("CREATE_POST_ERROR", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Create Post"
      onClose={closeCreatePost}
      isOpen={isCreatePostOpen}
    >
      <div className="flex item-start gap-3 mt-3">
        <Avatar
          imgSrc={session?.user.image || "/images/avatar.jpg"}
          alt={session?.user.name || ""}
          width={40}
          height={40}
        />
        <div className="w-full">
          <p className="text-white font-semibold mb-1s">{session?.user.name}</p>
          <AutoSizeTextarea
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {imagePreview && (
            <div className="relative mt-3 rounded-xl overflow-hidden w-full h-64 ">
              <Image
                src={imagePreview}
                alt="preview-image"
                fill
                className="object-cover"
              />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black/60 p-1 rounded-full"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 text-text-muted my-3 relative">
        <button onClick={() => fileInputRef.current?.click()}>
          <ImageIcon className="cursor-pointer" size={20} />
        </button>
        <input
          onChange={handleImageChange}
          type="file"
          accept="/images/*"
          hidden
          ref={fileInputRef}
        />
        <button onClick={() => setShowEmojiPicker((prev) => !prev)}>
          <Smile className="cursor-pointer" size={20} />
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-20 z-50">
            <EmojiPicker theme={Theme.DARK} onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <PostButton
          title={loading ? "Posting..." : "Post"}
          onClick={handleSubmit}
          disabled={loading}
        />
      </div>
    </Modal>
  );
}
