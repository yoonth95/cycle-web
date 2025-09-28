"use client";

import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";

interface PopupButtonsProps {
  onDismissForToday: () => void;
  disabled?: boolean;
}

const PopupButtons = ({ onDismissForToday, disabled }: PopupButtonsProps) => {
  return (
    <div className="flex justify-end gap-2 pb-4">
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
