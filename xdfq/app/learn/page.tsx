import Link from "next/link";
import { getLearnTree } from "@/lib/learn";

export default function LearnPage() {
  const courses = getLearnTree();

  if (courses.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-amber-500 text-lg">还没有学习记录，开始写吧 ✍️</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold tracking-tight text-amber-950 dark:text-amber-50">
        学习笔记
      </h1>
      {courses.map((course) => (
        <div key={course.slug}>
          <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-3">
            📁 {course.name}
          </h2>
          <div className="grid gap-3">
            {course.docs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/learn/${course.slug}/${doc.slug}`}
                className="block p-4 rounded-xl border border-amber-200 dark:border-stone-700 hover:border-amber-400 bg-white dark:bg-stone-800 transition-all"
              >
                <span className="font-medium text-amber-950 dark:text-amber-50">
                  📄 {doc.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
