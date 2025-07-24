import React from "react";

const NaverMapLoading = () => {
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-red-500"></div>
        <p className="text-muted-foreground font-medium">지도 로딩 중...</p>
      </div>
    </div>
  );
};

export default NaverMapLoading;
