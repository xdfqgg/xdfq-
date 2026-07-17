import { getLearnTree } from "@/lib/learn";
import LearnSidebar from "@/components/LearnSidebar";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courses = getLearnTree();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex gap-8">
      <LearnSidebar courses={courses} />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
