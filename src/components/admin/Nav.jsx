import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function Nav({ onClick }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const active = "bg-custom-bg-notActive-nav text-custom-text-notActive-nav";

  const handleSetIsactive = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className=" w-[400px] p-[10px]">
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
              // onClick={(e) => handleSetIsactive(0)}
              onClick={onClick}
              className={`list-none rounded-[10px] px-[20px] py-[5px] text-[14px] font-medium hover:bg-custom-bg-active-nav hover:text-custom-text-active-nav ${activeIndex === 0 ? active : ""}`}
            >
              <NavLink to={"/"}>Danh sách sinh viên đã nhận bằng</NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(1)}
              className={`list-none rounded-[10px] px-[20px] py-[5px] text-[14px] font-medium hover:bg-custom-bg-active-nav hover:text-custom-text-active-nav ${activeIndex === 1 ? active : ""}`}
            >
              <NavLink to={"/list-student"}>Danh sách sinh viên </NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(2)}
              className={`list-none rounded-[10px] px-[20px] py-[5px] text-[14px] font-medium hover:bg-custom-bg-active-nav hover:text-custom-text-active-nav ${activeIndex === 2 ? active : ""}`}
            >
              <NavLink to={"/list-year"}>Danh sách năm học </NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(3)}
              className={`list-none rounded-[10px] px-[20px] py-[5px] text-[14px] font-medium hover:bg-custom-bg-active-nav hover:text-custom-text-active-nav ${activeIndex === 3 ? active : ""}`}
            >
              <NavLink to={"/list-academic-program"}>
                Danh sách chương trình đào tạo{" "}
              </NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(4)}
              className={`list-none rounded-[10px] px-[20px] py-[5px] text-[14px] font-medium hover:bg-custom-bg-active-nav hover:text-custom-text-active-nav ${activeIndex === 4 ? active : ""}`}
            >
              <NavLink to={"/list-academic-program-year"}>
                Danh sách chương trình đào tạo theo năm{" "}
              </NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(5)}
              className={`list-none rounded-[10px] px-[20px] py-[5px] text-[14px] font-medium hover:bg-custom-bg-active-nav hover:text-custom-text-active-nav ${activeIndex === 5 ? active : ""}`}
            >
              <NavLink to={"/list-majored"}>Danh sách ngành học </NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(6)}
              className={`list-none rounded-[10px] px-[20px] py-[5px] text-[14px] font-medium hover:bg-custom-bg-active-nav hover:text-custom-text-active-nav ${activeIndex === 6 ? active : ""}`}
            >
              <NavLink to={"/degree-book"}>Sổ cấp bằng </NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(7)}
              className={`list-none rounded-[10px] px-[20px] py-[5px] text-[14px] font-medium hover:bg-custom-bg-active-nav hover:text-custom-text-active-nav ${activeIndex === 7 ? active : ""}`}
            >
              <NavLink to={"/degree-list"}>Danh sách bằng </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
