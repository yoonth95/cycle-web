"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { CustomPaginationProps } from "@/types/custom-pagination";

const CustomPagination = (props: CustomPaginationProps) => {
  const { totalPages, currentPage } = props;
  const [isMobile] = useMobile({});

  const getPageNumbers = useCallback(() => {
    const maxVisible = 10;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = currentPage;
    let end = currentPage + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxVisible + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  const pages = useMemo(() => getPageNumbers(), [getPageNumbers]);
  const renderButton = (label: string | number, page: number, disabled?: boolean) => {
    const isNumber = typeof label === "number";

    if (props.mode === "link") {
      return (
        <Button
          key={label}
          variant={isNumber && page === currentPage ? "default" : "ghost"}
          size="sm"
          className={cn("w-9", disabled && "pointer-events-none opacity-50")}
        >
          <Link href={disabled ? "#" : props.createHref(page)}>{label}</Link>
        </Button>
      );
    }

    return (
      <Button
        key={label}
        variant={isNumber && page === currentPage ? "default" : "ghost"}
        size="sm"
        className="w-9"
        onClick={() => props.onPageChange(page)}
        disabled={disabled}
      >
        {label}
      </Button>
    );
  };

  if (isMobile) {
    return (
      <div className="flex items-center justify-center gap-4 rounded border bg-gray-50 px-4 py-2">
        <div className="flex items-center gap-1">
          {renderButton("<<", 1, currentPage === 1)}
          {renderButton("<", currentPage - 1, currentPage === 1)}
        </div>
        <span className="text-base font-medium">
          {currentPage} <span className="text-gray-400">/ {totalPages}</span>
        </span>
        <div className="flex items-center gap-1">
          {renderButton(">", currentPage + 1, currentPage === totalPages)}
          {renderButton(">>", totalPages, currentPage === totalPages)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 border-t bg-gray-50 p-6">
      {renderButton("<<", 1, currentPage === 1)}
      {renderButton("<", currentPage - 1, currentPage === 1)}

      {pages.map((p) => renderButton(p, p))}

      {renderButton(">", currentPage + 1, currentPage === totalPages)}
      {renderButton(">>", totalPages, currentPage === totalPages)}
    </div>
  );
};

export default CustomPagination;
