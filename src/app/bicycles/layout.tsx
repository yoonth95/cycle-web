import Link from "next/link";

export default function BicyclesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="flex flex-col gap-3">
        <Link href="/bicycles" prefetch={true}>
          자전거 페이지
        </Link>
        <Link href="/bicycles/style" prefetch={true}>
          스타일 페이지
        </Link>
        <Link href="/bicycles/style/smart-mobility" prefetch={true}>
          전기 자전거
        </Link>
      </div>
      {children}
    </main>
  );
}
