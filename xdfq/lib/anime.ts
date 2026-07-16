// ============================================================
// lib/anime.ts — 动画工具函数
//
// 把常用的 ani.js 动画封装成简单函数，组件里直接调用。
//
// anime.js v4 的 API：
//   animate(目标, { 属性... })  — 对「目标」做补间动画
//   utils.stagger(间隔ms)       — 给多个元素创建「依次延迟」效果
//
// 这些函数只能在浏览器端调用（需要 DOM），
// 所以都标记为 "use client" 的组件才能用
// ============================================================

import { animate, utils } from "animejs";

/**
 * animateIn — 元素从下方淡入上移
 *
 * 原理：
 *   opacity 从 0 渐变到 1（淡入）
 *   translateY 从 20px 移动到 0px（上移归位）
 *   duration: 600ms = 0.6 秒
 *   ease: "easeOutCubic" = 先快后慢的缓动曲线，看起来自然
 *
 * 用法：animateIn(someDOMElement)
 */
export function animateIn(el: HTMLElement) {
  animate(el, {
    opacity: [0, 1],        // 透明度：0→1
    translateY: [20, 0],    // Y 轴位移：往下 20px → 原位
    duration: 600,          // 持续时间 600 毫秒
    ease: "easeOutCubic",   // 缓动函数：递减的三次方曲线
  });
}

/**
 * hoverLift — hover 悬浮动画
 *
 * 返回两个函数 enter 和 leave：
 *   enter 绑到 onMouseEnter：元素上浮 6px + 放大 2%
 *   leave 绑到 onMouseLeave：元素回到原位
 *
 * 用法：
 *   const { enter, leave } = hoverLift(el);
 *   el.addEventListener('mouseenter', enter);
 *   el.addEventListener('mouseleave', leave);
 */
export function hoverLift(el: HTMLElement) {
  const enter = () => {
    animate(el, {
      translateY: -6,         // 向上移 6px
      scale: 1.02,            // 放大 2%
      duration: 300,
      ease: "easeOutCubic",
    });
  };
  const leave = () => {
    animate(el, {
      translateY: 0,          // 回到原位
      scale: 1,               // 回到原始大小
      duration: 300,
      ease: "easeOutCubic",
    });
  };
  return { enter, leave };
}

/**
 * staggerList — 列表元素依次入场
 *
 * 让容器里的子元素一个接一个淡入，每个间隔 delay 毫秒
 * container.querySelectorAll(selector) 找到所有目标子元素
 *
 * anime.stagger(100) 的效果：
 *   第 1 个元素延迟 0ms
 *   第 2 个元素延迟 100ms
 *   第 3 个元素延迟 200ms
 *   ...
 *
 * 用法：
 *   staggerList(listElement, ":scope > a", 100)
 *   // 让 listElement 下所有直接子 <a> 每隔 100ms 依次出现
 */
export function staggerList(
  container: HTMLElement,
  selector: string = ":scope > *",   // 默认选所有一级子元素
  delay: number = 100                // 子元素之间的间隔 ms
) {
  const targets = Array.from(container.querySelectorAll(selector));
  animate(targets, {
    opacity: [0, 1],
    translateY: [30, 0],
    delay: utils.stagger(delay),  // 每个目标依次延迟
    duration: 500,
    ease: "easeOutCubic",
  });
}
