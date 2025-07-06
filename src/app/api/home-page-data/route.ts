import { NextRequest, NextResponse } from "next/server";
import { getHomePageData, saveCustomizations, deleteCustomizations } from "@/lib/data-service";
import type { SessionConfig } from "@/types";

/**
 * 홈페이지 활성 데이터 API
 * GET /api/home-page-data
 */
export async function GET() {
  try {
    const data = await getHomePageData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("홈페이지 데이터 가져오기 실패:", error);
    return NextResponse.json(
      { error: "홈페이지 데이터를 가져오는데 실패했습니다." },
      { status: 500 },
    );
  }
}

/**
 * 커스터마이징 설정 저장/업데이트
 * POST /api/home-page-data
 */
export async function POST(request: NextRequest) {
  try {
    const body: SessionConfig["customizations"] = await request.json();

    // 실제 환경에서는 데이터베이스에 저장
    const newConfig = await saveCustomizations(body);

    console.log("커스터마이징 저장:", newConfig);

    return NextResponse.json({
      success: true,
      message: "설정이 저장되었습니다.",
      configId: newConfig.id,
    });
  } catch (error) {
    console.error("설정 저장 실패:", error);
    return NextResponse.json({ error: "설정 저장에 실패했습니다." }, { status: 500 });
  }
}

/**
 * 활성 설정 삭제
 * DELETE /api/home-page-data
 */
export async function DELETE() {
  try {
    // 실제 환경에서는 데이터베이스에서 삭제
    await deleteCustomizations();
    console.log("활성 설정 삭제 완료");

    return NextResponse.json({
      success: true,
      message: "활성 설정이 삭제되었습니다.",
    });
  } catch (error) {
    console.error("활성 설정 삭제 실패:", error);
    return NextResponse.json({ error: "활성 설정 삭제에 실패했습니다." }, { status: 500 });
  }
}
