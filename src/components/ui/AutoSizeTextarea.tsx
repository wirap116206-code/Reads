import { useRef } from "react";

interface AutoSizeTextareaProps {
  placeholder?: string;
  maxHeight?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function AutoSizeTextarea({
  placeholder,
  maxHeight = 400,
  value,
  onChange, // Tambahkan ini!
}: AutoSizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    if (textarea.scrollHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`;
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.overflowY = "hidden";
    }

    onChange?.(e);
  };

  return (
    <textarea
      className="w-full resize-none bg-transparent text-white placeholder:text-text-muted outline-none text-sm leading-relaxed"
      value={value}
      placeholder={placeholder}
      rows={1}
      onChange={handleInput}
      ref={textareaRef}
    />
  );
}
