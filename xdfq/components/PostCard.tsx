// ============================================================
// components/PostCard.tsx — 首页文章卡片
//
// 类型：Client Component
//       hover 动画需要操作 DOM（anime.js）
//
// 每个卡片显示：
//   - 文章标题
//   - 发布日期（格式：2026年7月16日）
//   - 摘要
//   - 标签列表
//
// hover 时卡片微微上浮 + 放大（anime.js 驱动）
// 整个卡片是可点击的链接（Link 包裹一切）
// ============================================================

"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { animate } from "animejs";
import TagBadge from "./TagBadge";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  // ----------------------------------------------------------
  // useRef — 拿到 <a> 的真实 DOM，动画需要真实的页面元素
  // ----------------------------------------------------------
  const cardRef = useRef<HTMLAnchorElement>(null);

  // ----------------------------------------------------------
  // useCallback — 缓存函数引用
  //
  // 每次组件重渲染时，普通函数会被重新创建
  // useCallback 保证只要依赖没变，返回的是同一个函数引用
  // 这样 Link 组件不会因为「onMouseEnter 变了」而重新挂载
  // 第二个参数 [] = 只在首次渲染时创建，之后永远不变
  // ----------------------------------------------------------

  /** 鼠标进入：向上浮 6px + 放大 2% */
  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    animate(cardRef.current, {
      translateY: -6,
      scale: 1.02,
      duration: 300,
      ease: "easeOutCubic",
    });
  }, []);

  /** 鼠标离开：回到原位 */
  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    animate(cardRef.current, {
      translateY: 0,
      scale: 1,
      duration: 300,
      ease: "easeOutCubic",
    });
  }, []);

  // ----------------------------------------------------------
  // 日期格式化
  // zh-CN = 中文格式 → "2026年7月16日"
  // post.date 是 ISO 格式（new Date().toISOString()），
  // 用 new Date() 解析后再格式化
  // ----------------------------------------------------------
  const dateStr = post.date
    ? new Date(post.date).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    // ----------------------------------------------------------
    // Link — Next.js 的客户端导航
    //   和 <a> 不同，Link 不会刷新整个页面，只替换内容（SPA 体验）
    //
    // style={{ transform: "translateY(0)" }}
    //   给 anime.js 一个明确的初始值，动画从 0 到 -6
    // ----------------------------------------------------------
    <Link
      ref={cardRef}
      href={`/posts/${post.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="block p-6 rounded-xl border border-amber-200 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-600 bg-white dark:bg-stone-800 transition-colors"
      style={{ transform: "translateY(0)" }}
    >
      {/* 标题 */}
      <h2 className="text-lg font-semibold text-amber-950 dark:text-amber-100 mb-2">
        {post.title}
      </h2>

      {/* 日期 — <time> 是 HTML5 语义标签，表示日期/时间 */}
      {dateStr && (
        <time className="text-sm text-amber-600 dark:text-amber-400 mb-2 block">
          {dateStr}
        </time>
      )}

      {/* 摘要 — 只在有摘要时显示 */}
      {post.excerpt && (
        <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed mb-3">
          {post.excerpt}
        </p>
      )}

      {/* 标签列表 — 用 TagBadge 组件逐个渲染 */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </Link>
  );
}
