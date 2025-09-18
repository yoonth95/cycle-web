"use client";

import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EMAIL_DOMAINS } from "@/constants";
import { ContactsFormInputData } from "@/types/contact";

interface EmailInputProps {
  form: UseFormReturn<ContactsFormInputData>;
}

export function EmailInput({ form }: EmailInputProps) {
  return (
    <FormField
      control={form.control}
      name="emailLocal"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            이메일 <span className="text-figma-alizarin-crimson">*</span>
          </FormLabel>
          <div className="flex flex-col gap-3">
            {/* 데스크톱 레이아웃 */}
            <div className="hidden items-start gap-2 sm:flex">
              <FormControl>
                <FormItem className="min-w-0 flex-1">
                  <Input placeholder="이메일 아이디" {...field} className="text-sm" />
                  <FormMessage />
                </FormItem>
              </FormControl>
              <div className="flex min-w-fit items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600">
                @
              </div>
              <FormField
                control={form.control}
                name="emailDomain"
                render={({ field: domainField }) => (
                  <FormControl>
                    <FormItem className="min-w-0 flex-1">
                      <Select
                        value={domainField.value}
                        onValueChange={(value) => {
                          domainField.onChange(value);
                        }}
                      >
                        <SelectTrigger className="h-9 w-full text-sm">
                          <SelectValue placeholder="도메인 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {EMAIL_DOMAINS.map((domain) => (
                            <SelectItem key={domain.value} value={domain.value}>
                              {domain.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  </FormControl>
                )}
              />
            </div>

            {/* 모바일 레이아웃 */}
            <div className="flex flex-col gap-2 sm:hidden">
              <FormControl>
                <Input placeholder="이메일 아이디" {...field} className="text-sm" />
              </FormControl>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600">
                  @
                </div>
                <FormField
                  control={form.control}
                  name="emailDomain"
                  render={({ field: domainField }) => (
                    <FormControl className="flex-1">
                      <Select
                        value={domainField.value}
                        onValueChange={(value) => {
                          domainField.onChange(value);
                        }}
                      >
                        <SelectTrigger className="h-9 w-full text-sm">
                          <SelectValue placeholder="도메인 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {EMAIL_DOMAINS.map((domain) => (
                            <SelectItem key={domain.value} value={domain.value}>
                              {domain.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  )}
                />
              </div>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
}
