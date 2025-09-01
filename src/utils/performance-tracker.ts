/**
 * 페이지 전환 성능 측정을 위한 유틸리티 함수들
 * performance.mark()와 performance.measure()를 사용하여
 * Link 클릭부터 페이지 로드 완료까지의 시간을 측정
 */

// 성능 측정 결과 타입 정의
export interface PerformanceMeasurement {
  /** 측정된 시간 (밀리초) */
  duration: number;
  /** 시작 마크 이름 */
  startMark: string;
  /** 끝 마크 이름 */
  endMark: string;
  /** 측정이 시작된 시간 */
  startTime: number;
  /** 측정이 끝난 시간 */
  endTime: number;
  /** 대상 URL */
  targetUrl: string;
}

// 성능 측정 결과를 저장할 전역 객체
const performanceResults = new Map<string, PerformanceMeasurement>();

// 중복 측정 방지를 위한 플래그
const activeMeasurements = new Set<string>();

/**
 * 페이지 전환 시작 마크를 생성
 * Link 클릭 시 호출되어야 함
 */
export function markNavigationStart(targetUrl: string): void {
  if (typeof window === "undefined" || !window.performance) {
    return;
  }

  // 이미 측정 중인 경우 건너뛰기
  if (activeMeasurements.has(targetUrl)) {
    console.log(`⏭️ Skipping duplicate navigation start for: ${targetUrl}`);
    return;
  }

  const markName = `nav-start-${targetUrl}`;

  try {
    // 이전 마크가 있다면 제거
    performance.clearMarks(markName);

    performance.mark(markName);
    activeMeasurements.add(targetUrl);

    console.log(`🚀 Navigation started to: ${targetUrl}`);

    // 5초 후 자동으로 측정 상태 해제 (타임아웃 방지)
    setTimeout(() => {
      activeMeasurements.delete(targetUrl);
    }, 5000);
  } catch (error) {
    console.error("Error marking navigation start:", error);
    activeMeasurements.delete(targetUrl);
  }
}

/**
 * 페이지 로드 완료 마크를 생성하고 측정 결과를 계산
 * 페이지 컴포넌트가 마운트된 후 호출되어야 함
 */
export function markNavigationEnd(currentUrl: string): PerformanceMeasurement | null {
  if (typeof window === "undefined" || !window.performance) {
    return null;
  }

  // 이미 측정 완료된 경우 건너뛰기 (React Strict Mode 대응)
  if (!activeMeasurements.has(currentUrl)) {
    console.log(`⏭️ Skipping duplicate navigation end for: ${currentUrl}`);
    return null;
  }

  const startMarkName = `nav-start-${currentUrl}`;
  const endMarkName = `nav-end-${currentUrl}`;
  const measureName = `nav-measure-${currentUrl}`;

  try {
    // 끝 마크 생성
    performance.mark(endMarkName);

    // 시작 마크가 존재하는지 확인
    const marks = performance.getEntriesByName(startMarkName, "mark");
    if (marks.length === 0) {
      console.warn(`Start mark not found for URL: ${currentUrl}`);
      activeMeasurements.delete(currentUrl);
      return null;
    }

    // 측정 수행
    performance.measure(measureName, startMarkName, endMarkName);

    // 측정 결과 가져오기
    const measures = performance.getEntriesByName(measureName, "measure");
    if (measures.length === 0) {
      console.warn(`Measure not found for URL: ${currentUrl}`);
      activeMeasurements.delete(currentUrl);
      return null;
    }

    const measure = measures[measures.length - 1]; // 가장 최근 측정값
    const startMark = marks[marks.length - 1]; // 가장 최근 시작 마크

    const result: PerformanceMeasurement = {
      duration: measure.duration,
      startMark: startMarkName,
      endMark: endMarkName,
      startTime: startMark.startTime,
      endTime: measure.startTime + measure.duration,
      targetUrl: currentUrl,
    };

    // 결과 저장
    performanceResults.set(currentUrl, result);

    // 측정 상태 해제
    activeMeasurements.delete(currentUrl);

    // 콘솔에 결과 출력
    logPerformanceResult(result);

    // 사용된 마크와 측정값 정리
    performance.clearMarks(startMarkName);
    performance.clearMarks(endMarkName);
    performance.clearMeasures(measureName);

    return result;
  } catch (error) {
    console.error("Error measuring navigation performance:", error);
    activeMeasurements.delete(currentUrl);
    return null;
  }
}

