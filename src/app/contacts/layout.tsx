export const metadata = {
  title: "문의사항 | 삼천리 자전거 중동역점",
  description: "삼천리 자전거 중동역점의 문의사항을 확인하세요.",
};

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-[calc(100vh-64px)]">{children}</main>;
}
