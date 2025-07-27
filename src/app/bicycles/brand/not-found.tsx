import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Award, Home } from "lucide-react";

export default function BrandNotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <Award className="h-12 w-12 text-red-600" />
        </div>

        <h1 className="mb-2 text-3xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-xl font-semibold text-gray-700">브랜드를 찾을 수 없습니다</h2>
        <p className="mb-8 text-gray-600">
          요청하신 브랜드 페이지가 존재하지 않거나
          <br />
          잘못된 경로로 접근하셨습니다.
        </p>

        <div className="space-y-3">
          <Link href="/bicycles/brand">
            <Button className="w-full bg-red-500 hover:bg-red-600">
              <Award className="mr-2 h-4 w-4" />
              브랜드 페이지로 돌아가기
            </Button>
          </Link>

          <Link href="/bicycles">
            <Button variant="outline" className="w-full">
              자전거 메인으로 가기
            </Button>
          </Link>

          <Link href="/">
            <Button variant="ghost" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              홈으로 가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
