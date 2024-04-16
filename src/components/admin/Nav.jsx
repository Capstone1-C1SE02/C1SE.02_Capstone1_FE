import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function Nav() {
  const [activeIndex, setActiveIndex] = useState(null);

  const active = "bg-custom-bg-notActive-nav text-custom-text-notActive-nav";

  const handleSetIsactive = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="border-r-2 p-[10px]">
      <img
        className="mx-auto my-[20px] h-[50px] w-[169.39px] "
        src={"/images/logo.svg"}
        alt="Logo"
      />
      <div className="">
        <h1 className="mx-[20px] py-[10px] text-[11px] font-medium">
          MANAGEMENT
        </h1>
        <div>
          <ul>
            <li
              onClick={(e) => handleSetIsactive(0)}
              className={`hover:bg-custom-bg-active-nav hover:text-custom-text-active-nav list-none rounded-[10px] px-[20px] py-[5px] text-[14px] font-medium ${activeIndex === 0 ? active : ""}`}
            >
              <NavLink to={"/login"}>Danh sách sinh viên đã nhận bằng</NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(1)}
              className={`hover:bg-custom-bg-active-nav hover:text-custom-text-active-nav list-none rounded-[10px] px-[20px] py-[5px] text-[14px] font-medium ${activeIndex === 1 ? active : ""}`}
            >
              <NavLink to={"/login"}>Danh sách sinh viên </NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(2)}
              className={`hover:bg-custom-bg-active-nav hover:text-custom-text-active-nav list-none rounded-[10px] px-[20px] py-[5px] text-[14px] font-medium ${activeIndex === 2 ? active : ""}`}
            >
              <NavLink to={"/login"}>Danh sách năm học </NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(3)}
              className={`hover:bg-custom-bg-active-nav hover:text-custom-text-active-nav list-none rounded-[10px] px-[20px] py-[5px] text-[14px] font-medium ${activeIndex === 3 ? active : ""}`}
            >
              <NavLink to={"/login"}>Danh sách chương trình đào tạo </NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(4)}
              className={`hover:bg-custom-bg-active-nav hover:text-custom-text-active-nav list-none rounded-[10px] px-[20px] py-[5px] text-[14px] font-medium ${activeIndex === 4 ? active : ""}`}
            >
              <NavLink to={"/login"}>
                Danh sách chương trình đào tạo theo năm{" "}
              </NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(5)}
              className={`hover:bg-custom-bg-active-nav hover:text-custom-text-active-nav list-none rounded-[10px] px-[20px] py-[5px] text-[14px] font-medium ${activeIndex === 5 ? active : ""}`}
            >
              <NavLink to={"/login"}>Danh sách ngành học </NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(6)}
              className={`hover:bg-custom-bg-active-nav hover:text-custom-text-active-nav list-none rounded-[10px] px-[20px] py-[5px] text-[14px] font-medium ${activeIndex === 6 ? active : ""}`}
            >
              <NavLink to={"/login"}>Sổ cấp bằng </NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(7)}
              className={`hover:bg-custom-bg-active-nav hover:text-custom-text-active-nav list-none rounded-[10px] px-[20px] py-[5px] text-[14px] font-medium ${activeIndex === 7 ? active : ""}`}
            >
              <NavLink to={"/login"}>Danh sách bằng </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
