"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const AdminLogoutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/logout", { method: "POST" });
        if (!response.ok) {
          throw new Error("Failed to logout");
        }
        toast.success("로그아웃되었습니다.");
        router.replace("/admin");
        router.refresh();
      } catch (error) {
        console.error("[AdminLogoutButton]", error);
        toast.error("로그아웃에 실패했습니다.");
      }
    });
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      disabled={isPending}
      size="sm"
      className="min-w-24"
    >
      {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "로그아웃"}
    </Button>
  );
};

export default AdminLogoutButton;
