"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Search, Menu, User, ShoppingCart, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function BicycleCategoryPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = [
    { name: "스포츠", subcategories: ["산악", "로드"] },
    { name: "라이프스타일", subcategories: ["컴포트산악", "하이브리드", "픽시", "폴딩", "시티"] },
    { name: "주니어, 키즈", subcategories: ["주니어", "키즈"] },
  ];

  const bicycles = [
    {
      id: 1,
      name: "팬텀 FS",
      price: "1,999,000원",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["27.5"],
      category: "전기자전거",
      subcategory: "#MTB전기자전거",
    },
    {
      id: 2,
      name: "팬텀 HX",
      price: "1,332,000원",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["26"],
      category: "전기자전거",
      subcategory: "#MTB전기자전거",
    },
    {
      id: 3,
      name: "스마트 시티",
      price: "899,000원",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["24"],
      category: "전기자전거",
      subcategory: "#시티전기자전거",
    },
    {
      id: 4,
      name: "로드 프로",
      price: "2,499,000원",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["700C"],
      category: "스포츠",
      subcategory: "#로드바이크",
    },
    {
      id: 5,
      name: "컴포트 크루저",
      price: "649,000원",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["26"],
      category: "라이프스타일",
      subcategory: "#컴포트",
    },
    {
      id: 6,
      name: "키즈 레인보우",
      price: "299,000원",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["16"],
      category: "키즈",
      subcategory: "#어린이자전거",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/bicycle">자전거</Link>
            <span>/</span>
            <span>스타일</span>
            <span>/</span>
            <span className="text-red-600">스마트 모빌리티</span>
            <span>/</span>
            <span className="text-red-600">전기자전거</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Mobile Filter Button */}
          <div className="fixed right-6 bottom-6 z-50 lg:hidden">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="rounded-full bg-red-600 p-3 text-white shadow-lg transition-colors hover:bg-red-700"
            >
              <Filter className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Filter Overlay */}
          {isMobileFilterOpen && (
            <div className="bg-opacity-50 fixed inset-0 z-50 bg-black lg:hidden">
              <div className="absolute top-0 right-0 h-full w-80 overflow-y-auto bg-white shadow-xl">
                <div className="flex items-center justify-between border-b p-4">
                  <h2 className="text-lg font-bold">필터</h2>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="rounded p-2 hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="mb-6 flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center bg-red-600">
                      <span className="text-lg text-white">&times;</span>
                    </div>
                    <h2 className="text-lg font-bold">스마트 모빌리티</h2>
                    <Link href="#" className="ml-auto text-sm text-red-600">
                      전기자전거
                    </Link>
                  </div>

                  {categories.map((category, index) => (
                    <div key={index} className="mb-6">
                      <h3 className="mb-3 border-b pb-2 font-medium">{category.name}</h3>
                      <div className="space-y-2">
                        {category.subcategories.map((sub, subIndex) => (
                          <Link
                            key={subIndex}
                            href="#"
                            className="block py-1 text-sm text-gray-600 hover:text-red-600"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar - Sticky */}
          <div className="hidden w-80 flex-shrink-0 lg:block">
            <div className="sticky top-8">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center bg-red-600">
                      <span className="text-lg text-white">&times;</span>
                    </div>
                    <h2 className="text-lg font-bold">스마트 모빌리티</h2>
                    <Link href="#" className="ml-auto text-sm text-red-600">
                      전기자전거
                    </Link>
                  </div>

                  {categories.map((category, index) => (
                    <div key={index} className="mb-6">
                      <h3 className="mb-3 border-b pb-2 font-medium">{category.name}</h3>
                      <div className="space-y-2">
                        {category.subcategories.map((sub, subIndex) => (
                          <Link
                            key={subIndex}
                            href="#"
                            className="block py-1 text-sm text-gray-600 hover:text-red-600"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main content */}
          <div className="w-full flex-1 lg:w-auto">
            {/* Mobile Filter Info Bar */}
            <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-50 p-4 lg:hidden">
              <div>
                <span className="text-sm text-gray-600">카테고리: </span>
                <span className="font-medium">스마트 모빌리티 &gt; 전기자전거</span>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center text-sm font-medium text-red-600"
              >
                <Filter className="mr-1 h-4 w-4" />
                필터
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3">
              {bicycles.map((bike) => (
                <Card key={bike.id} className="group transition-shadow hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={bike.image || "/placeholder.svg"}
                        alt={bike.name}
                        width={400}
                        height={300}
                        className="h-64 w-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        {bike.tags.map((tag, index) => (
                          <Badge key={index} className="mr-2 bg-red-600 text-white">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="absolute top-4 right-4 text-sm text-gray-400">팬텀</div>
                    </div>

                    <div className="p-4 lg:p-6">
                      <h3 className="mb-2 text-lg font-bold lg:text-xl">{bike.name}</h3>
                      <p className="mb-4 text-xl font-bold text-gray-900 lg:text-2xl">
                        {bike.price}
                      </p>

                      <div className="mb-4 flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          {bike.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          #팬텀
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {bike.subcategory}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          #파츠/스페셜컬렉션
                        </Badge>
                        {bike.id <= 2 && (
                          <Badge variant="outline" className="text-xs">
                            #5000만가지자전거
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
