"use client";

  import { useState, useRef, useCallback, useEffect } from "react";
  import Link from "next/link";
  import { animate } from "animejs";
  import Avatar from "@/components/Avatar";

  export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const panel = panelRef.current;
      if (!panel) return;

      if (open) {
        panel.style.transform = "translateX(-100%)";
        panel.style.opacity = "0";
        animate(panel, {
          transform: ["translateX(-100%)", "translateX(0%)"],
          opacity: [0, 1],
          duration: 450,
          ease: "easeOutQuart",
        });
      }
    }, [open]);

    const closePanel = useCallback(() => {
      const panel = panelRef.current;
      if (!panel) {
        setOpen(false);
        return;
      }
      animate(panel, {
        transform: ["translateX(0%)", "translateX(-100%)"],
        opacity: [1, 0],
        duration: 350,
        ease: "easeInQuart",
        onComplete: () => setOpen(false),
      });
    }, []);

    return (
      <>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-40 w-1 h-16 rounded-full bg-amber-300/50 dark:bg-amber-600/40 hover:bg-amber-400 dark:hover:bg-amber-500 hover:h-20
  hover:w-1.5 transition-all duration-300 ease-out"
            title="展开侧边栏"
          />
        )}

        {open && (
          <div
            onClick={closePanel}
            className="fixed inset-0 z-40 bg-black/15 dark:bg-black/40 transition-opacity duration-300"
          />
        )}

        {open && (
          <div
            ref={panelRef}
            className="fixed left-0 top-0 z-50 h-full w-60 bg-amber-50 dark:bg-stone-900 border-r border-amber-200 dark:border-stone-700 shadow-2xl overflow-y-auto"
          >
            <div className="p-6 flex flex-col gap-6 h-full">
              <button
                onClick={closePanel}
                className="self-end text-amber-400 dark:text-amber-500 hover:text-amber-600 dark:hover:text-amber-300 transition-colors text-lg leading-none"
              >
                ✕
              </button>

              <div className="flex flex-col items-center gap-3">
                <Avatar src="/avatar.png" initials="XD" size={64} />
                <h2 className="text-lg font-bold text-amber-950 dark:text-amber-50">
                  XDFQ
                </h2>
                <p className="text-xs text-amber-600 dark:text-amber-400 text-center">
                  Write the code. Change the world.
                </p>
              </div>

              <hr className="border-amber-200 dark:border-stone-700" />

              <nav className="flex flex-col gap-3 text-sm">
                <Link href="/" className="text-amber-700 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-100 transition-colors">
                  🏠 Home
                </Link>
                <Link href="/about" className="text-amber-700 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-100 transition-colors">
                  📖 About
                </Link>
                <Link href="/posts" className="text-amber-700 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-100 transition-colors">
                  📝 Posts
                </Link>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-amber-700 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-100
  transition-colors">
                  🔗 GitHub
                </a>
              </nav>

              <div className="mt-auto" />
            </div>
          </div>
        )}
      </>
    );
  }