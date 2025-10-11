"use client";

import { useEffect, useMemo, useRef } from "react";
import type Quill from "quill";
import type { ExpandedQuillOptions } from "quill";

import { toast } from "sonner";

import { cn } from "@/lib/utils";
import type { QuillDelta } from "@/lib/home/quill";
import { uploadEditorImage } from "@/lib/quill/upload-image";

import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";

const DEFAULT_MODULES: NonNullable<ExpandedQuillOptions["modules"]> = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image"],
  ],
};

const EMPTY_HTML = "<p><br></p>";

interface RichTextEditorProps {
  value?: string;
  deltaValue?: QuillDelta;
  onChange?: (nextValue: string) => void;
  onDeltaChange?: (nextValue: QuillDelta) => void;
  onBlur?: () => void;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
  wrapperClassName?: string;
  modules?: NonNullable<ExpandedQuillOptions["modules"]>;
}

const normalizeHtml = (value?: string | null) => {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();
  if (!trimmed || trimmed === EMPTY_HTML) {
    return "";
  }

  return trimmed;
};

const setEditorContents = (instance: Quill, html: string) => {
  if (!html) {
    instance.setText("", "silent");
    return;
  }

  instance.clipboard.dangerouslyPasteHTML(html, "silent");
};

export function RichTextEditor({
  value,
  deltaValue,
  onChange,
  onDeltaChange,
  onBlur,
  readOnly,
  placeholder,
  className,
  wrapperClassName,
  modules,
}: RichTextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const lastHtmlRef = useRef<string>("");
  const lastDeltaStringRef = useRef<string>("");
  const valueRef = useRef<string | undefined>(value);
  const deltaValueRef = useRef<QuillDelta | undefined>(deltaValue);
  const onChangeRef = useRef<typeof onChange>(onChange);
  const onDeltaChangeRef = useRef<typeof onDeltaChange>(onDeltaChange);
  const onBlurRef = useRef<typeof onBlur>(onBlur);
  const readOnlyRef = useRef<boolean | undefined>(readOnly);
  const placeholderRef = useRef<string | undefined>(placeholder);

  const editorModules = useMemo(() => modules ?? DEFAULT_MODULES, [modules]);
  const modulesRef = useRef<NonNullable<ExpandedQuillOptions["modules"]>>(editorModules);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    if (deltaValue === undefined || deltaValue === null) {
      deltaValueRef.current = undefined;
      return;
    }

    const ops = Array.isArray(deltaValue.ops) ? deltaValue.ops.map((op) => ({ ...op })) : undefined;

    deltaValueRef.current = ops ? { ops } : { ops: [] };
  }, [deltaValue]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onDeltaChangeRef.current = onDeltaChange;
  }, [onDeltaChange]);

  useEffect(() => {
    onBlurRef.current = onBlur;
  }, [onBlur]);

  useEffect(() => {
    readOnlyRef.current = readOnly;
  }, [readOnly]);

  useEffect(() => {
    placeholderRef.current = placeholder;
  }, [placeholder]);

  useEffect(() => {
    modulesRef.current = editorModules;
  }, [editorModules]);

  const setEditorDeltaContents = (instance: Quill, delta: QuillDelta) => {
    if (!delta || !Array.isArray(delta.ops)) {
      instance.setText("", "silent");
      return;
    }

    const normalizedOps = delta.ops.map((op) => ({ ...op }));
    instance.setContents(
      { ops: normalizedOps } as unknown as Parameters<Quill["setContents"]>[0],
      "silent",
    );
    deltaValueRef.current = { ops: normalizedOps };
  };

  const getPlainDelta = (instance: Quill): QuillDelta => {
    const contents = instance.getContents();

    if (!contents || !Array.isArray(contents.ops)) {
      return { ops: [] };
    }

    return {
      ops: contents.ops.map((op) => ({ ...op })),
    };
  };

  useEffect(() => {
    let isMounted = true;
    let dropHandler: ((event: DragEvent) => void) | null = null;
    let pasteHandler: ((event: ClipboardEvent) => void) | null = null;

    const init = async () => {
      if (!containerRef.current || quillRef.current) {
        return;
      }

      const QuillModule = await import("quill");
      if (!isMounted || !containerRef.current) {
        return;
      }

      const QuillConstructor = QuillModule.default ?? QuillModule;

      const quillInstance = new QuillConstructor(containerRef.current, {
        theme: "snow",
        modules: modulesRef.current,
        placeholder: placeholderRef.current,
        readOnly: readOnlyRef.current,
      });

      quillRef.current = quillInstance;

      const uploadAndInsertImages = async (files: File[], baseIndex?: number) => {
        if (!files.length || readOnlyRef.current) {
          return;
        }

        const imageFiles = files.filter(
          (file): file is File => !!file && file.type?.startsWith("image/"),
        );
        if (imageFiles.length === 0) {
          return;
        }

        let insertIndex =
          baseIndex ?? quillInstance.getSelection(true)?.index ?? quillInstance.getLength();

        quillInstance.focus();

        for (const file of imageFiles) {
          try {
            const publicUrl = await uploadEditorImage(file);
            quillInstance.insertEmbed(insertIndex, "image", publicUrl, "user");
            insertIndex += 1;
            quillInstance.setSelection(insertIndex, 0, "silent");
          } catch (error) {
            console.error("[RichTextEditor.imageUpload]", error);
            const message =
              error instanceof Error && error.message
                ? error.message
                : "이미지 업로드에 실패했습니다.";
            toast.error(message);
          }
        }
      };

      const selectLocalImage = () => {
        if (readOnlyRef.current) {
          return;
        }

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.multiple = true;
        input.style.display = "none";

        const handleChange = () => {
          const fileList = input.files ? Array.from(input.files) : [];
          const selection = quillInstance.getSelection(true);
          const baseIndex = selection?.index ?? quillInstance.getLength();
          void uploadAndInsertImages(fileList, baseIndex);
          input.value = "";
          input.remove();
        };

        input.addEventListener("change", handleChange, { once: true });
        input.addEventListener(
          "blur",
          () => {
            input.remove();
          },
          { once: true },
        );

        document.body.appendChild(input);
        input.click();
      };

      const toolbar = quillInstance.getModule("toolbar") as
        | { addHandler?: (format: string, handler: () => void) => void }
        | undefined;
      toolbar?.addHandler?.("image", selectLocalImage);

      dropHandler = (event: DragEvent) => {
        if (!event.dataTransfer) {
          return;
        }

        const files = Array.from(event.dataTransfer.files ?? []).filter((file) =>
          file.type?.startsWith("image/"),
        );

        if (files.length === 0) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        const selection = quillInstance.getSelection(true);
        const baseIndex = selection?.index ?? quillInstance.getLength();
        void uploadAndInsertImages(files, baseIndex);
      };

      pasteHandler = (event: ClipboardEvent) => {
        if (!event.clipboardData) {
          return;
        }

        const files = Array.from(event.clipboardData.items ?? [])
          .filter((item) => item.type?.startsWith("image/"))
          .map((item) => item.getAsFile())
          .filter((file): file is File => !!file);

        if (files.length === 0) {
          return;
        }

        event.preventDefault();

        const selection = quillInstance.getSelection(true);
        const baseIndex = selection?.index ?? quillInstance.getLength();
        void uploadAndInsertImages(files, baseIndex);
      };

      quillInstance.root.addEventListener("drop", dropHandler);
      quillInstance.root.addEventListener("paste", pasteHandler);

      const initialDelta = deltaValueRef.current;
      if (initialDelta !== undefined) {
        setEditorDeltaContents(quillInstance, initialDelta);
        lastHtmlRef.current = normalizeHtml(quillInstance.root.innerHTML);
        lastDeltaStringRef.current = JSON.stringify(initialDelta?.ops ?? []);
        deltaValueRef.current = initialDelta;
      } else {
        const normalizedInitial = normalizeHtml(valueRef.current);
        setEditorContents(quillInstance, normalizedInitial);
        lastHtmlRef.current = normalizedInitial;
        const plainDelta = getPlainDelta(quillInstance);
        lastDeltaStringRef.current = JSON.stringify(plainDelta?.ops ?? []);
        deltaValueRef.current = plainDelta;
        onDeltaChangeRef.current?.(plainDelta);
      }

      quillInstance.on("text-change", () => {
        const html = normalizeHtml(quillInstance.root.innerHTML);
        lastHtmlRef.current = html;
        onChangeRef.current?.(html);

        const plainDelta = getPlainDelta(quillInstance);
        deltaValueRef.current = plainDelta;
        lastDeltaStringRef.current = JSON.stringify(plainDelta?.ops ?? []);
        onDeltaChangeRef.current?.(plainDelta);
      });

      quillInstance.on("selection-change", (range, _oldRange, source) => {
        if (!range && source === "user") {
          onBlurRef.current?.();
        }
      });
    };

    void init();

    return () => {
      isMounted = false;
      const quill = quillRef.current;
      if (quill) {
        if (dropHandler) {
          quill.root.removeEventListener("drop", dropHandler);
        }
        if (pasteHandler) {
          quill.root.removeEventListener("paste", pasteHandler);
        }
        quill.off("text-change");
        quill.off("selection-change");
        quillRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }

    quill.enable(!(readOnly ?? false));
  }, [readOnly]);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }

    const currentDelta = deltaValueRef.current;
    if (currentDelta === undefined) {
      return;
    }

    const nextDeltaString = JSON.stringify(currentDelta?.ops ?? []);
    if (nextDeltaString === lastDeltaStringRef.current) {
      return;
    }

    setEditorDeltaContents(quill, currentDelta);
    lastHtmlRef.current = normalizeHtml(quill.root.innerHTML);
    lastDeltaStringRef.current = nextDeltaString;
  }, [deltaValue]);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }

    if (deltaValueRef.current !== undefined) {
      return;
    }

    const normalized = normalizeHtml(value);
    if (normalized === lastHtmlRef.current) {
      return;
    }

    setEditorContents(quill, normalized);
    lastHtmlRef.current = normalized;
    const plainDelta = getPlainDelta(quill);
    deltaValueRef.current = plainDelta;
    lastDeltaStringRef.current = JSON.stringify(plainDelta?.ops ?? []);
  }, [value]);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) {
      return;
    }

    if (placeholder) {
      quill.root.dataset.placeholder = placeholder;
    } else {
      delete quill.root.dataset.placeholder;
    }
  }, [placeholder]);

  return (
    <div
      className={cn(
        "rich-text-editor border-input relative rounded-md border",
        readOnly ? "opacity-80" : null,
        wrapperClassName,
      )}
    >
      <div
        ref={containerRef}
        className={cn("border-input bg-background text-foreground", className)}
      />
      <style jsx global>{`
        .rich-text-editor .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid hsl(var(--border));
          border-radius: var(--radius) var(--radius) 0 0;
          background-color: hsl(var(--muted));
          padding: 0.5rem;
        }

        .rich-text-editor .ql-toolbar button:hover,
        .rich-text-editor .ql-toolbar button:focus {
          color: hsl(var(--primary));
        }

        .rich-text-editor .ql-container.ql-snow {
          border: none;
          border-radius: 0 0 var(--radius) var(--radius);
          background-color: transparent;
        }

        .rich-text-editor .ql-editor {
          min-height: 16rem;
          font-family: inherit;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .rich-text-editor .ql-editor.ql-blank::before {
          color: hsl(var(--muted-foreground));
          font-style: normal;
        }

        .rich-text-editor .ql-container.ql-bubble {
          border: none;
        }
      `}</style>
    </div>
  );
}
