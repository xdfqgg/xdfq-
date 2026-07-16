import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// ============================================================
// app/layout.tsx — 根布局（Root Layout）
//
// 这是整个网站的「壳」，所有页面都会渲染在这个壳里。
// 你可以把它理解成 HTML 的 <html> + <body> + 公共 UI
//
// 它是 Next.js 的「必须存在」的文件：
//   app/layout.tsx 必须导出 default function
//   在 App Router 中至少需要一个根布局
//
// 类型：Server Component（默认）
//       虽然引入了 Header（Client Component），但这没问题
//       Server Component 可以 import Client Component
// ============================================================

// ----------------------------------------------------------
// Google Fonts 加载
//
// Next.js 在构建时下载字体文件到本地，放在自己的服务器上。
// 用户访问时不需要连接 Google，速度更快。
//
// variable: "--font-geist-sans" — 把字体族名注册为 CSS 变量
//   这样在 CSS 里就能用 font-family: var(--font-geist-sans)
//   (见 globals.css)
// ----------------------------------------------------------
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],     // 只加载拉丁字符，中文不受影响
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ----------------------------------------------------------
// metadata — 站点的 SEO 信息
//
// 这些数据会被 Next.js 自动注入到 <head> 里，变成：
//   <title>XDFQ's Blog</title>
//   <meta name="description" content="Personal blog..." />
//
// 搜索引擎和社交媒体分享时会用到这些信息
// ----------------------------------------------------------
export const metadata: Metadata = {
  title: "XDFQ's Blog",
  description: "Personal blog — thoughts, notes, and experiments.",
};

/**
 * RootLayout — 根布局组件
 *
 * 参数里的 children 就是当前页面组件（比如 page.tsx 渲染的内容）
 * <Header /> 和 <Footer /> 写在 children 外面，
 * 所以每个页面都会自动带上顶栏和底栏
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ----------------------------------------------------------
    // lang="zh-CN" — 告诉浏览器和搜索引擎「这是中文页面」
    // antialiased — 文字抗锯齿，让字体边缘更平滑
    // ----------------------------------------------------------
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/*
        ----------------------------------------------------------
        body 的布局：
          min-h-full flex flex-col — 让页面至少占满屏幕
            flex-col 纵向排列：Header → main → Footer
            flex-1 的 main 会撑满剩余空间
            mt-auto 的 Footer 如果内容短也会被推到底部
        ----------------------------------------------------------
      */}
      <body className="min-h-full flex flex-col bg-amber-50 dark:bg-stone-900 text-amber-950 dark:text-amber-100">
        {/* 顶栏 — 所有页面都有 */}
        <Header />

        {/* 页面主体 — flex-1 让它撑满可用空间 */}
        <main className="flex-1">{children}</main>

        {/* 底栏 — 所有页面都有 */}
        <Footer />
      </body>
    </html>
  );
}
