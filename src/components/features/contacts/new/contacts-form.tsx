"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { EmailInput, CheckboxInput } from "@/components/features/contacts/new";

import { submitContactsForm } from "@/lib/contact/client";
import {
  ContactsFormDataSchema,
  ContactsFormProps,
  ContactsFormData,
  ContactsFormInputData,
} from "@/types/contact";

export function ContactsForm({ formConfig }: ContactsFormProps) {
  const router = useRouter();

  const form = useForm<ContactsFormInputData>({
    resolver: zodResolver(ContactsFormDataSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      emailLocal: "",
      emailDomain: "",
      isPublic: true,
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: submitContactsForm,
    onMutate: () => {
      toast.loading("문의사항을 접수하고 있습니다...", {
        id: "contact-form",
      });
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.success("문의사항이 성공적으로 접수되었습니다!", {
          id: "contact-form",
          duration: 2000,
        });
        form.reset();
        router.push("/contacts");
      } else {
        toast.error(result.message || "문의사항 접수에 실패했습니다.", {
          id: "contact-form",
          duration: 2000,
        });
      }
    },
    onError: (error) => {
      console.error("Contact form submission error:", error);
      toast.error("문의사항 접수 중 오류가 발생했습니다. 다시 시도해 주세요.", {
        id: "contact-form",
        duration: 2000,
      });
    },
  });

  const onSubmit = (data: ContactsFormInputData) => {
    const formData: ContactsFormData = {
      ...data,
      email: `${data.emailLocal}@${data.emailDomain}`,
    };
    mutation.mutate(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* 제목 입력 */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                제목 <span className="text-figma-alizarin-crimson">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={formConfig.titlePlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                문의 내용 <span className="text-figma-alizarin-crimson">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={formConfig.descriptionPlaceholder}
                  {...field}
                  className="h-40"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                이름 <span className="text-figma-alizarin-crimson">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={formConfig.authorPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 이메일 입력 필드 */}
        <EmailInput form={form} />

        {/* 공개여부 체크박스 */}
        <CheckboxInput form={form} />

        {/* 제출 버튼 */}
        <div className="flex justify-end">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "제출 중..." : formConfig.submitButtonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
