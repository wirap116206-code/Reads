"use client";
import { useModalStore } from "@/store/useModalStore";
import Modal from "./Modal";
import { useState } from "react";
import Image from "next/image";
import { User } from "@/types/user";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ProfileModalProps {
  userProfile: User;
}

export default function ProfileModal({ userProfile }: ProfileModalProps) {
  const { closeEditProfile, isEditProfileOpen } = useModalStore();
  const [avatarFile, setAvatarFile] = useState<null | File>(null);
  const [avatarPreview, setAvatarPreview] = useState(userProfile.image);
  const [name, setName] = useState(userProfile.name);
  const [username, setUsername] = useState(userProfile.username);
  const [bio, setBio] = useState(userProfile.bio);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setAvatarFile(file);
    const previewURL = URL.createObjectURL(file);
    setAvatarPreview(previewURL);
  };

  const handleSubmit = async () => {
    if (!username || !name) {
      toast.error("Username and Name fields are required!");
      return;
    }
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("name", name || "");
      formdata.append("username", username || "");
      formdata.append("bio", bio || "");
      if (avatarFile) {
        formdata.append("image", avatarFile);
      }
      await axios.patch("/api/profile/update", formdata);
      toast.success("Profile updated successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        alert(error?.response?.data?.error || "Failed to update profile");
      }
    } finally {
      setLoading(false);
      router.refresh();
      closeEditProfile();
    }
  };

  const inputStyles =
    "bg-surface border border-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none";

  return (
    <Modal
      title="Edit Profile"
      onClose={closeEditProfile}
      isOpen={isEditProfileOpen}
    >
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={avatarPreview || "/images/avatar.jpg"}
              alt="avatar"
              fill
              className="object-cover"
            />
          </div>
          <label className="text-sm text-blue-500 cursor-pointer hover:underline">
            Change Avatar
            <input
              className="hidden"
              type="file"
              accept="images/*"
              onChange={handleAvatarChange}
            />
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-text-muted">Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            className={inputStyles}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-text-muted">Username</label>
          <input
            type="text"
            placeholder="@username"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            className={inputStyles}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-text-muted">Bio</label>
          <textarea
            className={`resize-none ${inputStyles}`}
            rows={3}
            value={bio || ""}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-white text-black textsm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition cursor-pointer"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