/**
 * 성능 측정 결과를 콘솔에 예쁘게 출력
 */
function logPerformanceResult(result: PerformanceMeasurement): void {
  const { duration, targetUrl, startTime, endTime } = result;

  // 캐시 상태 추정 (이전 측정과 비교)
  const previousResult = performanceResults.get(targetUrl);
  const isLikelyCached = previousResult && duration < previousResult.duration * 0.7;

  // 네트워크 상태 확인
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const networkInfo = (navigator as any)?.connection;
  const networkSpeed = networkInfo ? `${networkInfo.effectiveType || "unknown"}` : "unknown";

  // 🔍 성능 차이 원인 분석 정보 수집
  const analysisInfo = collectPerformanceAnalysisInfo(duration, targetUrl);

  console.group(`🎯 Page Navigation Performance`);
  console.log(`📍 URL: ${targetUrl}`);
  console.log(`⏱️  Duration: ${duration.toFixed(2)}ms`);
  console.log(`🚀 Start Time: ${startTime.toFixed(2)}ms`);
  console.log(`🏁 End Time: ${endTime.toFixed(2)}ms`);

  // 추가 정보
  if (networkInfo) {
    console.log(`📶 Network: ${networkSpeed} (${networkInfo.downlink || "?"}Mbps)`);
  }

  if (isLikelyCached) {
    console.log(
      `💾 Likely cached (${((duration / previousResult.duration) * 100).toFixed(0)}% of previous)`,
    );
  }

  // 🔍 성능 차이 원인 분석 출력
  console.group(`🔍 Performance Analysis`);
  analysisInfo.forEach((info) => console.log(info));
  console.groupEnd();

  // 성능 평가
  if (duration < 100) {
    console.log(`🚀 매우 빠름! (< 100ms)`);
  } else if (duration < 300) {
    console.log(`⚡ 빠름 (100-300ms)`);
  } else if (duration < 1000) {
    console.log(`👍 양호 (300ms-1s)`);
  } else {
    console.log(`⚠️  개선 필요 (> 1s)`);
  }

  // 변화 추세 표시
  if (previousResult) {
    const change = duration - previousResult.duration;
    const changePercent = ((change / previousResult.duration) * 100).toFixed(1);
    if (Math.abs(change) > 50) {
      // 50ms 이상 차이가 날 때만 표시
      const icon = change > 0 ? "📈" : "📉";
      const trend = change > 0 ? "slower" : "faster";
      console.log(
        `${icon} ${Math.abs(change).toFixed(0)}ms ${trend} than previous (${changePercent}%)`,
      );
    }
  }

  console.groupEnd();
}

/**
 * 성능 차이 원인 분석 정보 수집
 */
