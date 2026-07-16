// ============================================================
// postcss.config.mjs — PostCSS 配置文件
//
// PostCSS 是一个 CSS 处理工具，Next.js 用它来编译 CSS。
// 这个文件加载了一个插件：
//   @tailwindcss/postcss — 把 Tailwind 的 @import "tailwindcss"
//                           和 @theme 指令编译成真正的 CSS
// ============================================================

const config = {
  plugins: {
    // Tailwind CSS v4 的 PostCSS 插件
    // 负责处理 globals.css 里的 @import "tailwindcss" 和 @theme
    "@tailwindcss/postcss": {},
  },
};

export default config;
