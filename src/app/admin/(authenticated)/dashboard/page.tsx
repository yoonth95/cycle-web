import { fetchAdminDashboardSnapshot } from "@/lib/admin/dashboard";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export default async function AdminDashboardPage() {
  const snapshot = await fetchAdminDashboardSnapshot();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">관리자 대시보드</h1>
        <p className="text-muted-foreground">
          전체 서비스 지표와 최근 관리자 접근 기록을 확인할 수 있습니다.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>등록된 공지사항</CardDescription>
            <CardTitle>{snapshot.totalNotices.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            게시된 공지사항 총 개수
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>문의사항 누적</CardDescription>
            <CardTitle>{snapshot.totalContacts.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">고객이 남긴 문의 건수</CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>잠금된 계정</CardDescription>
            <CardTitle>{snapshot.lockedAccounts.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            5회 이상 로그인 실패로 잠긴 계정 수
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>세션 보존 기간</CardDescription>
            <CardTitle>12시간</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            관리자 세션은 비활성 상태에서도 12시간 후 만료됩니다.
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">최근 로그인 기록</h2>
          <p className="text-muted-foreground text-sm">
            관리자 접속 이력은 모든 로그인 시 자동으로 기록되며, 실패 이력에는 사유가 포함됩니다.
          </p>
        </div>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>시간</TableHead>
                  <TableHead>아이디</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>결과</TableHead>
                  <TableHead>비고</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {snapshot.recentLoginLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-muted-foreground text-center">
                      아직 기록이 없습니다.
                    </TableCell>
                  </TableRow>
                ) : (
                  snapshot.recentLoginLogs.map((log) => {
                    if (log.ip_address !== "::1") {
                      return (
                        <TableRow key={log.id}>
                          <TableCell>{formatDateTime(log.created_at)}</TableCell>
                          <TableCell>{log.username ?? "-"}</TableCell>
                          <TableCell>{log.ip_address ?? "-"}</TableCell>
                          <TableCell>
                            {log.success ? (
                              <span className="text-emerald-600">성공</span>
                            ) : (
                              <span className="text-destructive">실패</span>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground max-w-xs truncate text-sm">
                            {log.success ? "-" : (log.failure_reason ?? "-")}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
