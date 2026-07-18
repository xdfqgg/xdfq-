// ============================================================
// components/Header.tsx — 顶部导航栏
//
// 类型：Client Component（"use client"）
//       因为它需要：
//       1. 监听浏览器滚动事件（window.addEventListener）
//       2. 用 anime.js 做动画（需要操作真实 DOM）
//       3. useRef 引用 DOM 元素
//
// 行为：
//   - 始终粘在页面顶部（sticky top-0）
//   - 向下滚动超过 50px → 缩小高度 + 半透明毛玻璃背景
//   - 回到顶部 → 还原高度 + 去掉背景
// ============================================================

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animate } from "animejs";

export default function Header() {
  // ----------------------------------------------------------
  // useRef — React Hook，创建一个「引用」
  //
  // useRef 的值可以在组件的整个生命周期中保持不变
  // 在这里用它来：
  //   headerRef → 拿到 <header> 的真实 DOM 元素（给 anime.js 用）
  //   lastScrollY → 记住「上一次」的滚动位置（判断滚动方向）
  // ----------------------------------------------------------
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  // ----------------------------------------------------------
  // useEffect — React Hook，「副作用」
  //
  // 组件渲染到页面上之后执行。
  // 这里用来绑定滚动事件监听器。
  //
  // 第二个参数 [] 表示「只在组件首次挂载时执行一次」
  // return 的函数是「清理函数」，组件卸载时自动解绑事件
  // ----------------------------------------------------------
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;  // 当前滚动位置（px）
      const header = headerRef.current;
      if (!header) return;

      if (currentY > 50) {
        // 向下滚动超过 50px — 缩小 header
        // 用 if 判断避免每帧都触发动画
        if (lastScrollY.current <= 50) {
          animate(header, {
            paddingTop: ["1.5rem", "0.75rem"],     // 上内边距减半
            paddingBottom: ["1.5rem", "0.75rem"],  // 下内边距减半
            duration: 200,
            ease: "easeOutCubic",
          });
        }
        // 滚动后：白色背景 + 毛玻璃 + 投影
        header.classList.add(
          "shadow-md",
          "bg-white/90",
          "dark:bg-stone-800/90",
          "backdrop-blur"
        );
      } else {
        // 回到顶部 — 还原 header
        if (lastScrollY.current > 50) {
          animate(header, {
            paddingTop: ["0.75rem", "1.5rem"],
            paddingBottom: ["0.75rem", "1.5rem"],
            duration: 200,
            ease: "easeOutCubic",
          });
        }
        header.classList.remove(
          "shadow-md",
          "bg-white/90",
          "dark:bg-stone-800/90",
          "backdrop-blur"
        );
      }
      lastScrollY.current = currentY;
    };

    // passive: true — 告诉浏览器「我不会阻止默认滚动」，性能更好
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ==========================================================
  // JSX — 组件的 HTML 结构
  //
  // sticky: 粘性定位，滚动时会「粘」在屏幕顶部
  // z-50: z-index 层级，保证在其它元素上面
  // max-w-3xl: 最大宽度 48rem（768px）
  // mx-auto: 水平居中
  // ==========================================================
  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full py-6 transition-colors bg-white/60 dark:bg-stone-800/60"
    >
      <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
        {/* 博客名 — 点它回到首页 */}
        <Link
          href="/"
          className="text-xl font-bold text-amber-950 dark:text-amber-50 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
        >
          XDFQ&apos;s Blog
        </Link>

        {/* 导航链接 */}
        <nav className="flex gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-amber-700 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-100 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-amber-700 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-100 transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
