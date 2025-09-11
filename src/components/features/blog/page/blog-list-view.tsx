import { BlogListItem } from "@/components/features/blog/page";
import type { BlogList } from "@/types/blog";

interface BlogListViewProps {
  blogs: BlogList;
}

export function BlogListView({ blogs }: BlogListViewProps) {
  if (blogs.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-gray-500">등록된 블로그 리뷰가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {blogs.map((blog) => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
