import type { MDXComponents } from "mdx/types";

// ============================================================
// mdx-components.tsx — MDX 的「翻译表」
//
// MDX 文件本质上是 Markdown + JSX
// 但 React 不认得 Markdown 语法（像 ## 标题、- 列表...）
// @next/mdx 会把 Markdown 转成标准的 HTML 标签
// 而这个文件让你把 HTML 标签「翻译」成你自己的 React 组件
//
// 举个例子：
//   在 .mdx 里写 ## Hello
//   → @next/mdx 把它变成 <h2>Hello</h2>
//   → 这个文件说：h2 应该渲染成带 Tailwind class 的 <h2>
//   → 最终用户看到的是带样式的标题
//
// 这个文件必须在项目根目录，Next.js 会自动发现它
// ============================================================

const components: MDXComponents = {
  // ----------------------------------------------------------
  // 标题 h1～h3
  // tracking-tight: 字母间距微调，让大标题更紧凑好看
  // mt-8 mb-4: 上边距 2rem，下边距 1rem（给标题足够的呼吸空间）
  // ----------------------------------------------------------
  h1: (props) => (
    <h1 className="text-3xl font-bold tracking-tight text-amber-950 dark:text-amber-50 mt-8 mb-4" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl font-semibold tracking-tight text-amber-950 dark:text-amber-50 mt-8 mb-3" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100 mt-6 mb-2" {...props} />
  ),

  // ----------------------------------------------------------
  // 段落 — leading-7 是行高 1.75rem，比默认更宽松，长文阅读更舒服
  // ----------------------------------------------------------
  p: (props) => (
    <p className="leading-7 mb-4 text-amber-800 dark:text-amber-200" {...props} />
  ),

  // ----------------------------------------------------------
  // 无序列表 ul + li
  // list-disc: 小黑点
  // pl-6: 左边缩进 1.5rem
  // space-y-1: 每项之间有 0.25rem 间距
  // ----------------------------------------------------------
  ul: (props) => (
    <ul className="list-disc pl-6 mb-4 space-y-1 text-amber-800 dark:text-amber-200" {...props} />
  ),

  // ----------------------------------------------------------
  // 有序列表 ol + li
  // list-decimal: 数字编号（1. 2. 3.）
  // ----------------------------------------------------------
  ol: (props) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1 text-amber-800 dark:text-amber-200" {...props} />
  ),
  li: (props) => <li className="leading-7" {...props} />,

  // ----------------------------------------------------------
  // 引用块 — 左边有一条竖线 + 斜体字
  // border-l-4: 左边 4px 粗的边框
  // ----------------------------------------------------------
  blockquote: (props) => (
    <blockquote className="border-l-4 border-amber-300 dark:border-amber-600 pl-4 italic my-4 text-amber-700 dark:text-amber-300" {...props} />
  ),

  // ----------------------------------------------------------
  // 链接
  // underline-offset-2: 下划线和文字之间隔 2px，不会紧贴
  // ----------------------------------------------------------
  a: (props) => (
    <a className="text-amber-600 dark:text-amber-400 underline underline-offset-2" {...props} />
  ),

  // ----------------------------------------------------------
  // 代码块 pre + code
  // overflow-x-auto: 代码太长时横向滚动，不会撑破页面
  // 深色背景保持代码可读性，不受页面浅黄色影响
  // ----------------------------------------------------------
  pre: (props) => (
    <pre className="rounded-lg overflow-x-auto my-4 p-4 bg-stone-900 text-amber-100 text-sm" {...props} />
  ),
  code: (props) => (
    <code className="bg-amber-100 dark:bg-stone-800 rounded px-1.5 py-0.5 text-sm font-mono text-amber-900 dark:text-amber-200" {...props} />
  ),

  // ----------------------------------------------------------
  // 图片 — max-w-full 保证图片不会超出容器宽度
  // ----------------------------------------------------------
  img: (props) => (
    <img className="rounded-lg my-4 max-w-full" {...props} />
  ),
};

/**
 * useMDXComponents — Next.js 规定的 hook 名
 * 返回翻译表对象，@next/mdx 在渲染每个 .mdx 时都会调用它
 */
export function useMDXComponents(): MDXComponents {
  return components;
}
