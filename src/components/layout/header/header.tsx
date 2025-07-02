import { NavigationBar, DrawerMenu } from "@/components/layout/navigation";
import { Logo } from "@/components/common/logo";

export function Header() {
  return (
    <header className="bg-figma-alizarin-crimson text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 데스크톱 네비게이션 */}
          <Logo />
          <NavigationBar variant="desktop" />

          <DrawerMenu />
        </div>
      </div>
    </header>
  );
}