function collectPerformanceAnalysisInfo(duration: number, targetUrl: string): string[] {
  const info: string[] = [];

  // 1. React Server Components (RSC) 렌더링 시간 분석
  const isSlowRSC = duration > 800; // 800ms 이상이면 RSC 렌더링이 느림
  const isFastRSC = duration < 300; // 300ms 미만이면 RSC 렌더링이 빠름

  if (isSlowRSC) {
    info.push(`🖥️  Slow RSC rendering (${duration.toFixed(0)}ms) - Server processing delay`);
  } else if (isFastRSC) {
    info.push(`⚡ Fast RSC rendering (${duration.toFixed(0)}ms) - Server optimized`);
  } else {
    info.push(`🖥️  Normal RSC rendering (${duration.toFixed(0)}ms) - Acceptable server time`);
  }

  // 2. 개발 모드 오버헤드 분석
  const isDevelopmentSlowdown = duration > 1000;
  if (isDevelopmentSlowdown) {
    info.push(`🛠️  Development mode overhead detected - Production will be faster`);
  }

  // 3. 메모리 사용량 확인 (가능한 경우)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((performance as any).memory) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const memory = (performance as any).memory;
    const memoryUsage = ((memory.usedJSHeapSize / memory.totalJSHeapSize) * 100).toFixed(1);
    info.push(
      `🧠 Memory usage: ${memoryUsage}% (${(memory.usedJSHeapSize / 1024 / 1024).toFixed(1)}MB)`,
    );

    if (parseFloat(memoryUsage) > 80) {
      info.push(`⚠️  High memory usage may slow down RSC rendering`);
    }
  }

  // 4. 시스템 성능 패턴 분석 (이전 측정과 비교)
  const recentMeasurements = Array.from(performanceResults.values())
    .filter((r) => Math.abs(r.endTime - performance.now()) < 20000) // 최근 20초 내
    .map((r) => r.duration);

  if (recentMeasurements.length > 2) {
    const avgRecent = recentMeasurements.reduce((a, b) => a + b, 0) / recentMeasurements.length;
    const stdDev = Math.sqrt(
      recentMeasurements.reduce((sum, val) => sum + Math.pow(val - avgRecent, 2), 0) /
        recentMeasurements.length,
    );

    if (duration > avgRecent + stdDev) {
      info.push(
        `🐌 Unusually slow (${duration.toFixed(0)}ms vs avg ${avgRecent.toFixed(0)}ms) - System load spike`,
      );
    } else if (duration < avgRecent - stdDev) {
      info.push(
        `⚡ Unusually fast (${duration.toFixed(0)}ms vs avg ${avgRecent.toFixed(0)}ms) - System optimized`,
      );
    }

    // 성능 변동성 체크
    const variability = (stdDev / avgRecent) * 100;
    if (variability > 50) {
      info.push(`📊 High performance variability (${variability.toFixed(0)}%) - Unstable system`);
    }
  }

  // 5. 페이지 복잡도와 실제 성능 비교
  const complexity = estimatePageComplexity(targetUrl);
  const expectedTime = getExpectedRenderTime(targetUrl);
  if (duration > expectedTime * 1.5) {
    info.push(`📊 ${complexity} page slower than expected (${expectedTime}ms)`);
  } else if (duration < expectedTime * 0.7) {
    info.push(`📊 ${complexity} page faster than expected (${expectedTime}ms)`);
  } else {
    info.push(`📊 ${complexity} - performance within expected range`);
  }

  // 6. Hot Reload/Fast Refresh 영향 분석
  const lastResourceTiming = performance
    .getEntriesByType("resource")
    .filter((entry) => entry.name.includes("hot-reloader") || entry.name.includes("webpack"))
    .filter((entry) => entry.startTime > performance.now() - 10000); // 최근 10초

  if (lastResourceTiming.length > 0) {
    info.push(`🔄 Hot Reload activity detected - May affect RSC rendering`);
  }

  // 7. 네트워크 요청 패턴
  const resourceTiming = performance.getEntriesByType("resource").filter(
    (entry) => entry.startTime > performance.now() - 5000, // 최근 5초
  );

  if (resourceTiming.length > 15) {
    info.push(`🌐 Heavy network load (${resourceTiming.length} requests) - RSC streaming delayed`);
  } else if (resourceTiming.length < 5) {
    info.push(`🌐 Light network load (${resourceTiming.length} requests) - Optimal conditions`);
  }

  return info;
}

/**
 * 페이지 복잡도 추정
 */
