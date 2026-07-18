import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLearnTree } from "@/lib/learn";
import fs from "fs";
import path from "path";

export function generateStaticParams() {
  const courses = getLearnTree();
  const paths: { slug: string[] }[] = [];
  for (const course of courses) {
    for (const doc of course.docs) {
      paths.push({ slug: [course.slug, doc.slug] });
    }
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [courseName, docName] = slug;

  try {
    const filePath = path.join(
      process.cwd(),
      "content/learn",
      courseName,
      `${docName}.mdx`
    );
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = (await import("gray-matter")).default(raw);
    return {
      title: `${data.title ?? docName} — ${courseName} — My Blog`,
    };
  } catch {
    return { title: "Not Found" };
  }
}

export default async function LearnDocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const [courseName, docName] = slug;

  // 验证文件存在
  const filePath = path.join(
    process.cwd(),
    "content/learn",
    courseName,
    `${docName}.mdx`
  );
  if (!fs.existsSync(filePath)) notFound();

  const { default: DocContent } = await import(
    `@/content/learn/${courseName}/${docName}.mdx`
  );

  return (
    <div>
      {/* 返回 */}
      <Link
        href="/learn"
        className="inline-block text-xl text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors mb-6"
      >
        {"<"}
      </Link>

      <article>
        <div className="prose prose-amber dark:prose-invert max-w-none">
          <DocContent />
        </div>
      </article>
    </div>
  );
}
