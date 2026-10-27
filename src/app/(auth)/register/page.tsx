"use client";

import Link from "next/link";
import { authStyle } from "../login/page";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface RegisterValues {
  email: string;
  name: string;
  password: string;
}

export default function RegisterPage() {
  const [values, setValues] = useState<RegisterValues>({
    email: "",
    name: "",
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

  const handleRegister = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!values.name || !values.email || !values.password) {
      toast.error("All fields are required!");
      return;
    }
    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(error.message as string);
        return;
      }
      toast.success("Registration successful");
      setValues({ name: "", password: "", email: "" });
      router.replace("/setup-username");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-white text-center">
          Register
        </h1>
        <form action="" className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter your full name"
            className={authStyle.input}
            name="name"
            value={values.name}
            onChange={handleChange}
          />
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
          <button disabled={loading} className={authStyle.button}>
            {loading ? "Register..." : "Register"}
          </button>
        </form>
        <p className="text-center text-sm text-text-muted">
          Already hace an account?{" "}
          <Link href={"/login"} className="text-white hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
