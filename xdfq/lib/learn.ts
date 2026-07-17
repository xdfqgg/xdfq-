import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 单个学习文档的元信息
export interface LearnDoc {
  slug: string;
  title: string;
  date: string;
  order: number;
}

// 一个语言/课程（包含多篇文档）
export interface LearnCourse {
  name: string;        // 课程名，如 "JavaScript"
  slug: string;        // 路径名，如 "javascript"
  docs: LearnDoc[];    // 该课程下的所有文档，按 order 排序
}

// 获取所有学习内容（课程 → 文档树）
export function getLearnTree(): LearnCourse[] {
  const learnDir = path.join(process.cwd(), "content", "learn");
  if (!fs.existsSync(learnDir)) return [];

  const courses: LearnCourse[] = [];

  const courseNames = fs.readdirSync(learnDir);
  for (const courseName of courseNames) {
    const coursePath = path.join(learnDir, courseName);
    if (!fs.statSync(coursePath).isDirectory()) continue;

    const docs: LearnDoc[] = [];
    const files = fs.readdirSync(coursePath);

    for (const file of files) {
      if (!file.endsWith(".mdx")) continue;
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(coursePath, file), "utf-8");
      const { data } = matter(raw);

      docs.push({
        slug,
        title: data.title ?? slug,
        date: data.date ? new Date(data.date).toISOString() : "",
        order: data.order ?? 999,
      });
    }

    docs.sort((a, b) => a.order - b.order);
    courses.push({ name: courseName, slug: courseName, docs });
  }

  courses.sort((a, b) => a.name.localeCompare(b.name));
  return courses;
}
