import React, { useEffect, useState } from "react";
import { FooterPage, Nav, Header } from "@/components/admin";

function adminLayout({ children }) {
  const [showNav, setShowNav] = useState(true);
  const [showLabel, setShowLabel] = useState(false);

  const handleOnClick = () => {
    setShowNav(!showNav);
    setShowLabel(!showLabel);
  };

  return (
    <div className="flex h-screen min-w-max overflow-hidden">
      <div className="flex w-full">
        <div
          className={`  transition-all duration-300 ease-in-out ${showNav ? "w-[350px]" : "w-0"} h-full border-r-[1px] bg-secondary `}
        >
          <Nav onClick={handleOnClick} />
        </div>
        <div
          className={`relative ${showNav ? "w-[82vw]" : "w-[100vw]"} right-0 bg-secondary`}
        >
          <div className="relative h-[100vh] ">
            <div>
              <Header onClickShowNav={handleOnClick} />{" "}
            </div>
            <div className=" h-[88%] px-6 pb-2">{children}</div>
            <div className="mb-[20px] flex h-[50px] justify-center ">
              <FooterPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default adminLayout;
