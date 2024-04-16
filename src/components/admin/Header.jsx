import icon from "@/ultils/icon";
const { FaBars } = icon;
import Button from "./Button";
import { useState } from "react";

function Header({ onClickShowNav, onClickLabel }) {
  const [showOption, setShowOption] = useState(false);

  const handleShowOption = () => {
    setShowOption(!showOption);
  };

  return (
    <div className="flex h-[70px] w-full items-center justify-between bg-secondary px-6">
      <div className="text-iconHeader" onClick={onClickShowNav}>
        <FaBars onClick={onClickShowNav} />
      </div>

      <div className="relative" onClick={handleShowOption}>
        <img
          className="h-[30px] w-[30px] rounded-full"
          src="https://th.bing.com/th/id/R.105feb1ff0869489e31624ff0fbd4e8c?rik=1MqbiSkQ4pBw8Q&pid=ImgRaw&r=0"
          alt=""
        />
        {showOption && (
          <div className="rounded-5 absolute bottom-[-44px] right-0 z-10 flex-col border-[1px] bg-white p-[5px]">
            <Button
              textColor={"text-text-button-logout"}
              text={"Đăng xuất"}
              bgColor={"bg-bg-button-logout"}
              onClick={console.log("đăng xuất")}
            ></Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
