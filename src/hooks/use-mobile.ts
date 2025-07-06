import * as React from "react";
import { isMobile as isMobileDevice } from "react-device-detect";

const MOBILE_BREAKPOINT = 768; // 태블릿까지 포함하는 모바일 상한선

export function useMobile({ breakpoint = MOBILE_BREAKPOINT }: { breakpoint?: number }) {
  const [mobile, setMobile] = React.useState<[boolean, number]>([false, breakpoint]);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const determineIsMobile = () => {
      const widthBasedMobile = window.innerWidth <= breakpoint;
      return isMobileDevice || widthBasedMobile;
    };

    const onChange = () => setMobile([determineIsMobile(), window.innerWidth]);
    setMobile([determineIsMobile(), window.innerWidth]);

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return mobile;
}
