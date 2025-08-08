import Logo from "@/components/common/logo";
import { NavigationContainer } from "@/components/layout/navigation";
import AnimatedHeader from "./animated-header";
import { getNavigationData } from "@/lib/navigation/server";

const Header = async () => {
  const menuData = await getNavigationData();

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
