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

    const maxDialogHeight = viewport.height
      ? Math.max(viewport.height - VERTICAL_MARGIN, effectiveButtonHeight + MIN_IMAGE_DIMENSION)
      : FALLBACK_IMAGE.height + effectiveButtonHeight;

    const maxImageHeight = Math.max(maxDialogHeight - effectiveButtonHeight, MIN_IMAGE_DIMENSION);

    let width = naturalWidth;
    let height = naturalHeight;

    if (width > maxWidth) {
      const scale = maxWidth / width;
      width = maxWidth;
      height *= scale;
    }

    if (height > maxImageHeight) {
      const scale = maxImageHeight / height;
      height = maxImageHeight;
      width *= scale;
    }

    if (!Number.isFinite(width) || width <= 0) width = FALLBACK_IMAGE.width;
    if (!Number.isFinite(height) || height <= 0) height = FALLBACK_IMAGE.height;

    if (width > maxWidth) {
      const scale = maxWidth / width;
      width = maxWidth;
      height *= scale;
    }

    if (height > maxImageHeight) {
      const scale = maxImageHeight / height;
      height = maxImageHeight;
      width *= scale;
    }

    return {
      dialogWidth: width,
      imageHeight: height,
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
            maxWidth: `calc(100vw - ${HORIZONTAL_MARGIN}px)`,
            maxHeight: `calc(100vh - ${VERTICAL_MARGIN}px)`,
          }}
        >
          <DialogHeader className="hidden">
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
          <PopupContent
            popups={data ?? []}
            onActiveSizeChange={(size) => setImageSize(size)}
            onClose={() => handleOpenChange(false)}
            displaySize={{ width: contentMetrics.dialogWidth, height: contentMetrics.imageHeight }}
          />
          <div ref={buttonContainerRef}>
            <PopupButtons onDismissForToday={suppressForToday} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PopupDialog;
