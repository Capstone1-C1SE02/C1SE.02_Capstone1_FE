import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function Nav({ onClick }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = "bg-custom-bg-active-nav text-custom-text-notActive-nav";

  const handleSetIsactive = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-[320px] p-[10px]">
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
              onClick={(e) => handleSetIsactive(5)}
              // className={`relative list-none rounded-[10px] text-[14px] font-medium hover:bg-[#669bbc] ${activeIndex === 0 ? active : ""}`}
              className={`relative list-none rounded-[10px] text-[14px] font-medium hover:bg-[#669bbc]  ${activeIndex === 5 ? active : ""}`}
            >
              <NavLink
                to={"/list-majored"}
                className={" block w-full px-[20px] py-[5px]"}
              >
                Quản lý ngành đào Tạo
              </NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(3)}
              className={`relative list-none rounded-[10px] text-[14px] font-medium hover:bg-[#669bbc] ${activeIndex === 3 ? active : ""}`}
            >
              <NavLink
                to={"/list-academic-program"}
                className={" block w-full px-[20px] py-[5px]"}
              >
                Quản lý chuyên ngành đào tạo
              </NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(7)}
              className={`relative list-none rounded-[10px] text-[14px] font-medium hover:bg-[#669bbc] ${activeIndex === 7 ? active : ""}`}
            >
              <NavLink
                to={"/degree-list"}
                className={" block w-full px-[20px] py-[5px]"}
              >
                Danh sách chương trình đào tạo
              </NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(2)}
              className={`relative list-none rounded-[10px] text-[14px] font-medium hover:bg-[#669bbc] ${activeIndex === 2 ? active : ""}`}
            >
              <NavLink
                to={"/list-year"}
                className={" block w-full px-[20px] py-[5px]"}
              >
                Năm tuyển Sinh
              </NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(1)}
              className={`relative list-none rounded-[10px] text-[14px] font-medium hover:bg-[#669bbc] ${activeIndex === 1 ? active : ""}`}
            >
              <NavLink
                to={"/academic-sesstion-program"}
                className={" block w-full px-[20px] py-[5px]"}
              >
                Chương trình đào tạo theo năm
              </NavLink>
            </li>
            <li
              onClick={(e) => handleSetIsactive(0)}
              className={`relative list-none rounded-[10px] text-[14px] font-medium hover:bg-[#669bbc] ${activeIndex === 0 ? active : ""}`}
            >
              <NavLink
                to={"/list-student"}
                className={" block w-full px-[20px] py-[5px]"}
              >
                Quản lý hồ sơ Sinh viên
              </NavLink>
            </li>

            <li
              onClick={(e) => handleSetIsactive(4)}
              className={`relative list-none rounded-[10px] text-[14px] font-medium hover:bg-[#669bbc] ${activeIndex === 4 ? active : ""}`}
            >
              <NavLink
                to={"/list-academic-program-year"}
                className={" block w-full px-[20px] py-[5px]"}
              >
                Sinh viên theo chuyên ngành
              </NavLink>
            </li>

            <li
              onClick={(e) => handleSetIsactive(6)}
              className={`relative list-none rounded-[10px] text-[14px] font-medium hover:bg-[#669bbc] ${activeIndex === 6 ? active : ""}`}
            >
              <NavLink
                to={"/degree-book"}
                className={" block w-full px-[20px] py-[5px]"}
              >
                Quản lý bằng cấp
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
