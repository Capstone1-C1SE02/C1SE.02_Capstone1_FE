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
    <div className="flex h-screen w-auto overflow-hidden">
      <div className="flex w-full">
        <div
          className={`transition-all duration-300 ease-in-out ${showNav ? "w-[16.6667%]" : "w-0"} h-full border-r-[1px] bg-backLayout `}
        >
          <Nav onClick={handleOnClick} />
        </div>
        <div
          className={`relative right-0 w-full overflow-hidden bg-backLayout`}
        >
          <div className="relative h-[100vh] ">
            <div>
              <Header onClickShowNav={handleOnClick} />
            </div>
            <div className=" h-[92.5%] px-6 pb-2">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default adminLayout;
