"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface InquiryReplyFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => Promise<void> | void;
  disabled: boolean;
}

const InquiryReplyForm = ({ value, onChange, onSubmit, disabled }: InquiryReplyFormProps) => (
  <div className="flex flex-col gap-2">
    <Textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      rows={4}
      placeholder="답변 내용을 입력하세요."
      disabled={disabled}
    />
    <div className="flex justify-end">
      <Button onClick={onSubmit} disabled={disabled || !value.trim().length}>
        {disabled ? "등록 중..." : "답변 등록"}
      </Button>
    </div>
  </div>
);

export default InquiryReplyForm;
