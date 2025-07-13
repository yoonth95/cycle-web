"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/common/logo";
import { Menu, X } from "lucide-react";

const menuData = {
  자전거: {
    categories: [
      {
        title: "스타일",
        items: ["스마트 모빌리티", "전기자전거", "스포츠", "라이프스타일", "주니어, 키즈"],
      },
      {
        title: "브랜드",
        items: ["팬텀", "아팔란치아", "레스포"],
      },
      {
        title: "키워드",
        items: [
          "#전기자전거",
          "#세발자전거",
          "#어린이자전거",
          "#접이식",
          "#출퇴근용",
          "#통학용",
          "#여성용",
          "#캐쥬얼라이딩",
          "#OOTD",
        ],
      },
    ],
  },
  용품: {
    categories: [
      {
        title: "라이더 착용",
        items: ["헬멧", "보호대", "장갑"],
      },
      {
        title: "자전거 장착",
        items: ["가방", "자물쇠", "라이트", "거치대", "물통걸이", "벨", "속도계", "거울", "기타"],
      },
      {
        title: "유지 · 관리",
        items: ["펌프", "자전거 커버", "오일 · 방청제", "공구"],
      },
      {
        title: "부품",
        items: ["안장", "바구니", "페달", "핸들그립"],
      },
    ],
  },
  대리점: {
    categories: [
      {
        title: "대리점 찾기",
        items: ["온라인 구매", "대량 구매"],
      },
    ],
  },
  고객지원: {
    categories: [
      {
        title: "자주 묻는 질문",
        items: ["온라인 A/S", "A/S 접수", "A/S 조회"],
      },
      {
        title: "정품 등록",
        items: ["정품등록", "정품등록 조회"],
      },
      {
        title: "제품 설명서",
        items: ["지난 제품보기"],
      },
    ],
  },
  뉴스: {
    categories: [
      {
        title: "뉴스",
        items: [],
      },
    ],
  },
  회사소개: {
    categories: [
      {
        title: "회사정보",
        items: [
          "전기자전거, 팬텀",
          "ALL.WAYS",
          "선수후원",
          "윤리경영",
          "투자정보",
          "재무정보",
          "주가정보",
          "IR정보",
          "대량구매",
          "채용정보",
          "오시는길",
        ],
      },
    ],
  },
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveCategory(null);
  };

  const handleCategoryHover = (category: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveCategory(category);
  };

  // nav 영역 전체를 벗어날 때 드롭다운 닫기
  const handleNavMouseLeave = () => {
    const timeout = setTimeout(() => setActiveCategory(null), 50);
    setHoverTimeout(timeout);
  };

  // nav 영역에 들어올 때 타임아웃 취소
  const handleNavMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  return (
    <>
      <motion.header
        className="bg-figma-alizarin-crimson text-white sticky top-0 z-50 shadow-lg"
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-12">
              <Logo />
              <div onMouseEnter={handleNavMouseEnter} onMouseLeave={handleNavMouseLeave}>
                <nav className="hidden lg:flex items-center">
                  {Object.keys(menuData).map((item) => (
                    <motion.a
                      key={item}
                      href="#"
                      className={`duration-200 font-medium px-4 py-5 relative after:absolute after:left-2 after:bottom-3 after:h-[2px] after:w-0 hover:after:w-[calc(100%-1rem)] after:bg-white after:transition-all after:duration-300 ${activeCategory === item ? "after:w-[calc(100%-1rem)]" : ""}`}
                      onMouseEnter={() => handleCategoryHover(item)}
                    >
                      {item}
                    </motion.a>
                  ))}
                </nav>

                {/* Desktop Dropdown Menu */}
                <AnimatePresence>
                  {activeCategory && !isMenuOpen && (
                    <motion.div
                      className="absolute top-full left-0 w-full bg-white text-gray-800 shadow-lg lg:block z-40"
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-4 gap-8">
                          {menuData[activeCategory as keyof typeof menuData].categories.map(
                            (category, idx) => (
                              <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                              >
                                <h3 className="font-bold text-figma-alizarin-crimson mb-4 text-lg">
                                  {category.title}
                                </h3>
                                <ul className="space-y-2">
                                  {category.items.map((item) => (
                                    <li key={item}>
                                      <a
                                        href="#"
                                        className="text-gray-600 hover:text-figma-alizarin-crimson transition-colors duration-200 block py-1"
                                      >
                                        {item}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            ),
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                onClick={toggleMenu}
                className="p-2 hover:bg-red-700 rounded-md transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-16 left-0 w-full bg-figma-alizarin-crimson text-white z-40 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
                {Object.entries(menuData).map(([mainCategory, data], mainIdx) => (
                  <motion.div
                    key={mainCategory}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: mainIdx * 0.1 }}
                    className="space-y-6"
                  >
                    <motion.h2
                      className="text-xl font-bold border-b border-white pb-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      {mainCategory}
                    </motion.h2>
                    {data.categories.map((category, catIdx) => (
                      <motion.div
                        key={category.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: mainIdx * 0.1 + catIdx * 0.05 }}
                      >
                        <h3 className="font-semibold text-red-200 mb-3">{category.title}</h3>
                        <ul className="space-y-2">
                          {category.items.map((item, itemIdx) => (
                            <motion.li
                              key={item}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.2,
                                delay: mainIdx * 0.1 + catIdx * 0.05 + itemIdx * 0.02,
                              }}
                            >
                              <motion.a
                                href="#"
                                className="text-white/80 hover:text-white transition-colors duration-200 block py-1 text-sm"
                                whileHover={{ x: 5 }}
                              >
                                {item}
                              </motion.a>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
