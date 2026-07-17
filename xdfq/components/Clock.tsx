"use client";

import { useState, useEffect } from "react";

export default function Clock() {
  // 初始 null，等客户端挂载后才显示时间，避免 SSR 水合不一致
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 挂载前不渲染内容
  if (!time) return <span className="text-3xl font-mono text-amber-400">--:--</span>;

  const h = time.getHours().toString().padStart(2, "0");
  const m = time.getMinutes().toString().padStart(2, "0");
  const s = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="text-center">
      <span className="text-3xl font-mono font-bold tracking-wider text-amber-950 dark:text-amber-50">
        {h}:{m}
      </span>
      <span className="text-lg font-mono text-amber-400 dark:text-amber-600 animate-pulse">
        :{s}
      </span>
    </div>
  );
}
