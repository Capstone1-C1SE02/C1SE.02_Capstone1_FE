import icon from "@/ultils/icon";
const { FaBars } = icon;
import Button from "./Button";

function Header() {
  return (
    <header className="flex h-[70px] w-full items-center justify-between bg-secondary px-6">
      <div className="text-iconHeader">
        <FaBars />
      </div>
      <div className="relative">
        <img
          className="h-[30px] w-[30px] rounded-full"
          src="https://th.bing.com/th/id/R.105feb1ff0869489e31624ff0fbd4e8c?rik=1MqbiSkQ4pBw8Q&pid=ImgRaw&r=0"
          alt=""
        />
        <div className="absolute bottom-[-70px] right-0 flex flex-col gap-1 rounded bg-white p-[5px]">
          <Button text={"Cài đặt"} bgColor={"bg-red-500"}></Button>
          <Button text={"Đăng xuất"} bgColor={"bg-red-500"}></Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
