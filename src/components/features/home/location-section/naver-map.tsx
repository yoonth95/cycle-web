"use client";

import React, { useEffect, useState } from "react";
import { NaverMapError, NaverMapLoading } from ".";

interface NaverMapProps {
  lat: number;
  lng: number;
}

const NaverMap = ({ lat, lng }: NaverMapProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAndInitMap = () => {
      // 네이버 지도 API가 로드되었는지 확인
      if (typeof window !== "undefined" && window.naver && window.naver.maps) {
        try {
          const mapElement = document.getElementById("map");
          if (mapElement) {
            const map = new window.naver.maps.Map(mapElement, {
              center: new window.naver.maps.LatLng(lat || 37.511337, lng || 127.012084),
              zoom: 17,
              zoomControl: true,
              zoomControlOptions: {
                style: window.naver.maps.ZoomControlStyle.SMALL,
                position: window.naver.maps.Position.TOP_RIGHT,
              },
              mapTypeControl: true,
              mapTypeControlOptions: {
                mapTypeIds: [
                  window.naver.maps.MapTypeId.NORMAL,
                  window.naver.maps.MapTypeId.TERRAIN,
                  window.naver.maps.MapTypeId.SATELLITE,
                  window.naver.maps.MapTypeId.HYBRID,
                ],
                style: window.naver.maps.MapTypeControlStyle.BUTTON,
                position: window.naver.maps.Position.TOP_LEFT,
              },
            });

            // 마커 추가
            new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(lat, lng),
              map: map,
              title: "삼천리 자전거 중동역점",
            });
            setIsLoading(false);
          }
        } catch (err) {
          console.error("지도 초기화 중 오류 발생:", err);
          setError("지도를 로드하는 중 오류가 발생했습니다.");
          setIsLoading(false);
        }
      } else {
        // 네이버 지도 API가 아직 로드되지 않았다면 잠시 후 다시 시도
        setTimeout(checkAndInitMap, 100);
      }
    };

    // 초기 지연 후 지도 로드 시도
    const timer = setTimeout(checkAndInitMap, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [lat, lng]);

  return (
    <div className="relative h-full w-full">
      <div id="map" className="h-full w-full" />

      {/* 로딩 상태 */}
      {isLoading && <NaverMapLoading />}

      {/* 에러 상태 */}
      {error && <NaverMapError error={error} />}
    </div>
  );
};

export default NaverMap;
