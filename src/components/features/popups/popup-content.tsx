"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import AutoPlay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import usePopupCarouselStore from "@/stores/popup-carousel-store";
import type { PopupItem } from "@/types/popup";
import { X } from "lucide-react";

interface PopupContentProps {
  popups: PopupItem[];
  onActiveSizeChange?: (size: { width: number; height: number }) => void;
  onClose?: () => void;
  displaySize?: { width: number; height: number };
}

const PopupContent = ({ popups, onActiveSizeChange, onClose, displaySize }: PopupContentProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const { currentIndex, setCurrentIndex, setScrollTo, setTotal, setAutoplayControllers } =
    usePopupCarouselStore(
      useShallow((state) => ({
        currentIndex: state.currentIndex,
        setCurrentIndex: state.setCurrentIndex,
        setScrollTo: state.setScrollTo,
        setTotal: state.setTotal,
        setAutoplayControllers: state.setAutoplayControllers,
      })),
    );

  const autoplayRef = useRef(
    AutoPlay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  // 각 슬라이드 이미지의 원본 크기 저장
  const [naturalMap, setNaturalMap] = useState<Record<string, { w: number; h: number }>>({});
  const setNatural = (key: string, w: number, h: number) =>
    setNaturalMap((m) => (m[key] ? m : { ...m, [key]: { w, h } }));
  const lastReportedSize = useRef<{ width: number; height: number } | null>(null);

  const activeSize = useMemo(() => {
    const currentPopup = popups[currentIndex];
    if (!currentPopup) return null;

    const key = `${currentPopup.id}-${currentIndex}`;
    const metaW = (currentPopup as { width?: number }).width as number | undefined;
    const metaH = (currentPopup as { height?: number }).height as number | undefined;
    const width = metaW ?? naturalMap[key]?.w;
    const height = metaH ?? naturalMap[key]?.h;

    if (!width || !height) return null;
    return { width, height };
  }, [currentIndex, naturalMap, popups]);

  useEffect(() => {
    if (!onActiveSizeChange || !activeSize) return;

    const { width, height } = activeSize;
    const prev = lastReportedSize.current;
    if (!prev || prev.width !== width || prev.height !== height) {
      lastReportedSize.current = { width, height };
      onActiveSizeChange({ width, height });
    }
  }, [activeSize, onActiveSizeChange]);

  useEffect(() => {
    if (!carouselApi) {
      setScrollTo(null);
      return;
    }

    const onSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap());
    onSelect();

    carouselApi.on("select", onSelect);
    setScrollTo((index) => carouselApi.scrollTo(index));

    return () => {
      carouselApi.off("select", onSelect);
      setScrollTo(null);
    };
  }, [carouselApi, setCurrentIndex, setScrollTo]);

  useEffect(() => {
    const plugin = autoplayRef.current;
    if (!plugin) {
      setAutoplayControllers(null, null);
      return;
    }

    const play = () => plugin.play();
    const stop = () => plugin.stop();
    setAutoplayControllers(play, stop);

    return () => {
      setAutoplayControllers(null, null);
    };
  }, [setAutoplayControllers]);

  const total = popups.length;

  useEffect(() => {
    setTotal(total);
  }, [setTotal, total]);

  if (total === 0) return null;

  return (
    <div
      className="flex w-full flex-col items-stretch"
      style={displaySize ? { height: `${displaySize.height}px` } : undefined}
    >
      <div className="absolute top-1 right-1 z-[105] flex items-center justify-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-black bg-black text-white">
          <Button
            type="button"
            variant="ghost"
            className="h-4 w-4 p-0 hover:bg-transparent hover:text-white"
            onClick={onClose}
            aria-label="닫기"
          >
            <X strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Carousel
        opts={{ loop: total > 1 }}
        plugins={[autoplayRef.current]}
        setApi={setCarouselApi}
        className="h-full w-full p-0"
      >
        <CarouselContent className="[margin-left:0] h-full">
          {popups.map((popup, index) => {
            const key = `${popup.id}-${index}`;
            const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_IMAGE_URL}${popup.image}`;

            const metaW = (popup as { width?: number }).width as number | undefined;
            const metaH = (popup as { height?: number }).height as number | undefined;
            const w = metaW ?? naturalMap[key]?.w ?? 1;
            const h = metaH ?? naturalMap[key]?.h ?? 1;

            const Img = (
              <div className="relative flex h-full w-full">
                <Image
                  src={imageUrl}
                  alt={`프로모션 팝업 이미지 ${index + 1}`}
                  width={w}
                  height={h}
                  className="m-auto h-full w-full object-contain" // 컨테이너 내 비율 유지
                  sizes="100vw"
                  priority={index === 0}
                  onLoad={(event) => {
                    const { naturalWidth, naturalHeight } = event.currentTarget;
                    setNatural(key, naturalWidth, naturalHeight);
                  }}
                />
              </div>
            );

            return (
              <CarouselItem key={key} className="h-full basis-full ![padding-left:0]">
                {popup.link ? (
                  <Link
                    href={popup.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${index + 1}번째 팝업 자세히 보기`}
                    className="block"
                  >
                    {Img}
                  </Link>
                ) : (
                  Img
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PopupContent;
