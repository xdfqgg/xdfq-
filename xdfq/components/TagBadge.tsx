// ============================================================
// components/TagBadge.tsx — 标签小徽章
//
// 类型：Server Component
//       不需要任何交互，纯展示。在服务端渲染成 HTML 就行。
//
// 一个小圆角药丸形状的标签，比如 #blog #nextjs
// 在 PostCard 和文章详情页里都用到了
// ============================================================

export default function TagBadge({ tag }: { tag: string }) {
  return (
    // ----------------------------------------------------------
    // px-2.5 py-0.5：水平内边距 0.625rem，垂直 0.125rem
    // rounded-full：完全圆角（药丸形状）
    // text-xs：小字号（0.75rem）
    // font-medium：中等粗细
    // ----------------------------------------------------------
    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-stone-700 text-amber-700 dark:text-amber-300">
      #{tag}
    </span>
  );
}
