"use client";

import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui/button";
import usePopupCarouselStore from "@/stores/popup-carousel-store";
import { cn } from "@/lib/utils";
import { CircleCheck, Pause, Play } from "lucide-react";

interface PopupButtonsProps {
  onDismissForToday: () => void;
  disabled?: boolean;
}

const PopupButtons = ({ onDismissForToday, disabled }: PopupButtonsProps) => {
  const { total, currentIndex, autoplayPlaying, autoplayReady, toggleAutoplay, scrollTo } =
    usePopupCarouselStore(
      useShallow((state) => ({
        total: state.total,
        currentIndex: state.currentIndex,
        autoplayPlaying: state.autoplayPlaying,
        autoplayReady: state.autoplayReady,
        toggleAutoplay: state.toggleAutoplay,
        scrollTo: state.scrollTo,
      })),
    );

  const hasMultiple = total > 1;
  const canToggle = hasMultiple && autoplayReady;
  const handleDotClick = (index: number) => {
    if (!scrollTo) return;
    scrollTo(index);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 pb-4",
        hasMultiple ? "justify-between" : "justify-end",
      )}
    >
      {hasMultiple && (
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            className="h-6 w-6 p-0 hover:bg-transparent"
            onClick={toggleAutoplay}
            aria-pressed={!autoplayPlaying ? true : false}
            aria-label={autoplayPlaying ? "자동 재생 정지" : "자동 재생 시작"}
            disabled={!canToggle}
          >
            {autoplayPlaying ? (
              <Pause strokeWidth={1} className="h-4 w-4" />
            ) : (
              <Play strokeWidth={1} className="h-4 w-4" />
            )}
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleDotClick(i)}
                aria-label={`${i + 1}번째 배너로 이동`}
                disabled={!scrollTo}
                aria-current={currentIndex === i ? "true" : undefined}
                className={cn(
                  "h-2 w-2 rounded-full transition",
                  currentIndex === i ? "bg-black/90" : "bg-black/20",
                  !scrollTo && "opacity-50",
                )}
              />
            ))}
          </div>
        </div>
      )}
      <Button
        type="button"
        variant="ghost"
        onClick={onDismissForToday}
        disabled={disabled}
        className="gap-2 outline-none hover:bg-transparent"
      >
        <CircleCheck className="h-4 w-4" />
        하루동안 보지 않기
      </Button>
    </div>
  );
};

export default PopupButtons;
