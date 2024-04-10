import { NavLink } from "react-router-dom";

function SideBar() {
  const getClassName = ({ isActive }) => {
    return [
      "py-[10px] px-[20px] rounded-[10px] ",
      isActive
        ? "text-[--textColorActive] bg-[--backgroundColorActive]"
        : "hover:bg-[--backgroundColorHover] transition-colors",
    ].join(" ");
  };

  return (
    <div className="flex h-[100%] w-[325px] flex-col gap-[15px] py-[10px]">
      <NavLink to={"/"} className={getClassName}>
        Tìm kiếm thủ công
      </NavLink>
      <NavLink to={"/search-by-image"} className={getClassName}>
        Tìm kiếm bằng hình ảnh
      </NavLink>
    </div>
  );
}

export default SideBar;
