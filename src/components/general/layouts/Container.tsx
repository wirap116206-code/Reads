"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ContainerLayoutsProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
}

export default function Container({
  showBackButton = false,
  title,
  children,
}: ContainerLayoutsProps) {
  const router = useRouter();
  return (
    <section className="flex justify-center mb-15">
      <div className="bg-surface border border-border p-4 rounded-3xl w-full max-w-xl mx-2 ">
        <header className="fixed top-0 left-0 w-full h-14 bg-background flex gap-4 items-center justify-center z-50">
          {showBackButton && (
            <button
              onClick={() => router.back() }
              className="text-white hover:text-text-muted transition "
            >
              <ArrowLeft size={22} />
            </button>
          )}
          <h2 className="text-sm font-semibold text-white">{title}</h2>
        </header>
        <div>{children}</div>
      </div>
    </section>
  );
}
