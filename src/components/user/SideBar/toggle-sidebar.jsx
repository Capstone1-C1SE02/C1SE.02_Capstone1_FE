import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import SideBar from "@/components/user/SideBar";

const ToggleSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-8 top-1/2 -translate-y-1/2 lg:hidden"
        >
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="items-center" asChild>
          <img src="/images/logo.svg" alt="logo" className="w-32" />
        </SheetHeader>
        <Separator className="my-4" />
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};

export default ToggleSidebar;
