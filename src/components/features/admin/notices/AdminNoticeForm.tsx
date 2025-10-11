"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { RichTextEditor } from "@/components/common/RichTextEditor";
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
import type { AdminNoticeRecord } from "@/lib/admin/notices";
import { isDeltaEmpty } from "@/lib/home/quill";
import {
  cloneDelta,
  createEmptyDelta,
  QuillDeltaSchema,
  type QuillDeltaDocument,
} from "@/lib/quill/delta";

const noticeSchema = z
  .object({
    title: z.string().min(1, "제목을 입력해주세요."),
    content: QuillDeltaSchema,
    isPublished: z.boolean(),
    isPinned: z.boolean(),
  })
  .superRefine((value, ctx) => {
    if (isDeltaEmpty(value.content)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "내용을 입력해주세요.",
        path: ["content"],
      });
    }
  });

export type NoticeFormValues = z.infer<typeof noticeSchema>;

interface AdminNoticeFormProps {
  mode: "create" | "edit";
  notice?: AdminNoticeRecord | null;
}

export function AdminNoticeForm({ mode, notice }: AdminNoticeFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [htmlDelta, setHtmlDelta] = useState<QuillDeltaDocument | null>(null);
  const [isConvertingHtml, setIsConvertingHtml] = useState(false);

  const initialHtmlContent = useMemo<string | undefined>(() => {
    if (!notice?.content || typeof notice.content !== "string") {
      return undefined;
    }
    return notice.content;
  }, [notice]);

  const initialDeltaContent = useMemo<QuillDeltaDocument>(() => {
    if (notice?.content && typeof notice.content === "object" && "ops" in notice.content) {
      const { ops } = notice.content as { ops?: Array<Record<string, unknown>> };
      if (Array.isArray(ops)) {
        return cloneDelta({ ops });
      }
    }
    if (htmlDelta) {
      return cloneDelta(htmlDelta);
    }
    return createEmptyDelta();
  }, [htmlDelta, notice]);

  useEffect(() => {
    let isActive = true;

    const convertHtmlToDelta = async (html: string) => {
      setIsConvertingHtml(true);
      try {
        const QuillModule = await import("quill");
        if (!isActive) {
          return;
        }

        const QuillConstructor = QuillModule.default ?? QuillModule;
        const container = document.createElement("div");
        const quillInstance = new QuillConstructor(container);
        quillInstance.clipboard.dangerouslyPasteHTML(html);
        const contents = quillInstance.getContents();
        const ops = Array.isArray(contents.ops)
          ? contents.ops.map((op: Record<string, unknown>) => ({ ...op }))
          : [];

        if (isActive) {
          setHtmlDelta(cloneDelta({ ops }));
        }
      } catch (error) {
        console.error("[AdminNoticeForm] Failed to convert HTML to Delta", error);
        if (isActive) {
          setHtmlDelta(createEmptyDelta());
        }
      } finally {
        if (isActive) {
          setIsConvertingHtml(false);
        }
      }
    };

    if (notice?.content && typeof notice.content === "string") {
      void convertHtmlToDelta(notice.content);
      return () => {
        isActive = false;
      };
    }

    setHtmlDelta(null);
    setIsConvertingHtml(false);

    return () => {
      isActive = false;
    };
  }, [notice?.content]);

  const defaultValues = useMemo<NoticeFormValues>(
    () => ({
      title: notice?.title ?? "",
      content: cloneDelta(initialDeltaContent),
      isPublished: notice?.is_published ?? true,
      isPinned: notice?.is_pinned ?? false,
    }),
    [initialDeltaContent, notice],
  );

  const form = useForm<NoticeFormValues>({
    resolver: zodResolver(noticeSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const shouldUseHtmlFallback = useMemo(
    () => typeof notice?.content === "string" && (!htmlDelta || isConvertingHtml),
    [htmlDelta, isConvertingHtml, notice],
  );

  useEffect(() => {
    if (isConvertingHtml) {
      return;
    }
    form.reset(defaultValues);
  }, [defaultValues, form, isConvertingHtml]);

  const handleSubmit = (values: NoticeFormValues) => {
    startTransition(async () => {
      try {
        const payload = {
          ...values,
          content: cloneDelta(values.content),
        };

        const endpoint =
          mode === "edit" && notice ? `/api/admin/notices/${notice.id}` : "/api/admin/notices";
        const method = mode === "edit" ? "PUT" : "POST";

        const response = await fetch(endpoint, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to save notice");
        }

        toast.success(
          mode === "edit" ? "공지사항이 수정되었습니다." : "공지사항이 등록되었습니다.",
        );
        router.push("/admin/notices");
        router.refresh();
      } catch (error) {
        console.error("[AdminNoticeForm.submit]", error);
        toast.error(
          mode === "edit" ? "공지사항 수정에 실패했습니다." : "공지사항 등록에 실패했습니다.",
        );
      }
    });
  };

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">공지사항 {mode === "edit" ? "수정" : "등록"}</h1>
        <p className="text-muted-foreground">
          사용자 공지사항 페이지에 노출될 내용을 {mode === "edit" ? "수정" : "작성"}합니다.
        </p>
      </header>

      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={(event) => form.handleSubmit(handleSubmit)(event)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>제목</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="공지사항 제목을 입력하세요."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>내용</FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={shouldUseHtmlFallback ? initialHtmlContent : undefined}
                    deltaValue={shouldUseHtmlFallback ? undefined : field.value}
                    onDeltaChange={(delta) => {
                      const nextDelta =
                        delta && Array.isArray(delta.ops)
                          ? cloneDelta({ ops: delta.ops as Array<Record<string, unknown>> })
                          : createEmptyDelta();
                      field.onChange(nextDelta);
                    }}
                    onBlur={field.onBlur}
                    readOnly={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <FormLabel className="text-base">게시 상태</FormLabel>
                    <p className="text-muted-foreground text-sm">
                      게시 상태를 활성화하면 사용자에게 공지사항이 노출됩니다.
                    </p>
                  </div>
                  <FormControl>
                    <input
                      type="checkbox"
                      className="h-5 w-5"
                      checked={field.value}
                      onChange={(event) => field.onChange(event.target.checked)}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="isPinned"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <FormLabel className="text-base">상단 고정</FormLabel>
                    <p className="text-muted-foreground text-sm">
                      상단 고정을 활성화하면 공지사항 목록 최상단에 노출됩니다.
                    </p>
                  </div>
                  <FormControl>
                    <input
                      type="checkbox"
                      className="h-5 w-5"
                      checked={field.value}
                      onChange={(event) => field.onChange(event.target.checked)}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => {
                router.push("/admin/notices");
              }}
            >
              목록으로
            </Button>
            <Button
              type="submit"
              disabled={isPending}
            >
              {mode === "edit"
                ? isPending
                  ? "수정 중..."
                  : "수정 완료"
                : isPending
                  ? "등록 중..."
                  : "등록"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AdminNoticeForm;
