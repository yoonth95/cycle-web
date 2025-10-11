import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { Buffer } from "node:buffer";

import { getAdminSession } from "@/lib/admin/session";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const STORAGE_BUCKET = "cycle-web-storage";
const STORAGE_PREFIX = "editor";
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

const getFileExtension = (file: File): string => {
  const nameMatch = file.name?.match(/\.([A-Za-z0-9]+)$/);
  if (nameMatch?.[1]) {
    return nameMatch[1].toLowerCase();
  }

  const typeMatch = file.type?.match(/image\/([A-Za-z0-9.+-]+)/);
  if (typeMatch?.[1]) {
    return typeMatch[1].toLowerCase();
  }

  return "png";
};

const generateFileName = (extension: string) => {
  const uniqueSuffix = randomUUID?.() ?? Math.random().toString(36).slice(2, 10);
  return `${Date.now()}-${uniqueSuffix}.${extension}`;
};

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json(
      { message: "Supabase service client is not configured." },
      { status: 500 },
    );
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ message: "이미지 파일이 필요합니다." }, { status: 400 });
  }

  if (file.size <= 0) {
    return NextResponse.json({ message: "빈 파일은 업로드할 수 없습니다." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json({ message: "최대 10MB 이하의 이미지만 업로드할 수 있습니다." }, { status: 400 });
  }

  const extension = getFileExtension(file);
  const fileName = generateFileName(extension);
  const objectPath = `${STORAGE_PREFIX}/${fileName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabase.storage.from(STORAGE_BUCKET).upload(objectPath, buffer, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || "application/octet-stream",
  });

  if (uploadError) {
    console.error("[api/admin/uploads/editor][upload]", uploadError);
    return NextResponse.json({ message: "이미지 업로드에 실패했습니다." }, { status: 500 });
  }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(objectPath);
  if (!data?.publicUrl) {
    return NextResponse.json(
      { message: "업로드된 이미지 URL을 확인할 수 없습니다." },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: data.publicUrl });
}
