import { LoaderCircle } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-14 gap-3">
      <LoaderCircle
        size={32}
        className="animate-spin text-text-muted"
        strokeWidth={2}
      />

      <p className="text-sm text-text-muted">Loading...</p>
    </div>
  );
}
