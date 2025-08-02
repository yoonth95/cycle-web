import Logo from "@/components/common/logo";
import { NavigationContainer } from "@/components/layout/navigation";
import AnimatedHeader from "./animated-header";
import navMenuData from "@/data/nav-menu.json";
import { NavigationDataType } from "@/types/navigation-data";

// JSON 데이터를 NavType으로 타입 캐스팅
const menuData: NavigationDataType = navMenuData as NavigationDataType;

const Header = () => {
  return (
    <AnimatedHeader>
      <div className="container mx-auto px-4">
        <div className="flex h-16 w-full items-center justify-between">
          <div className="flex w-full items-center justify-between gap-12">
            <Logo />
            <NavigationContainer menuData={menuData} />
          </div>
        </div>
      </div>
    </AnimatedHeader>
  );
};

export default Header;
