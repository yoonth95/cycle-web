import { NoticesTable } from "@/components/features/notices/page";
import { getNoticeList } from "@/lib/notice/client";
import { NoticesTableSectionProps } from "@/types/notice";

export async function NoticesTableSection({ data }: NoticesTableSectionProps) {
  const noticeListData = await getNoticeList(data.defaultValues);
  if (!noticeListData) return null;

  return (
    <section className={data.className}>
      <NoticesTable noticeListData={noticeListData} />
    </section>
  );
}
