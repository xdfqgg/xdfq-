// ============================================================
// components/Avatar.tsx — 圆形头像组件
//
// 类型：Client Component
//       需要 anime.js 入场动画 + hover 交互
//
// 两种状态：
//   1. 正常 — 加载并显示 /public/avatar.jpg 图片
//   2. 占位 — 图片加载失败时，显示渐变背景 + 首字母
//      （比如 "/avatar.jpg" 不存在就自动变成占位圆）
//
// 动画：
//   入场 — 旋转 + 放大 + 淡入（弹性缓动）
//   hover — 微微放大 10%
// ============================================================

"use client";

import { useRef, useEffect, useState } from "react";
import { animate } from "animejs";

interface AvatarProps {
  /** 头像图片路径，比如 "/avatar.jpg"（对应 public/avatar.jpg） */
  src?: string;
  /** 图片加载失败时显示的备用文字，取前两个字符 */
  initials?: string;
  /** 圆形直径，单位 px */
  size?: number;
}

export default function Avatar({
  src = "/avatar.png",
  initials = "XD",
  size = 96,
}: AvatarProps) {
  // ----------------------------------------------------------
  // containerRef — 拿到 div 的 DOM 引用给 anime.js
  // useFallback — 是否切换到占位模式（图片加载失败 = true）
  // ----------------------------------------------------------
  const containerRef = useRef<HTMLDivElement>(null);
  const [useFallback, setUseFallback] = useState(false);

  // ----------------------------------------------------------
  // 入场动画：只在组件首次挂载时播放一次
  //
  // easeOutElastic(1, .6) — 弹性缓出
  //   想象橡皮筋回弹：先冲过头，再晃几下回到原位
  //   参数 (1, .6) 控制弹性的幅度和阻尼
  // ----------------------------------------------------------
  useEffect(() => {
    if (containerRef.current) {
      animate(containerRef.current, {
        rotate: ["20deg", 0],              // 从右倾 20° 转正
        scale: [0.3, 1],                   // 从 0.3 倍放大到正常
        opacity: [0, 1],                   // 从透明到不透明
        duration: 800,
        ease: "easeOutElastic(1, .6)",
      });
    }
  }, [useFallback]);  // useFallback 变化时重新播放（
                      // 比如图片加载失败，从图片切到占位圆时）

  const handleMouseEnter = () => {
    if (containerRef.current) {
      animate(containerRef.current, {
        scale: 1.1,         // 放大 10%
        duration: 300,
        ease: "easeOutCubic",
      });
    }
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      animate(containerRef.current, {
        scale: 1,           // 还原
        duration: 300,
        ease: "easeOutCubic",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // ----------------------------------------------------------
      // ring-2：2px 的 box-shadow 环
      // ring-amber-300：环的颜色 → 暖金色
      // ring-offset-2：环和内容之间 2px 的间隙
      // ring-offset-amber-50：间隙颜色 = 页面背景色
      //
      // style={{ opacity: 0 }} — 初始透明
      //   等 useEffect 里的动画把 opacity 补到 1
      //   避免动画播放前闪一下
      // ----------------------------------------------------------
      className="inline-block rounded-full overflow-hidden ring-2 ring-amber-300 dark:ring-amber-600 ring-offset-2 ring-offset-amber-50 dark:ring-offset-stone-900 select-none"
      style={{ width: size, height: size, opacity: 0 }}
    >
      {useFallback ? (
        // ====== 占位模式：渐变圆 + 首字母 ======
        <div
          className="w-full h-full flex items-center justify-center text-white font-bold"
          style={{
            // CSS 渐变：从琥珀色到橙色，135° 对角线
            background: "linear-gradient(135deg, #f59e0b, #d97706, #ea580c)",
            // 字号 = 圆直径的 40%，让字母大小刚好合适
            fontSize: size * 0.4,
          }}
        >
          {/* slice(0, 2) 取前两个字符，toUpperCase 转大写 */}
          {initials.slice(0, 2).toUpperCase()}
        </div>
      ) : (
        // ====== 正常模式：真实图片 ======
        // onError — 图片加载失败时（比如文件不存在），切到占位模式
        <img
          src={src}
          alt="Avatar"
          className="w-full h-full object-cover"
          onError={() => setUseFallback(true)}
        />
      )}
    </div>
  );
}