function estimatePageComplexity(url: string): string {
  if (url.includes("/smart-mobility")) {
    return "High complexity";
  } else if (url.includes("/style")) {
    return "Medium complexity";
  } else if (url.includes("/bicycles")) {
    return "Medium complexity";
  } else {
    return "Low complexity";
  }
}

/**
 * 예상 렌더링 시간 추정 (RSC 기준)
 */
function getExpectedRenderTime(url: string): number {
  if (url.includes("/smart-mobility")) {
    return 600; // 카테고리 필터링 페이지는 복잡함
  } else if (url.includes("/style")) {
    return 400; // 스타일 리스트 페이지
  } else if (url.includes("/bicycles")) {
    return 350; // 메인 자전거 페이지
  } else {
    return 200; // 단순 페이지
  }
}

/**
 * 모든 성능 측정 결과를 반환
 */
export function getAllPerformanceResults(): Map<string, PerformanceMeasurement> {
  return new Map(performanceResults);
}

/**
 * 특정 URL의 성능 측정 결과를 반환
 */
export function getPerformanceResult(url: string): PerformanceMeasurement | undefined {
  return performanceResults.get(url);
}

/**
 * 성능 측정 결과를 초기화
 */
export function clearPerformanceResults(): void {
  performanceResults.clear();

  // 남아있는 모든 performance 마크와 측정값 정리
  if (typeof window !== "undefined" && window.performance) {
    try {
      const marks = performance.getEntriesByType("mark");
      marks.forEach((mark) => {
        if (mark.name.startsWith("nav-")) {
          performance.clearMarks(mark.name);
        }
      });

      const measures = performance.getEntriesByType("measure");
      measures.forEach((measure) => {
        if (measure.name.startsWith("nav-")) {
          performance.clearMeasures(measure.name);
        }
      });
    } catch (error) {
      console.error("Error clearing performance entries:", error);
    }
  }
}

/**
 * React 컴포넌트에서 사용할 수 있는 hooks
 */
export function usePagePerformance(currentUrl: string) {
  if (typeof window === "undefined") {
    return {
      markEnd: () => null,
      getResult: () => undefined,
    };
  }

  return {
    markEnd: () => markNavigationEnd(currentUrl),
    getResult: () => getPerformanceResult(currentUrl),
  };
}

/**
 * 개발자 도구에서 사용할 수 있는 성능 측정 유틸리티 함수들
 * 브라우저 콘솔에서 window.perfTracker로 접근 가능
 */
