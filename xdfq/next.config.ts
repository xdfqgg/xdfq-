import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// ============================================================
// next.config.ts — Next.js 的「总配置文件」
//
// 这个文件控制 Next.js 的行为：
//   - 哪些扩展名的文件会被当作页面
//   - 如何处理 MDX 文件
//   - 加载什么插件
// ============================================================

const nextConfig: NextConfig = {
  // ----------------------------------------------------------
  // pageExtensions — 告诉 Next.js 哪些文件后缀是「页面」
  //
  // 默认只有 .tsx .ts .jsx .js，加上 .mdx 后
  // content/posts/xxx.mdx 就能被直接 import 了
  // ----------------------------------------------------------
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

// ----------------------------------------------------------
// createMDX — Next.js 的 MDX 插件工厂函数
//
// 它包装了 Next.js 配置，给 webpack/turbopack 添加 MDX 编译能力。
// 参数里的 rehypePlugins 是处理 HTML AST 的插件数组：
//   - rehype-pretty-code：给代码块加语法高亮（按语言上色）
//     theme: "github-dark" 使用 GitHub 暗色主题
// ----------------------------------------------------------
const withMDX = createMDX({
  options: {
    rehypePlugins: [["rehype-pretty-code", { theme: "github-dark" }]],
  },
});

// withMDX(nextConfig) 把 MDX 能力注入到 Next.js 配置中
export default withMDX(nextConfig);
