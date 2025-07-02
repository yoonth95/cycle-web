import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Logo } from "@/components/common/logo";
import { Menu, X } from "lucide-react";

export function DrawerMenu() {
  return (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button variant="ghost" className="p-2 rounded-md hover:bg-transparent hover:text-white">
          <Menu className="w-6 h-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-figma-alizarin-crimson border-figma-alizarin-crimson">
        <DrawerTitle>
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <Logo />
            <DrawerClose asChild>
              <Button variant="ghost" className="p-2 text-white hover:bg-transparent hover:text-white">
                <X className="w-6 h-6" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerTitle>
        <DrawerDescription />
        <div className="w-full min-h-[200px]">
          {/* 메뉴 그리드 */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mx-auto"></div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
