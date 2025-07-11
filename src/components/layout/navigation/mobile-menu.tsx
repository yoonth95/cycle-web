"use client";

// import { NavigationBar } from "@/components/layout/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onItemClick: () => void;
}

export function MobileMenu({ isOpen, onItemClick }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="border-t border-white/20 py-4">
      {/* <NavigationBar variant="mobile" onItemClick={onItemClick} /> */}
    </div>
  );
}
