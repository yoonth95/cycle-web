import React from "react";
import Link from "next/link";
import { Navigation } from "lucide-react";

const DirectionLink = () => {
  return (
    <Link
      href="https://map.naver.com/p/directions/-/14111293.589337807,4507429.930311242,%EC%82%BC%EC%B2%9C%EB%A6%AC%EC%9E%90%EC%A0%84%EA%B1%B0%20%EC%A4%91%EB%8F%99%EC%97%AD%EC%A0%90,35560212,PLACE_POI/-/car?c=15.00,0,0,0,dh"
      className="bg-foreground hover:bg-foreground/90 text-background flex items-center justify-center rounded-md px-4 py-2"
      target="_blank"
    >
      <Navigation className="mr-2 h-4 w-4" />
      길찾기
    </Link>
  );
};

export default DirectionLink;
