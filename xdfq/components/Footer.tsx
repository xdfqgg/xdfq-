// ============================================================
// components/Footer.tsx — 底部版权信息
//
// 类型：Server Component（默认）
//       没有 "use client"，所以是服务端组件。
//       不需要交互，纯展示。Next.js 在构建时直接生成 HTML。
//
// 注意：
//   new Date().getFullYear() 在服务端执行，
//   每次请求或构建时会重新计算年份
// ============================================================

export default function Footer() {
  // 获取当前年份（比如 2026），用于版权声明
  const year = new Date().getFullYear();

  return (
    // ----------------------------------------------------------
    // mt-auto — 页脚自动推到页面底部
    //   配合 body 的 min-h-full flex flex-col，
    //   即使内容少，Footer 也会在页面最下方
    // ----------------------------------------------------------
    <footer className="mt-auto border-t border-amber-200 dark:border-stone-700">
      <div className="max-w-3xl mx-auto px-6 py-8 text-center text-sm text-amber-600 dark:text-amber-400">
        <p>
          © {year} XDFQ. Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"     // 新标签页打开
            rel="noopener noreferrer"  // 安全属性，防止 window.opener 攻击
            className="underline underline-offset-2 hover:text-amber-800 dark:hover:text-amber-200 transition-colors"
          >
            Next.js
          </a>
          {" "}& {" "}
          <a
            href="https://animejs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-amber-800 dark:hover:text-amber-200 transition-colors"
          >
            anime.js
          </a>
        </p>
      </div>
    </footer>
  );
}
