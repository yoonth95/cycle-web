"use client";

import { Button } from "@/components/ui/button";

const CallButton = ({ officeNumber }: { officeNumber: string }) => {
  return (
    <Button variant="default" onClick={() => window.open(`tel:${officeNumber}`)}>
      전화하기
    </Button>
  );
};

export default CallButton;
