import Button from "./Button";
import { useState } from "react";
import { logout } from "@/redux/apiRequests";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import icon from "@/ultils/icon";

const { FaUserCircle, FaBars } = icon;

function Header({ onClickShowNav, onClickLabel }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showOption, setShowOption] = useState(false);

  const handleShowOption = (e) => {
    setShowOption(!showOption);
    console.log("set");
  };

  const handleLogout = (e) => {
    logout(dispatch, navigate);
    console.log("logout");
  };
  return (
    <div className="flex h-[70px] w-full items-center justify-between bg-backLayout px-6">
      <div className="text-iconHeader" onClick={onClickShowNav}>
        <FaBars onClick={onClickShowNav} />
      </div>

      <div className="relative">
        <FaUserCircle
          className="h-[30px] w-[30px] rounded-full"
          onClick={(e) => handleShowOption(e)}
        />
        {showOption && (
          <div className="rounded-5 absolute bottom-[-44px] right-0 z-10 flex-col border-[1px] bg-white p-[5px]">
            <Button
              textColor={"text-text-button-logout"}
              text={"Đăng xuất"}
              bgColor={"bg-bg-button-logout"}
              onClick={(e) => handleLogout(e)}
            ></Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
