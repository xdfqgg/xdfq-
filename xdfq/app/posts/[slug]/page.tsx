// ============================================================
// app/posts/[slug]/page.tsx — 文章详情页
//
// 路由：/posts/hello-world、/posts/xxx...
//        [slug] 是动态路由参数，
//        访问 /posts/hello-world → slug = "hello-world"
//
// 类型：Server Component（async 函数，服务端渲染）
//
// 核心概念：
//   1. generateStaticParams — 告诉构建器「预生成这些页面」
//   2. generateMetadata — 给每个文章页动态生成 <title>
//   3. dynamic import — 按 slug 加载对应的 .mdx 文件
// ============================================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

/**
 * generateStaticParams — 预生成规则
 *
 * Next.js 构建时会调用这个函数，
 * 返回 [{ slug: "hello-world" }, ...]
 * 然后为每个 slug 生成一个静态 HTML 文件
 *
 * 好处：
 *   用户访问 /posts/hello-world 时，
 *   CDN 直接返回预生成的 HTML，不需要等服务端计算
 *   秒开！
 */
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/**
 * generateMetadata — 动态 SEO 信息
 *
 * 和 generateStaticParams 一样在构建时调用
 * 给每个文章页生成独立的 <title> 和 <meta description>
 *
 * params: Promise<{ slug: string }> — Next.js 15+ 的 params 是异步的
 *   因为页面参数可能来自网络请求（PPR），所以用 Promise 包裹
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { meta } = getPostBySlug(slug);
    return {
      title: `${meta.title} — XDFQ's Blog`,
      description: meta.excerpt || meta.title,
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

/**
 * PostPage — 文章详情页组件
 *
 * 流程：
 *   1. 从 URL 拿到 slug
 *   2. 调用 getPostBySlug 取 frontmatter 元信息
 *   3. 用 dynamic import 加载对应的 .mdx 文件
 *      → @next/mdx 编译 markdown → React 组件
 *   4. 渲染文章头部（标题、日期、标签）+ 正文
 */
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 读取文章元信息，文件不存在就 404
  let meta;
  try {
    meta = getPostBySlug(slug).meta;
  } catch {
    // notFound() — Next.js 内置函数，显示 404 页面
    notFound();
  }

  // ----------------------------------------------------------
  // dynamic import — 动态加载模块
  //
  // 这里用的不是普通的 import，而是 async import()
  // 好处：Next.js 只加载当前这篇文章的 .mdx，不加载别的
  //
  // { default: PostContent } — MDX 文件编译后
  //   默认导出就是渲染后的 React 组件
  // ----------------------------------------------------------
  const { default: PostContent } = await import(
    `@/content/posts/${slug}.mdx`
  );

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      {/*
        ====== 文章头部 ======
        标题 + 日期 + 标签
      */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-amber-950 dark:text-amber-50 mb-4">
          {meta.title}
        </h1>

        {meta.date && (
          <time className="text-sm text-amber-600 dark:text-amber-400">
            {new Date(meta.date).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}

        {meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {meta.tags.map((tag) => (
              // 和 TagBadge 样式完全一致（这里直接写避免额外 import）
              <span
                key={tag}
                className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-stone-700 text-amber-700 dark:text-amber-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/*
        ====== 文章正文 ======
        prose prose-amber — Tailwind Typography 的排版 class
          prose: 基础排版（标题层次、行距、缩进）
          prose-amber: 用 amber 色系的链接和强调色
        dark:prose-invert: 暗色模式下反色（浅字深底）

        max-w-none: 取消 prose 自带的宽度限制
          （我们已经用 max-w-3xl 限制整体宽度了，prose 不用再限制）

        <PostContent /> — 就是 .mdx 文件编译后的 React 组件
          直接渲染，mdx-components.tsx 里的翻译表会自动生效
      */}
      <div className="prose prose-amber dark:prose-invert max-w-none">
        <PostContent />
      </div>
    </article>
  );
}
