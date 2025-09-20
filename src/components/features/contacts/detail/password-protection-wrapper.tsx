"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitContactDetailPasswordForm } from "@/lib/contact/client";
import {
  ContactDetailPasswordFormDataSchema,
  type ContactDetailPasswordFormData,
  type ContactWithComments,
} from "@/types/contact";
import { Loader2 } from "lucide-react";

interface PasswordProtectionWrapperProps {
  contact: ContactWithComments;
  onPasswordVerified: () => void;
}

export function PasswordProtectionWrapper({
  contact,
  onPasswordVerified,
}: PasswordProtectionWrapperProps) {
  const form = useForm<ContactDetailPasswordFormData>({
    resolver: zodResolver(ContactDetailPasswordFormDataSchema),
    defaultValues: {
      id: contact.id,
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: submitContactDetailPasswordForm,
    onSuccess: (result) => {
      if (result.success) {
        form.reset();
        onPasswordVerified();
      } else {
        form.setError("password", { message: result.message });
      }
    },
    onError: (error) => {
      console.error("Contact form submission error:", error);
      form.setError("password", {
        message: "비밀번호 확인 중 오류가 발생했습니다. 다시 시도해 주세요.",
      });
    },
  });

  const onSubmit = (data: ContactDetailPasswordFormData) => {
    mutation.mutate({ ...data, id: contact.id });
  };

  return (
    <AlertDialog open={!contact.is_public}>
      <AlertDialogContent className="max-w-[18rem] [@media(min-width:375px)]:max-w-[20rem]">
        <AlertDialogHeader>
          <AlertDialogTitle>비공개 글입니다</AlertDialogTitle>
          <AlertDialogDescription className="break-keep">
            이 글은 비공개로 설정되어 있습니다. 내용을 보려면 비밀번호를 입력하세요.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <div>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Link href="/contacts" prefetch={true} className="flex-1">
                  <Button variant="ghost" type="button">
                    목록으로
                  </Button>
                </Link>
              </AlertDialogCancel>

              <AlertDialogAction asChild>
                <Button type="submit" disabled={mutation.isPending} className="flex-1">
                  {mutation.isPending ? <Loader2 className="animate-spin" /> : "확인"}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
