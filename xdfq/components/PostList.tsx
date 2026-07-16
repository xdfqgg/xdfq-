// ============================================================
// components/PostList.tsx — 文章列表容器
//
// 类型：Client Component
//       需要 useEffect 做交错入场动画（staggerList）
//
// 为什么要分成 PostList（客户端）+ page.tsx（服务端）？
//
// page.tsx 是服务端组件，能直接调 getAllPosts()
// （getAllPosts 用了 fs 读文件，浏览器里跑不了）
//
// PostList 是客户端组件，拿到数据后用 anime.js 做动画
//
// 这就是 Next.js App Router 的核心模式：
// 「服务端取数据 → 客户端做交互」
// ============================================================

"use client";

import { useEffect, useRef } from "react";
import { staggerList } from "@/lib/anime";
import PostCard from "./PostCard";
import type { PostMeta } from "@/lib/posts";

export default function PostList({ posts }: { posts: PostMeta[] }) {
  // listRef 指向列表容器 div，staggerList 需要它来找子元素
  const listRef = useRef<HTMLDivElement>(null);

  // useEffect — 组件挂载后启动交错动画
  // 依赖 posts.length：如果文章数量变了，重新播放动画
  useEffect(() => {
    if (listRef.current && posts.length > 0) {
      // 让容器下所有直接子 <a> 标签依次淡入，每个间隔 100ms
      staggerList(listRef.current, ":scope > a", 100);
    }
  }, [posts.length]);

  // 空状态：还没有文章时给个提示
  if (posts.length === 0) {
    return (
      <p className="text-amber-600 dark:text-amber-400 italic">
        No posts yet. Check back soon!
      </p>
    );
  }

  return (
    // flex + flex-col gap-4：纵向排列，每个卡片间距 1rem
    <div ref={listRef} className="flex flex-col gap-4">
      {posts.map((post) => (
        // key={post.slug} — React 列表渲染必须加 key
        // React 用 key 来判断「哪些项变了」，避免不必要的重渲染
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