export const devPerformanceUtils = {
  /**
   * 모든 성능 측정 결과를 테이블 형태로 출력
   */
  showAllResults() {
    const results = getAllPerformanceResults();
    if (results.size === 0) {
      console.log("📊 측정된 성능 데이터가 없습니다.");
      return;
    }

    const tableData = Array.from(results.entries()).map(([url, result]) => ({
      URL: url,
      "측정 시간 (ms)": result.duration.toFixed(2),
      평가:
        result.duration < 100
          ? "🚀 매우 빠름"
          : result.duration < 300
            ? "⚡ 빠름"
            : result.duration < 1000
              ? "👍 양호"
              : "⚠️ 개선 필요",
      "시작 시점": result.startTime.toFixed(2),
      "종료 시점": result.endTime.toFixed(2),
    }));

    console.table(tableData);
  },

  /**
   * 특정 URL의 상세 정보 출력
   */
  showDetails(url: string) {
    const result = getPerformanceResult(url);
    if (!result) {
      console.log(`❌ "${url}"에 대한 성능 데이터를 찾을 수 없습니다.`);
      return;
    }

    console.group(`🎯 성능 측정 상세 정보: ${url}`);
    console.log(`📍 URL: ${result.targetUrl}`);
    console.log(`⏱️  총 소요 시간: ${result.duration.toFixed(2)}ms`);
    console.log(`🚀 측정 시작: ${result.startTime.toFixed(2)}ms`);
    console.log(`🏁 측정 완료: ${result.endTime.toFixed(2)}ms`);
    console.log(
      `📊 성능 평가: ${
        result.duration < 100
          ? "🚀 매우 빠름"
          : result.duration < 300
            ? "⚡ 빨음"
            : result.duration < 1000
              ? "👍 양호"
              : "⚠️ 개선 필요"
      }`,
    );
    console.groupEnd();
  },

  /**
   * 성능 측정 데이터 초기화
   */
  clear() {
    clearPerformanceResults();
    console.log("🧹 성능 측정 데이터가 초기화되었습니다.");
  },

  /**
   * 평균 성능 통계 출력
   */
  showStats() {
    const results = getAllPerformanceResults();
    if (results.size === 0) {
      console.log("📊 측정된 성능 데이터가 없습니다.");
      return;
    }

    const durations = Array.from(results.values()).map((r) => r.duration);
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    const min = Math.min(...durations);
    const max = Math.max(...durations);
    const median = durations.sort((a, b) => a - b)[Math.floor(durations.length / 2)];

    // 성능 분포 계산
    const veryFast = durations.filter((d) => d < 100).length;
    const fast = durations.filter((d) => d >= 100 && d < 300).length;
    const good = durations.filter((d) => d >= 300 && d < 1000).length;
    const slow = durations.filter((d) => d >= 1000).length;

    console.group("📈 성능 통계");
    console.log(`📊 총 측정 횟수: ${results.size}회`);
    console.log(`⚡ 평균 로딩 시간: ${avg.toFixed(2)}ms`);
    console.log(`📊 중간값: ${median.toFixed(2)}ms`);
    console.log(`🚀 최단 로딩 시간: ${min.toFixed(2)}ms`);
    console.log(`🐌 최장 로딩 시간: ${max.toFixed(2)}ms`);
    console.log(`📊 성능 분포:`);
    console.log(
      `  🚀 매우 빠름 (< 100ms): ${veryFast}회 (${((veryFast / results.size) * 100).toFixed(1)}%)`,
    );
    console.log(`  ⚡ 빠름 (100-300ms): ${fast}회 (${((fast / results.size) * 100).toFixed(1)}%)`);
    console.log(`  👍 양호 (300ms-1s): ${good}회 (${((good / results.size) * 100).toFixed(1)}%)`);
    console.log(`  ⚠️ 개선 필요 (> 1s): ${slow}회 (${((slow / results.size) * 100).toFixed(1)}%)`);
    console.groupEnd();
  },

  /**
   * 성능 변화 추세 분석
   */
  showTrends() {
    const results = getAllPerformanceResults();
    if (results.size < 2) {
      console.log("📊 추세 분석을 위해서는 최소 2개의 측정 데이터가 필요합니다.");
      return;
    }

    console.group("📈 성능 추세 분석");

    // URL별 성능 변화 (실제로는 같은 URL의 여러 측정이 있을 때만 의미가 있지만,
    // 현재 구조에서는 각 URL당 최신 결과만 저장되므로 전체적인 경향을 보여줌)
    const urls = Array.from(results.keys());
    urls.forEach((url) => {
      const result = results.get(url);
      if (result) {
        const performance =
          result.duration < 100
            ? "🚀"
            : result.duration < 300
              ? "⚡"
              : result.duration < 1000
                ? "👍"
                : "⚠️";
        console.log(`${performance} ${url}: ${result.duration.toFixed(2)}ms`);
      }
    });

    console.groupEnd();
  },
};

// 개발 환경에서 전역 객체에 성능 측정 유틸리티 추가
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  (window as unknown as { perfTracker: typeof devPerformanceUtils }).perfTracker =
    devPerformanceUtils;
  console.log("🔧 개발자 도구: window.perfTracker로 성능 측정 결과를 확인할 수 있습니다.");
}
