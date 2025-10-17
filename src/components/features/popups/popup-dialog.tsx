"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PopupContent, PopupButtons } from "@/components/features/popups";
import { usePopupOpen } from "@/hooks/use-popup-open";
import { getPopups } from "@/lib/popup/client";
import usePopupCarouselStore from "@/stores/popup-carousel-store";

const clamp = (value: number, min: number, max: number) => {
  if (!Number.isFinite(value)) return min;
  if (min > max) return min;
  return Math.min(Math.max(value, min), max);
};

const PopupDialog = () => {
  const popupsQuery = useQuery({
    queryKey: ["popups"],
    queryFn: getPopups,
  });

  const { open, ready, suppressForToday, closeNow, allowNow, isLoading, isError, data } =
    usePopupOpen(popupsQuery, "popup-opened");

  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const [viewport, setViewport] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);
  const [buttonHeight, setButtonHeight] = useState(0);
  const resetCarouselControls = usePopupCarouselStore((state) => state.reset);

  const HORIZONTAL_MARGIN = 32;
  const VERTICAL_MARGIN = 80;
  const MIN_IMAGE_DIMENSION = 160;
  const FALLBACK_BUTTON_HEIGHT = 64;
  const EXTRA_BUTTON_SPACE = 32;
  const DIALOG_MAX_RATIO = 0.9;
  const DIALOG_MIN_RATIO = 0.8;
  const FALLBACK_IMAGE = { width: 300, height: 400 } as const;

  useEffect(() => {
    const update = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
      if (buttonContainerRef.current) {
        setButtonHeight(buttonContainerRef.current.getBoundingClientRect().height || 0);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!buttonContainerRef.current) return;
      setButtonHeight(buttonContainerRef.current.getBoundingClientRect().height || 0);
    };

    measure();

    if (!buttonContainerRef.current || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => measure());
    observer.observe(buttonContainerRef.current);

    return () => observer.disconnect();
  }, [data, open]);

  const contentMetrics = useMemo(() => {
    const naturalWidth = imageSize?.width ?? FALLBACK_IMAGE.width;
    const naturalHeight = imageSize?.height ?? FALLBACK_IMAGE.height;
    const effectiveButtonHeight = (buttonHeight || FALLBACK_BUTTON_HEIGHT) + EXTRA_BUTTON_SPACE;

    const maxWidth = viewport.width
      ? Math.max(viewport.width - HORIZONTAL_MARGIN, MIN_IMAGE_DIMENSION)
      : Math.max(FALLBACK_IMAGE.width, MIN_IMAGE_DIMENSION);

    const fallbackDialogHeight = FALLBACK_IMAGE.height + effectiveButtonHeight;

    if (!viewport.height) {
      let width = naturalWidth;
      let height = naturalHeight;

      if (width > maxWidth) {
        const scale = maxWidth / width;
        width = maxWidth;
        height *= scale;
      }

      const maxImageHeight = Math.max(
        fallbackDialogHeight - effectiveButtonHeight,
        MIN_IMAGE_DIMENSION,
      );
      if (height > maxImageHeight) {
        const scale = maxImageHeight / height;
        height = maxImageHeight;
        width *= scale;
      }

      if (!Number.isFinite(width) || width <= 0) width = FALLBACK_IMAGE.width;
      if (!Number.isFinite(height) || height <= 0) height = FALLBACK_IMAGE.height;

      return {
        dialogWidth: width,
        imageHeight: height,
        dialogHeight: height + effectiveButtonHeight,
        dialogMaxHeight: fallbackDialogHeight,
        dialogMinHeight: fallbackDialogHeight,
      };
    }

    const viewportHeight = viewport.height;
    const ratioMax = viewportHeight * DIALOG_MAX_RATIO;
    const ratioMin = viewportHeight * DIALOG_MIN_RATIO;
    const marginLimit = Math.max(
      viewportHeight - VERTICAL_MARGIN,
      effectiveButtonHeight + MIN_IMAGE_DIMENSION,
    );
    const upperBound = Math.max(
      effectiveButtonHeight + MIN_IMAGE_DIMENSION,
      Math.min(ratioMax, marginLimit),
    );
    const lowerBound = Math.min(
      Math.max(effectiveButtonHeight + MIN_IMAGE_DIMENSION, ratioMin),
      upperBound,
    );

    const maxDialogHeight = clamp(ratioMax, lowerBound, upperBound);
    const maxImageHeight = Math.max(maxDialogHeight - effectiveButtonHeight, MIN_IMAGE_DIMENSION);

    let width = naturalWidth;
    let height = naturalHeight;

    // 가로 제한 먼저 적용
    if (width > maxWidth) {
      const scale = maxWidth / width;
      width = maxWidth;
      height *= scale;
    }

    // 세로 제한 적용 (버튼 공간 확보)
    if (height > maxImageHeight) {
      const scale = maxImageHeight / height;
      height = maxImageHeight;
      width *= scale;
    }

    if (!Number.isFinite(width) || width <= 0) width = FALLBACK_IMAGE.width;
    if (!Number.isFinite(height) || height <= 0) height = FALLBACK_IMAGE.height;

    // 최종 검증: 가로 제한 재확인
    if (width > maxWidth) {
      const scale = maxWidth / width;
      width = maxWidth;
      height *= scale;
    }

    // 최종 검증: 세로 제한 재확인 (버튼이 잘리지 않도록)
    if (height > maxImageHeight) {
      const scale = maxImageHeight / height;
      height = maxImageHeight;
      width *= scale;
    }

    // CRITICAL FIX: dialogHeight가 maxDialogHeight를 초과하지 않도록 보장
    let finalImageHeight = height;
    let dialogHeight = finalImageHeight + effectiveButtonHeight;

    if (dialogHeight > maxDialogHeight) {
      // 버튼이 잘리지 않도록 이미지 높이를 재조정
      finalImageHeight = Math.max(maxDialogHeight - effectiveButtonHeight, MIN_IMAGE_DIMENSION);

      // 이미지 비율 유지하면서 너비도 재조정
      if (height > 0) {
        const imageScale = finalImageHeight / height;
        width *= imageScale;
      }

      dialogHeight = finalImageHeight + effectiveButtonHeight;
    }

    // 다이얼로그 높이를 maxDialogHeight로 clamp
    dialogHeight = Math.min(dialogHeight, maxDialogHeight);

    // 최종 이미지 높이 재계산 (버튼 공간 보장)
    finalImageHeight = Math.max(dialogHeight - effectiveButtonHeight, MIN_IMAGE_DIMENSION);

    const dialogMinHeight = Math.min(Math.max(lowerBound, dialogHeight), maxDialogHeight);

    return {
      dialogWidth: width,
      imageHeight: finalImageHeight,
      dialogHeight,
      dialogMaxHeight: maxDialogHeight,
      dialogMinHeight,
    };
  }, [buttonHeight, imageSize, viewport.height, viewport.width]);

  useEffect(() => {
    if (!open) resetCarouselControls();
  }, [open, resetCarouselControls]);

  if (isLoading || !ready) return null;
  if (isError) return null;

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      allowNow();
      return;
    }
    closeNow();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="flex w-auto min-w-[280px] flex-col items-stretch overflow-hidden rounded-lg border-none p-0"
          style={{
            width: `${contentMetrics.dialogWidth}px`,
            height: `${contentMetrics.dialogHeight}px`,
            minHeight: `${contentMetrics.dialogMinHeight}px`,
            maxHeight: `${contentMetrics.dialogMaxHeight}px`,
            maxWidth: `calc(100vw - ${HORIZONTAL_MARGIN}px)`,
          }}
        >
          <DialogHeader className="hidden">
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
          <div className="relative flex flex-1 flex-col" style={{ minHeight: 0 }}>
            <PopupContent
              popups={data ?? []}
              onActiveSizeChange={(size) => setImageSize(size)}
              onClose={() => handleOpenChange(false)}
              displaySize={{
                width: contentMetrics.dialogWidth,
                height: contentMetrics.imageHeight,
              }}
            />
          </div>
          <div ref={buttonContainerRef} className="flex-shrink-0">
            <PopupButtons onDismissForToday={suppressForToday} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PopupDialog;
