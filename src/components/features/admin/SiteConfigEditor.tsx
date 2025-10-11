"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface SiteConfigEditorProps {
  initialPageId: string;
  configs: Record<string, Record<string, unknown>>;
}

const pageOptions: { value: string; label: string }[] = [
  { value: "home", label: "홈" },
  { value: "bicycles", label: "자전거" },
  { value: "products", label: "제품" },
  { value: "notices", label: "공지사항" },
  { value: "blog", label: "블로그" },
  { value: "contacts", label: "문의" },
];

const SiteConfigEditor = ({ initialPageId, configs }: SiteConfigEditorProps) => {
  const [pageId, setPageId] = useState(initialPageId);
  const [editorValue, setEditorValue] = useState(() =>
    JSON.stringify(configs[initialPageId] ?? {}, null, 2),
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const loadConfig = async () => {
      if (configs[pageId]) {
        setEditorValue(JSON.stringify(configs[pageId], null, 2));
        return;
      }

      startTransition(async () => {
        try {
          const response = await fetch(`/api/admin/site-config?pageId=${pageId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch config");
          }
          const json = await response.json();
          setEditorValue(JSON.stringify(json.payload ?? {}, null, 2));
        } catch (error) {
          console.error("[SiteConfigEditor.fetch]", error);
          toast.error("구성 데이터를 불러오지 못했습니다.");
        }
      });
    };

    void loadConfig();
  }, [pageId, configs]);

  const handleSave = () => {
    startTransition(async () => {
      try {
        let parsed: Record<string, unknown>;
        try {
          parsed = JSON.parse(editorValue);
        } catch (parseError) {
          toast.error("JSON 형식이 올바르지 않습니다.");
          return;
        }

        const response = await fetch("/api/admin/site-config", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pageId, payload: parsed }),
        });

        if (!response.ok) {
          throw new Error("Failed to update config");
        }

        toast.success("페이지 구성이 업데이트되었습니다.");
      } catch (error) {
        console.error("[SiteConfigEditor.save]", error);
        toast.error("구성을 저장하지 못했습니다.");
      }
    });
  };

  const selectedPageLabel = useMemo(
    () => pageOptions.find((option) => option.value === pageId)?.label ?? pageId,
    [pageId],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">페이지 선택</h2>
          <p className="text-muted-foreground text-sm">
            JSON 구성을 통해 사용자 화면의 문구, 이미지, 순서 등을 조정할 수 있습니다.
          </p>
        </div>
        <Select value={pageId} onValueChange={(value) => setPageId(value)} disabled={isPending}>
          <SelectTrigger className="w-full sm:w-60">
            <SelectValue placeholder="페이지를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {pageOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{selectedPageLabel} 페이지 구성 (JSON)</label>
        <Textarea
          className="min-h-[320px] font-mono"
          value={editorValue}
          onChange={(event) => setEditorValue(event.target.value)}
          spellCheck={false}
          disabled={isPending}
        />
        <p className="text-muted-foreground text-xs">
          이미지 경로나 텍스트를 수정한 뒤 저장하면 즉시 서비스에 반영됩니다. 잘못된 형식은 저장되지
          않으니 주의하세요.
        </p>
      </div>

      <Button onClick={handleSave} disabled={isPending}>
        {isPending ? "저장 중..." : "구성 저장"}
      </Button>
    </div>
  );
};

export default SiteConfigEditor;
