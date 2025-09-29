"use client";

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

const PopupDialog = () => {
  const popupsQuery = useQuery({
    queryKey: ["popups"],
    queryFn: getPopups,
  });

  const { open, ready, suppressForToday, closeNow, allowNow, isLoading, isError, data } =
    usePopupOpen(popupsQuery, "popup-opened");

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
          className="w-auto max-w-[300px] min-w-[230px] overflow-hidden rounded-lg border-none p-0 sm:max-w-[300px]"
        >
          <DialogHeader className="hidden">
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
          <PopupContent popups={data ?? []} />
          <PopupButtons onDismissForToday={suppressForToday} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PopupDialog;
