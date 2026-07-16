// ============================================================
// app/page.tsx — 首页（路由：/）
//
// 类型：Server Component
//       在服务端读取所有文章，生成 HTML 发给浏览器。
//       里面的 <Avatar /> 和 <PostList /> 是客户端组件，
//       Next.js 会先服务端渲染它们的初始 HTML，
//       浏览器加载后再「注水」(hydrate) 变成可交互的组件。
//
// 工作流程：
//   1. getAllPosts() 在构建/请求时扫描 content/posts/ 目录
//   2. 把文章元信息传给 PostList（客户端组件）
//   3. PostList 渲染卡片 + anime.js 做入场动画
// ============================================================

import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/PostList";
import Avatar from "@/components/Avatar";

export default function Home() {
  // getAllPosts 只能在服务端跑（用了 Node.js 的 fs 模块）
  const posts = getAllPosts();

  return (
    // max-w-3xl：最大宽度 48rem（大约 768px），内容不会太宽
    // mx-auto：水平居中
    // px-6：左右内边距 1.5rem（手机上也留白）
    // py-16：上下内边距 4rem
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/*
        ====== 头部介绍区域 ======
        flex items-center：横向排列，垂直居中
        gap-6：头像和文字之间间距 1.5rem
        小屏幕上可能换行，看着也不错
      */}
      <section className="mb-16 flex items-center gap-6">
        {/*
          Avatar — 客户端组件
          先渲染占位圆/照片，然后在浏览器里播放入场动画
        */}
        <Avatar
          src="/avatar.jpg"    // ← 替换成你的头像路径
          initials="XD"         // ← 替换成你的首字母
          size={96}
        />
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-amber-950 dark:text-amber-50 mb-2">
            Hey, I&apos;m XDFQ 👋
          </h1>
          <p className="text-lg text-amber-700 dark:text-amber-300 leading-relaxed">
            Welcome to my blog. I write about things I learn, build, and think about.
          </p>
        </div>
      </section>

      {/*
        ====== 文章列表区域 ======
        uppercase tracking-widest — 全大写 + 宽字母间距（装饰性小标题）
        PostList 是客户端组件，接收 posts 数据并做入场动画
      */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-6">
          Posts
        </h2>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
