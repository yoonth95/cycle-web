"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import AutoPlay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import type { PopupItem } from "@/types/popup";
import { Pause, Play } from "lucide-react";

const PopupContent = ({ popups }: { popups: PopupItem[] }) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

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

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap());
    onSelect();

    carouselApi.on("select", onSelect);
    return () => {
      carouselApi?.off("select", onSelect);
    };
  }, [carouselApi]);

  const toggleAutoplay = () => {
    const plugin = autoplayRef.current;
    if (!plugin) return;

    if (isPlaying) {
      plugin.stop();
      setIsPlaying(false);
    } else {
      plugin.play();
      setIsPlaying(true);
    }
  };

  const total = useMemo(() => popups.length, [popups]);
  const scrollTo = (i: number) => carouselApi?.scrollTo(i);

  if (total === 0) return null;

  return (
    <div className="flex w-full flex-col items-stretch">
      <Carousel
        opts={{ loop: total > 1 }}
        plugins={[autoplayRef.current]}
        setApi={setCarouselApi}
        className="w-full p-0"
      >
        <CarouselContent className="[margin-left:0]">
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
                  className="m-auto h-auto w-full" // 비율 유지, 여백 없음
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
              <CarouselItem key={key} className="basis-full ![padding-left:0]">
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

      {total > 1 && (
        <div className="absolute bottom-7 left-4 z-20 flex items-center justify-center gap-2">
          <div className="flex justify-center">
            <Button
              type="button"
              variant="ghost"
              className="h-4 w-4 p-0 hover:bg-transparent"
              onClick={toggleAutoplay}
              aria-pressed={!isPlaying ? true : false}
              aria-label={isPlaying ? "자동 재생 정지" : "자동 재생 시작"}
            >
              {isPlaying ? (
                <Pause strokeWidth={1} className="h-4 w-4" />
              ) : (
                <Play strokeWidth={1} className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="flex justify-center gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`${i + 1}번째 배너로 이동`}
                className={`h-2 w-2 rounded-full transition ${
                  currentIndex === i ? "bg-black/90" : "bg-black/20"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupContent;
