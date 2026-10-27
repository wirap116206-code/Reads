"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const authStyle = {
  input:
    "bg-surface rounded-xl px-3 py-4 w-full text-white text-sm focus:outline-none",
  button:
    "w-full bg-white text-black font-semibold py-4 rounded-lg hover:opacity-90 transition cursor-pointer",
};

interface LoginValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      toast.error("All fields are required!");
      return;
    }
    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(error.message as string);
        return;
      }
      toast.success("Login successful");
      setValues({ password: "", email: "" });
      router.replace("/feed");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }finally{
      setLoading(false)
      
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-white text-center">Login</h1>
        <form action="" className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            className={authStyle.input}
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className={authStyle.input}
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <button className={authStyle.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm text-text-muted">
          Don&apos;t hace an account?{" "}
          <Link href={"/register"} className="text-white hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
