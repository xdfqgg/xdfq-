import Link from "next/link";
import { getLearnTree } from "@/lib/learn";

export default function LearnPage() {
  const courses = getLearnTree();

  // 把所有文档拍平，按日期倒序
  const allDocs = courses
    .flatMap((course) =>
      course.docs.map((doc) => ({ ...doc, course: course.name, courseSlug: course.slug }))
    )
    .filter((d) => d.date)
    .sort((a, b) => (b.date > a.date ? 1 : -1));

  if (allDocs.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-amber-500 text-lg">还没有学习记录，开始写吧 ✍️</p>
      </div>
    );
  }

  // 按日期分组（同一天的放一起）
  const grouped: Record<string, typeof allDocs> = {};
  allDocs.forEach((doc) => {
    const day = new Date(doc.date).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(doc);
  });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-amber-950 dark:text-amber-50 mb-8">
        学习时间线
      </h1>

      {/* 时间线 */}
      <div className="relative pl-8 border-l-2 border-amber-200 dark:border-stone-700 space-y-8">
        {Object.entries(grouped).map(([day, docs]) => (
          <div key={day} className="relative">
            {/* 日期圆点 */}
            <div className="absolute -left-[calc(2rem+5px)] top-0 w-3 h-3 rounded-full bg-amber-400 dark:bg-amber-500 ring-4 ring-amber-50 dark:ring-stone-900" />

            {/* 日期标题 */}
            <time className="text-sm font-semibold text-amber-500 dark:text-amber-400 mb-3 block">
              {day}
            </time>

            {/* 当天文章 */}
            <div className="space-y-2">
              {docs.map((doc) => (
                <Link
                  key={`${doc.courseSlug}/${doc.slug}`}
                  href={`/learn/${doc.courseSlug}/${doc.slug}`}
                  className="block p-4 rounded-xl border border-amber-200 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-600 bg-white dark:bg-stone-800 transition-all group"
                >
                  {/* 课程标签 */}
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 dark:bg-stone-700 text-amber-600 dark:text-amber-400 mb-1">
                    {doc.course}
                  </span>
                  <h3 className="text-sm font-semibold text-amber-950 dark:text-amber-50 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                    {doc.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
