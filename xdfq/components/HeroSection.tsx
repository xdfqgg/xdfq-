"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animate } from "animejs";
import Clock from "@/components/Clock";
import MusicPlayer from "@/components/MusicPlayer";

export default function HeroSection({ posts }: { posts: any[] }) {
  const avatarRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

  useEffect(() => {
    if (avatarRef.current) {
      animate(avatarRef.current, {
        translateX: [-300, 0],
        translateY: [-200, 0],
        rotate: ["-180deg", "0deg"],
        scale: [1.8, 1],
        opacity: [0, 1],
        duration: 1200,
        ease: "easeOutQuart",
      });
    }
    if (nameRef.current) {
      nameRef.current.style.opacity = "0";
      animate(nameRef.current, {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 700,
        ease: "easeOutQuart",
      });
    }
    if (shapesRef.current) {
      const shapes = shapesRef.current.querySelectorAll<HTMLElement>("[data-shape]");
      shapes.forEach((shape, i) => {
        shape.style.opacity = "0";
        shape.style.transform = "scale(0.4)";
        animate(shape, {
          scale: [0.4, 1],
          opacity: [0, 1],
          duration: 800,
          delay: 1000 + i * 120,
          ease: "easeOutBack(1.4)",
        });
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div ref={shapesRef} className="relative w-[600px] h-[540px]">

        {/* ============================================================
            上层：横长空心矩形（左）+ 实心椭圆（右），并排一行
            ============================================================ */}

        {/* 音乐播放器 — 替换云朵 Posts */}
        <div
          data-shape
          className="absolute left-[0%] top-[4%] w-[55%]"
        >
          <MusicPlayer />
        </div>

        {/* 右侧 — 实心椭圆（背景填充，高度明显大于左侧矩形） */}
        <div
          data-shape
          className="absolute left-[58%] top-[4%] w-[32%] h-16 rounded-full bg-amber-200/60 dark:bg-amber-700/40 border border-amber-300 dark:border-amber-600 flex items-center justify-center"
        >
          <Clock />
        </div>

        {/* ============================================================
            中层：
              正中心 = 实心圆（头像），垂直在椭圆下方
              左侧 = 阶梯空心方框组（长短宽窄错落，竖向拉长超过圆）
              右侧 = 竖向空心长矩形（贴圆右下，伸到底部）
            ============================================================ */}

        {/* ====== 左侧积木堆（独立定位，宽窄错落，微旋转） ====== */}

        {/* Notes — 学习笔记，跳转到 /learn */}
        <Link
          href="/learn"
          data-shape
          className="absolute left-[2%] top-[26%] w-28 h-12 border-2 border-amber-400 dark:border-amber-500 rounded-xl bg-amber-100/80 dark:bg-amber-900/40 shadow-md rotate-1 flex items-center justify-center gap-1 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span className="text-xs font-bold text-amber-700 dark:text-amber-300">💡 学习笔记</span>
        </Link>

        {/* Tags — 小方块，左倾叠在大积木下 */}
        <div
          data-shape
          className="absolute left-[8%] top-[37%] w-16 h-10 border-2 border-orange-300 dark:border-orange-600 rounded-lg bg-orange-100/80 dark:bg-orange-900/40 shadow-sm -rotate-2 flex items-center justify-center"
        >
          <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400">待开发2</span>
        </div>

        {/* Links — 竖长条积木 */}
        <div
          data-shape
          className="absolute left-[1%] top-[43%] w-12 h-16 border-2 border-yellow-400 dark:border-yellow-600 rounded-xl bg-yellow-100/80 dark:bg-yellow-900/40 shadow-md rotate-3 flex items-center justify-center"
        >
          <span className="text-[10px] font-bold text-yellow-700 dark:text-yellow-300 leading-tight text-center">待开<br/>发3</span>
        </div>

        {/* Archive — 横宽积木 */}
        <div
          data-shape
          className="absolute left-[5%] top-[57%] w-24 h-12 border-2 border-amber-400 dark:border-amber-500 rounded-xl bg-amber-100/80 dark:bg-amber-900/40 shadow-md -rotate-1 flex items-center justify-center gap-1"
        >
          <span className="text-xs font-bold text-amber-700 dark:text-amber-300">📂 待开发4</span>
        </div>

        {/* More — 最小方块 */}
        <div
          data-shape
          className="absolute left-[10%] top-[67%] w-14 h-10 border-2 border-orange-300 dark:border-orange-600 rounded-lg bg-orange-100/80 dark:bg-orange-900/40 shadow-sm rotate-2 flex items-center justify-center"
        >
          <span className="text-[9px] font-bold text-orange-600 dark:text-orange-400">待开发5</span>
        </div>

        {/* 正中心 — 实心圆（头像），垂直在椭圆正下方 */}
        <div className="absolute left-1/2 top-[30%] -translate-x-[58%] -translate-y-0 flex flex-col items-center gap-2 z-10">
          <div
            ref={avatarRef}
            className="w-40 h-40 rounded-full overflow-hidden ring-[8px] ring-amber-300 dark:ring-amber-500 shadow-2xl bg-amber-300 dark:bg-amber-600"
            style={{ opacity: 0, transform: "translate(-300px, -200px) rotate(-180deg) scale(1.8)" }}
          >
            <img
              src="/avatar.png"
              alt="Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                target.parentElement!.style.background = "linear-gradient(135deg, #f59e0b, #ea580c)";
              }}
            />
          </div>
          <h1
            ref={nameRef}
            className="text-sm font-extrabold text-amber-800 dark:text-amber-100 whitespace-nowrap"
            style={{ opacity: 0 }}
          >
            Hey, I&apos;m XDFQ
          </h1>
        </div>

        {/* 右侧 — 竖向空心长矩形，左上贴圆的右下，向下延伸到底部 */}
        <Link
          href="/about"
          data-shape
          className="absolute right-[5%] top-[20%] w-[24%] h-[60%] border-2 border-amber-300 dark:border-amber-500 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-amber-50/80 dark:hover:bg-stone-700/50 hover:border-amber-400 transition-all"
        >
          <span className="text-4xl">📖</span>
          <span className="font-bold text-sm text-amber-700 dark:text-amber-300">About</span>
        </Link>

        {/* ============================================================
            下层：真实日历卡片
            ============================================================ */}
        <div
          data-shape
          className="absolute left-[38%] bottom-[5%] w-20 overflow-hidden rounded-xl shadow-lg border border-amber-200 dark:border-stone-700"
        >
          {/* 月份头 — 红色顶栏 */}
          <div className="bg-amber-500 dark:bg-amber-600 py-0.5 text-center">
            <span className="text-[10px] font-bold text-white tracking-wide">
              {today.getFullYear()}年{today.getMonth() + 1}月
            </span>
          </div>
          {/* 日期主体 — 白色底，大字 */}
          <div className="bg-white dark:bg-stone-800 py-1.5 text-center">
            <span className="text-2xl font-extrabold text-amber-950 dark:text-amber-50 leading-none">
              {today.getDate()}
            </span>
          </div>
          {/* 底部 — 星期 */}
          <div className="bg-amber-50 dark:bg-stone-700 py-0.5 text-center">
            <span className="text-[10px] text-amber-600 dark:text-amber-400">
              {weekdays[today.getDay()]}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
