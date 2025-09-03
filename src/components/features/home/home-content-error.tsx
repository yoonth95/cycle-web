export function HomeContentError() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="text-6xl">😕</div>
        <h2 className="text-xl font-semibold">콘텐츠 로딩 실패</h2>
        <p className="text-muted-foreground">페이지를 새로고침하거나 잠시 후 다시 시도해주세요</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
        >
          새로고침
        </button>
      </div>
    </div>
  );
}
