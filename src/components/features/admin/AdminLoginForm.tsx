"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  identifier: z.string().min(1, "아이디를 입력해주세요."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

export type AdminLoginFormValues = z.infer<typeof loginSchema>;

const AdminLoginForm = () => {
  const router = useRouter();
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const handleSubmit = (values: AdminLoginFormValues) => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const payload = await response.json();

        if (!response.ok) {
          const attempts =
            typeof payload.remainingAttempts === "number" ? payload.remainingAttempts : null;
          setRemainingAttempts(attempts);

          toast.error(payload.message ?? "로그인에 실패했습니다.");
          return;
        }

        toast.success("관리자 로그인에 성공했습니다.");
        setRemainingAttempts(null);
        router.replace("/admin/dashboard");
        router.refresh();
      } catch (error) {
        console.error("[AdminLoginForm]", error);
        toast.error("로그인 처리 중 오류가 발생했습니다.");
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">관리자 로그인</h1>
          <p className="text-muted-foreground text-sm">
            인증된 관리자만 접근할 수 있습니다. 공동 계정을 사용하는 경우 로그인 기록을
            확인해주세요.
          </p>
        </div>

        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>아이디</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="username"
                  inputMode="text"
                  placeholder="admin"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  autoComplete="current-password"
                  placeholder="********"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {typeof remainingAttempts === "number" && (
          <p className="text-destructive text-sm">남은 시도 횟수: {remainingAttempts}회</p>
        )}

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : "로그인"}
        </Button>
      </form>
    </Form>
  );
};

export default AdminLoginForm;
