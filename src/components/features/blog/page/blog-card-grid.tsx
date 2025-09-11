import { BlogCard } from "@/components/features/blog/page";
import type { BlogList } from "@/types/blog";

interface BlogCardGridProps {
  blogs: BlogList;
}

export function BlogCardGrid({ blogs }: BlogCardGridProps) {
  if (blogs.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-gray-500">등록된 블로그 리뷰가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
