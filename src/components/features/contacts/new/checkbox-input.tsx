"use client";

import { UseFormReturn, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ContactsFormInputData } from "@/types/contact";

interface CheckboxInputProps {
  form: UseFormReturn<ContactsFormInputData>;
}

export function CheckboxInput({ form }: CheckboxInputProps) {
  const isPublic = useWatch({
    control: form.control,
    name: "isPrivate",
  });

  return (
    <>
      <FormField
        control={form.control}
        name="isPrivate"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start gap-3">
            <FormControl>
              <Input
                type="checkbox"
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  if (e.target.checked) form.setValue("password", ""); // 공개로 변경 시 비밀번호 초기화
                }}
                className="h-4 w-4"
              />
            </FormControl>
            <div className="flex flex-col gap-1 leading-none">
              <FormLabel>공개 문의</FormLabel>
              <p className="text-sm text-gray-500">
                체크하면 공개 문의로 등록되며 체크하지 않으면 비밀번호가 필요한 비공개 문의가
                됩니다.
              </p>
            </div>
          </FormItem>
        )}
      />

      {/* 비밀번호 입력 필드 - 비공개일 때만 표시 */}
      {!isPublic && (
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                비밀번호 <span className="text-figma-alizarin-crimson">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="4-6자 비밀번호를 입력하세요"
                  maxLength={6}
                  {...field}
                />
              </FormControl>
              <p className="text-sm text-gray-500">
                비공개 문의 조회 시 필요한 비밀번호입니다. (4-6자)
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
}
