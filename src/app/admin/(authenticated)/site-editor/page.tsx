import { SiteConfigEditor } from "@/components/features/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAllSiteConfigurations } from "@/lib/admin/site-config";

const defaultPageId = "home";

export default async function AdminSiteEditorPage() {
  const configs = await fetchAllSiteConfigurations();
  const configsMap = Object.fromEntries(configs.map((config) => [config.page_id, config.payload]));

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">사이트 레이아웃 에디터</h1>
        <p className="text-muted-foreground">
          주요 페이지의 구성 데이터를 JSON 형태로 관리하여 문구, 이미지, 섹션 순서를 즉시 반영할 수
          있습니다.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>사용 방법</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2 text-sm">
          <p>1. 상단에서 수정할 페이지를 선택하세요.</p>
          <p>2. JSON 데이터를 원하는 값으로 변경합니다. (예: 배너 이미지, CTA 문구)</p>
          <p>3. 저장 버튼을 누르면 해당 페이지 구성 값이 Supabase에 기록됩니다.</p>
          <p>4. 잘못된 JSON 형식은 저장되지 않으며, 저장 이력은 Supabase에서 확인할 수 있습니다.</p>
        </CardContent>
      </Card>

      <SiteConfigEditor initialPageId={defaultPageId} configs={configsMap} />
    </div>
  );
}
