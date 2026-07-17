"use client";

  import { useState, useEffect, useCallback } from "react";

  export default function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const handleCopy = useCallback(() => {
      if (typeof navigator === "undefined") return;
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }, [text]);

    if (!mounted) return null;

    return (
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-stone-700 text-amber-100 hover:bg-stone-600 transition-colors"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    );
  }