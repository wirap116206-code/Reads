"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const authStyle = {
  input:
    "bg-surface rounded-xl px-3 py-4 w-full text-white text-sm focus:outline-none",
  button:
    "w-full bg-white text-black font-semibold py-4 rounded-lg hover:opacity-90 transition cursor-pointer",
};

export default function SetupUsernamePage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error("Username field are required!");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/auth/setup-username", {
        username,
      });
      toast.success("Username selected successfully");
      router.replace("/feed");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-white text-center">
          Setup Username
        </h1>
        <form action="" className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Choose your username"
            className={authStyle.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button disabled={loading} className={authStyle.button}>
            {loading ? "Saving..." : "Continue"}
          </button>
        </form>
      </div>
    </main>
  );
}
