"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import {
  Home,
  Search,
  User,
  Plus,
  LucideIcon,
  LogOut,
  Heart,
  LoaderCircle,
} from "lucide-react";
import { useModalStore } from "@/store/useModalStore";
import { authClient } from "@/lib/auth-client";

interface NavItem {
  href?: string;
  icon: LucideIcon;
  isAction?: boolean;
}

export const navItems: NavItem[] = [
  { href: "/feed", icon: Home },
  { href: "/search", icon: Search },
  { icon: Plus, isAction: true },
  { href: "/favorites", icon: Heart },
  { href: "/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { openCreatePost } = useModalStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);

      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.replace("/login");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("LOGOUT_ERROR:", error);
      alert("Gagal logout. Silakan coba lagi.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className="hidden md:flex items-center justify-between flex-col w-20 fixed z-100 top-0 left-0 h-screen">
      <div className="pt-6">
        <Logo />
      </div>

      <div className="flex flex-col gap-4">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          if (item.isAction) {
            return (
              <button
                onClick={openCreatePost}
                key={index}
                className="p-4 bg-surface text-white rounded-md hover:opacity-80 transition"
              >
                <Icon size={30} />
              </button>
            );
          }

          const isActive = pathname === item.href;

          return (
            <Link href={item.href!} key={index}>
              <div
                className={`p-4 rounded-md transition ${
                  isActive
                    ? "text-white"
                    : "text-text-muted hover:bg-surface/50"
                }`}
              >
                <Icon size={30} />
              </div>
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        aria-label="Logout"
        title="Logout"
        className="mb-6 p-4 rounded-md text-text-muted hover:bg-surface/50 hover:text-white transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoggingOut ? (
          <LoaderCircle size={30} className="animate-spin" />
        ) : (
          <LogOut size={30} />
        )}
      </button>
    </aside>
  );
}
