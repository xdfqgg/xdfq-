"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LearnCourse } from "@/lib/learn";

export default function LearnSidebar({ courses }: { courses: LearnCourse[] }) {
  const pathname = usePathname();
  // 记录每个课程的展开状态。默认当前活跃的课程展开，其余收起
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {};
    courses.forEach((c) => {
      state[c.slug] = !pathname.includes(`/learn/${c.slug}`);
    });
    return state;
  });

  const toggle = (slug: string) => {
    setCollapsed((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  if (courses.length === 0) {
    return (
      <aside className="w-52 shrink-0">
        <p className="text-sm text-amber-500">暂无学习记录。</p>
      </aside>
    );
  }

  return (
    <aside className="w-52 shrink-0 max-h-[calc(100vh-6rem)] overflow-y-auto sticky top-24 pr-2">
      <nav className="flex flex-col gap-3">
        {courses.map((course) => {
          const isActive = pathname.includes(`/learn/${course.slug}`);
          const isOpen = !collapsed[course.slug];

          return (
            <div key={course.slug}>
              {/* 课程大标题 — 点击折叠/展开 */}
              <button
                onClick={() => toggle(course.slug)}
                className={`w-full text-left text-xs font-semibold uppercase tracking-wider mb-1 px-1 py-0.5 rounded flex items-center gap-1 transition-colors ${
                  isActive
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-amber-400 dark:text-amber-600 hover:text-amber-500"
                }`}
              >
                <span className="text-[10px] transition-transform duration-200" style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
                  ▶
                </span>
                📁 {course.name}
                <span className="ml-auto text-[10px] opacity-50">
                  {course.docs.length}
                </span>
              </button>

              {/* 文档小标题列表 — 折叠时隐藏 */}
              {isOpen && (
                <div className="flex flex-col gap-0.5 ml-3 animate-in fade-in duration-150">
                  {course.docs.map((doc) => {
                    const href = `/learn/${course.slug}/${doc.slug}`;
                    const isDocActive = pathname === href;
                    return (
                      <Link
                        key={doc.slug}
                        href={href}
                        className={`text-sm pl-3 py-1 rounded-r-lg border-l-2 transition-colors ${
                          isDocActive
                            ? "border-amber-500 text-amber-950 dark:text-amber-100 bg-amber-100/60 dark:bg-stone-700/60 font-medium"
                            : "border-transparent text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 hover:border-amber-300"
                        }`}
                      >
                        📄 {doc.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
