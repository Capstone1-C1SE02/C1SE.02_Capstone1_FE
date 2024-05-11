import ToggleSidebar from "@/components/user/SideBar/toggle-sidebar";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="relative flex flex-shrink-0 justify-center rounded-[20px] bg-white py-5">
      <ToggleSidebar />
      <img src={"/images/logo.svg"} alt="Logo" className="w-36 md:w-auto" />
      <Link className="absolute right-8 top-1/2 -translate-y-1/2" to={"/login"}>
        <LogIn size={24} />
      </Link>
    </header>
  );
}

export default Header;
