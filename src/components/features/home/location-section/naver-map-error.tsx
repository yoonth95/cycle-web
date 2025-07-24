import React from "react";
import { MapPin } from "lucide-react";

interface NaverMapErrorProps {
  error: string;
}

const NaverMapError = ({ error }: NaverMapErrorProps) => {
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <MapPin className="text-muted-foreground mx-auto mb-2 h-12 w-12" />
        <p className="text-muted-foreground font-medium">지도 로드 실패</p>
        <p className="text-muted-foreground text-sm">{error}</p>
      </div>
    </div>
  );
};

export default NaverMapError;
