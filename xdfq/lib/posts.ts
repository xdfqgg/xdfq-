// ============================================================
// lib/posts.ts — 文章读取工具
//
// 这个文件负责从 content/posts/ 目录读取 .mdx 文章文件
// 它用了两个 Node.js 独有的 API（浏览器里没有）：
//   fs — 文件系统操作（读文件、列目录）
//   gray-matter — 解析 Markdown 的 frontmatter（文章元数据）
//
// 这里只能在「服务端」用！
// 「客户端组件」（"use client"）不能 import 这个文件
// ============================================================

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// ----------------------------------------------------------
// PostMeta 接口 — 定义一篇文章的「元信息」长什么样
//
// 接口（interface）就是 TypeScript 的「结构约定」：
// 任何 PostMeta 类型的变量都必须有这 5 个字段
// ----------------------------------------------------------
export interface PostMeta {
  slug: string;     // URL 里的文章名，比如 "hello-world"
  title: string;    // 文章标题
  date: string;     // 发布日期（ISO 格式字符串）
  tags: string[];   // 标签数组，比如 ["blog", "nextjs"]
  excerpt: string;  // 摘要，显示在文章卡片上
}

/**
 * getAllPosts — 获取所有文章列表
 *
 * 流程：
 * 1. 用 fs.readdirSync 列出 content/posts/ 下所有文件名
 * 2. 筛选出 .mdx 文件
 * 3. 逐个读取并用 gray-matter 提取 frontmatter
 * 4. 按日期倒序排列（最新的在最前面）
 *
 * @returns PostMeta[] — 所有文章的元信息数组
 */
export function getAllPosts(): PostMeta[] {
  // process.cwd() = 项目根目录的绝对路径
  const postsDir = path.join(process.cwd(), "content", "posts");
  const filenames = fs.readdirSync(postsDir);

  const posts = filenames
    // 只处理 .mdx 文件
    .filter((f) => f.endsWith(".mdx"))
    // map 把「文件名」变成「文章元信息对象」
    .map((filename) => {
      // 去掉 .mdx 后缀，得到 slug
      // 比如 "hello-world.mdx" → "hello-world"
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(postsDir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");

      // gray-matter 解析文件：
      // data = frontmatter 部分（--- 之间的内容）
      // content = 正文（--- 之后的所有内容）
      const { data } = matter(raw);

      return {
        slug,
        title: data.title ?? slug,   // 如果没写 title，用 slug 兜底
        date: data.date ? new Date(data.date).toISOString() : "",
        tags: data.tags ?? [],
        excerpt: data.excerpt ?? "",
      };
    })
    // sort — 按日期排序
    // b.date > a.date 时返回 1（b 排前面），所以是倒序
    .sort((a, b) => (b.date > a.date ? 1 : -1));

  return posts;
}

/**
 * getPostBySlug — 根据 slug 读取单篇文章
 *
 * @param slug — 文章的 URL 名（不含 .mdx 后缀）
 * @returns { meta: 元信息, content: 正文内容 }
 */
export function getPostBySlug(slug: string): {
  meta: PostMeta;
  content: string;
} {
  const filePath = path.join(process.cwd(), "content", "posts", `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");

  // gray-matter 同时返回 data（frontmatter）和 content（正文）
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      date: data.date ? new Date(data.date).toISOString() : "",
      tags: data.tags ?? [],
      excerpt: data.excerpt ?? "",
    },
    content,
  };
}
